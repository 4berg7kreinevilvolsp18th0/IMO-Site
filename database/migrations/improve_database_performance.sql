-- ===============================
-- Улучшение производительности и функциональности базы данных
-- ===============================
-- 
-- Эта миграция добавляет:
-- 1. Full-text search для поиска
-- 2. Составные индексы для оптимизации
-- 3. Триггеры для автоматического обновления
-- 4. Функции для часто используемых запросов
-- 5. Валидацию на уровне БД
-- 6. Материализованные представления для аналитики
--

-- ===============================
-- 1. Full-Text Search
-- ===============================

-- Добавить GIN индексы для полнотекстового поиска
CREATE EXTENSION IF NOT EXISTS pg_trgm; -- Для триграммного поиска
CREATE EXTENSION IF NOT EXISTS unaccent; -- Для поиска без учета акцентов

-- Функция для создания текстового поиска
CREATE OR REPLACE FUNCTION create_search_vector()
RETURNS TRIGGER AS $$
BEGIN
    -- Для appeals
    IF TG_TABLE_NAME = 'appeals' THEN
        NEW.search_vector := 
            setweight(to_tsvector('russian', COALESCE(NEW.title, '')), 'A') ||
            setweight(to_tsvector('russian', COALESCE(NEW.description, '')), 'B') ||
            setweight(to_tsvector('russian', COALESCE(NEW.institute, '')), 'C');
    END IF;
    
    -- Для content
    IF TG_TABLE_NAME = 'content' THEN
        NEW.search_vector := 
            setweight(to_tsvector('russian', COALESCE(NEW.title, '')), 'A') ||
            setweight(to_tsvector('russian', COALESCE(NEW.body, '')), 'B');
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Добавить колонку search_vector для appeals
ALTER TABLE appeals 
ADD COLUMN IF NOT EXISTS search_vector tsvector;

-- Добавить колонку search_vector для content
ALTER TABLE content 
ADD COLUMN IF NOT EXISTS search_vector tsvector;

-- Создать GIN индексы для полнотекстового поиска
CREATE INDEX IF NOT EXISTS idx_appeals_search_vector 
ON appeals USING GIN(search_vector);

CREATE INDEX IF NOT EXISTS idx_content_search_vector 
ON content USING GIN(search_vector);

-- Триггеры для автоматического обновления search_vector
DROP TRIGGER IF EXISTS appeals_search_vector_trigger ON appeals;
CREATE TRIGGER appeals_search_vector_trigger
    BEFORE INSERT OR UPDATE ON appeals
    FOR EACH ROW
    EXECUTE FUNCTION create_search_vector();

DROP TRIGGER IF EXISTS content_search_vector_trigger ON content;
CREATE TRIGGER content_search_vector_trigger
    BEFORE INSERT OR UPDATE ON content
    FOR EACH ROW
    EXECUTE FUNCTION create_search_vector();

-- Обновить существующие записи
UPDATE appeals SET search_vector = 
    setweight(to_tsvector('russian', COALESCE(title, '')), 'A') ||
    setweight(to_tsvector('russian', COALESCE(description, '')), 'B') ||
    setweight(to_tsvector('russian', COALESCE(institute, '')), 'C')
WHERE search_vector IS NULL;

UPDATE content SET search_vector = 
    setweight(to_tsvector('russian', COALESCE(title, '')), 'A') ||
    setweight(to_tsvector('russian', COALESCE(body, '')), 'B')
WHERE search_vector IS NULL;

-- ===============================
-- 2. Составные индексы для оптимизации
-- ===============================

-- Индексы для часто используемых комбинаций полей
CREATE INDEX IF NOT EXISTS idx_appeals_status_created_at 
ON appeals(status, created_at DESC) 
WHERE status IN ('new', 'in_progress');

CREATE INDEX IF NOT EXISTS idx_appeals_direction_status 
ON appeals(direction_id, status) 
WHERE direction_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_appeals_assigned_status 
ON appeals(assigned_to, status) 
WHERE assigned_to IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_appeals_priority_deadline 
ON appeals(priority, deadline) 
WHERE deadline IS NOT NULL AND priority IN ('high', 'urgent');

CREATE INDEX IF NOT EXISTS idx_content_type_status_published 
ON content(type, status, published_at DESC) 
WHERE status = 'published';

CREATE INDEX IF NOT EXISTS idx_appeal_comments_appeal_created 
ON appeal_comments(appeal_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_user_roles_user_direction 
ON user_roles(user_id, direction_id) 
WHERE direction_id IS NOT NULL;

-- Индекс для поиска по тегам (GIN для массивов)
CREATE INDEX IF NOT EXISTS idx_appeals_tags 
ON appeals USING GIN(tags) 
WHERE tags IS NOT NULL;

-- ===============================
-- 3. Триггеры для автоматического обновления
-- ===============================

-- Функция для автоматического обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Триггеры для updated_at
DROP TRIGGER IF EXISTS update_content_updated_at ON content;
CREATE TRIGGER update_content_updated_at
    BEFORE UPDATE ON content
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_roles_updated_at ON user_roles;
CREATE TRIGGER update_user_roles_updated_at
    BEFORE UPDATE ON user_roles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_student_organizations_updated_at ON student_organizations;
CREATE TRIGGER update_student_organizations_updated_at
    BEFORE UPDATE ON student_organizations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Функция для автоматической установки first_response_at
CREATE OR REPLACE FUNCTION set_first_response_at()
RETURNS TRIGGER AS $$
BEGIN
    -- Если статус изменился на 'in_progress' и first_response_at еще не установлен
    IF NEW.status = 'in_progress' AND OLD.status != 'in_progress' AND NEW.first_response_at IS NULL THEN
        NEW.first_response_at = NOW();
    END IF;
    
    -- Если статус изменился на 'closed' и closed_at еще не установлен
    IF NEW.status = 'closed' AND OLD.status != 'closed' AND NEW.closed_at IS NULL THEN
        NEW.closed_at = NOW();
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Триггер для first_response_at и closed_at
DROP TRIGGER IF EXISTS set_appeal_timestamps ON appeals;
CREATE TRIGGER set_appeal_timestamps
    BEFORE UPDATE ON appeals
    FOR EACH ROW
    EXECUTE FUNCTION set_first_response_at();

-- ===============================
-- 4. Функции для часто используемых запросов
-- ===============================

-- Функция для поиска обращений с полнотекстовым поиском
CREATE OR REPLACE FUNCTION search_appeals(
    p_search_text TEXT DEFAULT NULL,
    p_direction_id UUID DEFAULT NULL,
    p_status TEXT DEFAULT NULL,
    p_priority TEXT DEFAULT NULL,
    p_limit INTEGER DEFAULT 50,
    p_offset INTEGER DEFAULT 0
)
RETURNS TABLE (
    id UUID,
    direction_id UUID,
    title TEXT,
    description TEXT,
    status TEXT,
    priority TEXT,
    created_at TIMESTAMPTZ,
    rank REAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        a.id,
        a.direction_id,
        a.title,
        a.description,
        a.status,
        a.priority,
        a.created_at,
        CASE 
            WHEN p_search_text IS NOT NULL THEN
                ts_rank(a.search_vector, plainto_tsquery('russian', p_search_text))
            ELSE 0.0
        END AS rank
    FROM appeals a
    WHERE 
        (p_search_text IS NULL OR a.search_vector @@ plainto_tsquery('russian', p_search_text))
        AND (p_direction_id IS NULL OR a.direction_id = p_direction_id)
        AND (p_status IS NULL OR a.status = p_status)
        AND (p_priority IS NULL OR a.priority = p_priority)
    ORDER BY 
        CASE WHEN p_search_text IS NOT NULL THEN rank ELSE 0.0 END DESC,
        a.created_at DESC
    LIMIT p_limit
    OFFSET p_offset;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Функция для получения статистики обращений
CREATE OR REPLACE FUNCTION get_appeals_stats(
    p_direction_id UUID DEFAULT NULL,
    p_start_date TIMESTAMPTZ DEFAULT NULL,
    p_end_date TIMESTAMPTZ DEFAULT NULL
)
RETURNS TABLE (
    status TEXT,
    count BIGINT,
    avg_response_time INTERVAL,
    avg_resolution_time INTERVAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        a.status,
        COUNT(*)::BIGINT AS count,
        AVG(a.first_response_at - a.created_at) AS avg_response_time,
        AVG(a.closed_at - a.created_at) AS avg_resolution_time
    FROM appeals a
    WHERE 
        (p_direction_id IS NULL OR a.direction_id = p_direction_id)
        AND (p_start_date IS NULL OR a.created_at >= p_start_date)
        AND (p_end_date IS NULL OR a.created_at <= p_end_date)
    GROUP BY a.status;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Функция для получения обращений с истекшим дедлайном
CREATE OR REPLACE FUNCTION get_overdue_appeals()
RETURNS TABLE (
    id UUID,
    title TEXT,
    deadline DATE,
    days_overdue INTEGER,
    priority TEXT,
    assigned_to UUID
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
-- 8. Дополнительные индексы для производительности
-- ===============================

-- Индекс для поиска по частичному совпадению (триграммы)
CREATE INDEX IF NOT EXISTS idx_appeals_title_trgm 
ON appeals USING GIN(title gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_content_title_trgm 
ON content USING GIN(title gin_trgm_ops);

-- Индекс для быстрого поиска по датам
CREATE INDEX IF NOT EXISTS idx_appeals_created_at_month 
ON appeals(DATE_TRUNC('month', created_at));

-- Индекс для комбинированного поиска
CREATE INDEX IF NOT EXISTS idx_appeals_status_priority_created 
ON appeals(status, priority DESC, created_at DESC) 
WHERE status IN ('new', 'in_progress');

-- ===============================
-- Готово!
-- ===============================
-- 
-- После применения миграции:
-- 1. Обновите статистику: ANALYZE;
-- 2. Обновите материализованное представление: SELECT refresh_appeals_stats();
-- 3. Проверьте производительность запросов
--

