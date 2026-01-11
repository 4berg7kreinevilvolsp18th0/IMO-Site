-- Таблица для хранения статистики обращений
-- Источники: 'bot' (от Telegram бота) или 'manual' (ручной ввод членами ОСС)

CREATE TABLE IF NOT EXISTS statistics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  period DATE NOT NULL, -- Дата периода (например, 2024-12-19)
  source TEXT NOT NULL CHECK (source IN ('bot', 'manual')), -- Источник данных
  data JSONB NOT NULL, -- Статистика в формате JSON
  created_by UUID REFERENCES auth.users(id), -- Кто создал (для manual)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(period, source) -- Одна запись на период и источник
);

-- Индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_statistics_period ON statistics(period DESC);
CREATE INDEX IF NOT EXISTS idx_statistics_source ON statistics(source);
CREATE INDEX IF NOT EXISTS idx_statistics_created_at ON statistics(created_at DESC);

-- Триггер для обновления updated_at
CREATE OR REPLACE FUNCTION update_statistics_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_statistics_updated_at
  BEFORE UPDATE ON statistics
  FOR EACH ROW
  EXECUTE FUNCTION update_statistics_updated_at();

-- Комментарии
COMMENT ON TABLE statistics IS 'Статистика обращений от бота или введенная вручную';
COMMENT ON COLUMN statistics.period IS 'Дата периода статистики';
COMMENT ON COLUMN statistics.source IS 'Источник: bot (от Telegram бота) или manual (ручной ввод)';
