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

