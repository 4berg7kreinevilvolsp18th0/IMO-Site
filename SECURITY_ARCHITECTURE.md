# Архитектура безопасности проекта ОСС ДВФУ

## 🎯 Главный принцип

**При атаке на один компонент все остальное должно продолжать работать.**

## 🏗️ Архитектура защиты

### Многоуровневая защита

```
┌─────────────────────────────────────────┐
│         Frontend (Next.js)              │
├─────────────────────────────────────────┤
│  ┌──────────────────────────────────┐  │
│  │  Middleware (Rate Limiting)      │  │
│  │  - IP блокировка                 │  │
│  │  - Rate limiting (Redis/Memory)  │  │
│  │  - Security Headers              │  │
│  └──────────────────────────────────┘  │
│  ┌──────────────────────────────────┐  │
│  │  Service Isolation Layer         │  │
│  │  - Изоляция сервисов             │  │
│  │  - Circuit Breaker               │  │
│  │  - Graceful Degradation          │  │
│  └──────────────────────────────────┘  │
│  ┌──────────────────────────────────┐  │
│  │  API Routes                      │  │
│  │  - Защищенные endpoints          │  │
│  │  - Fallback механизмы            │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
           │           │           │
           ▼           ▼           ▼
    ┌──────────┐ ┌──────────┐ ┌──────────┐
    │ Supabase │ │ Telegram │ │   Email  │
    │   (DB)   │ │    API   │ │  Service │
    └──────────┘ └──────────┘ └──────────┘
```

## 🛡️ Компоненты защиты

### 1. Circuit Breaker Pattern

**Назначение:** Предотвращает каскадные сбои.

**Как работает:**
- Отслеживает количество ошибок
- При превышении порога блокирует запросы к сервису
- Периодически пытается восстановить соединение
- Использует fallback механизмы

**Сервисы под защитой:**
- Supabase (база данных)
- Telegram API
- Email сервис
- Redis

**Конфигурация:**
- Failure Threshold: 5 ошибок
- Reset Timeout: 60 секунд
- Success Threshold: 2 успешных запроса

### 2. Service Isolation

**Назначение:** Изолирует сервисы друг от друга.

**Как работает:**
- Каждый сервис работает независимо
- Ошибка в одном сервисе не влияет на другие
- Статус каждого сервиса отслеживается отдельно
- Автоматическое переключение на fallback

**Изолированные сервисы:**
- Supabase
- Telegram
- Email
- Redis

### 3. Graceful Degradation

**Назначение:** Плавная деградация функциональности.

**Уровни деградации:**

1. **Full** - Все работает нормально
2. **Degraded** - Основные функции работают, некоторые недоступны
3. **Minimal** - Только базовая функциональность
4. **Offline** - Система недоступна

**Примеры деградации:**

- Telegram недоступен → используется Email
- Redis недоступен → используется in-memory rate limiting
- Email недоступен → только логирование (для некритичных уведомлений)

## 📊 Мониторинг и Health Checks

### Базовый Health Check

`GET /api/health`

```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00Z",
  "supabase": {
    "configured": true
  }
}
```

### Расширенный Status Check

`GET /api/health/status`

```json
{
  "status": "healthy",
  "system": {
    "health": true,
    "degraded": false,
    "degradationLevel": "full",
    "message": "Все системы работают нормально"
  },
  "services": [
    {
      "name": "supabase",
      "healthy": true,
      "available": true
    }
  ],
  "circuitBreakers": [
    {
      "name": "supabase",
      "state": "CLOSED",
      "failures": 0
    }
  ]
}
```

## 🔒 Защита от атак

### Защита на уровне Middleware

1. **IP блокировка:**
   - Автоматическая блокировка подозрительных IP
   - Ручная блокировка через API
   - Интеграция с Redis

2. **Rate Limiting:**
   - 100 запросов/минуту для обычных API
   - 5 запросов/минуту для auth endpoints
   - 50 запросов/минуту для security logging

3. **Security Headers:**
   - CSP (Content Security Policy)
   - X-Frame-Options: DENY
   - X-Content-Type-Options: nosniff
   - И другие

### Защита на уровне API

1. **CSRF защита:**
   - Токены для всех модифицирующих запросов
   - Проверка origin/referer

2. **Валидация входных данных:**
   - Проверка всех параметров
   - Sanitization
   - Type checking

3. **Аутентификация и авторизация:**
   - JWT токены
   - Row Level Security в Supabase
   - Проверка ролей

## 🚨 Сценарии атак и защита

### Сценарий 1: DDoS атака на API

**Защита:**
1. Rate limiting на уровне middleware
2. Circuit breaker для внешних сервисов
3. Redis для распределенного rate limiting
4. In-memory fallback если Redis недоступен

**Результат:**
- Система продолжает работать для легитимных пользователей
- Атакующие IP блокируются
- Недоступные сервисы изолируются

### Сценарий 2: Атака на базу данных

**Защита:**
1. Circuit breaker для Supabase
2. Row Level Security (RLS)
3. Prepared statements (параметризованные запросы)
4. Rate limiting на уровне API

**Результат:**
- После нескольких ошибок circuit breaker открывается
- Запросы к БД блокируются
- API возвращает понятные ошибки
- Статические страницы продолжают работать

### Сценарий 3: Атака на Telegram API

**Защита:**
1. Circuit breaker для Telegram
2. Изоляция сервиса
3. Fallback на Email
4. Graceful degradation

**Результат:**
- Telegram недоступен → используется Email
- Остальные функции работают
- Пользователи получают уведомления через альтернативный канал

### Сценарий 4: Компрометация одного сервиса

**Защита:**
1. Service Isolation
2. Независимые circuit breakers
3. Fallback механизмы
4. Мониторинг состояния

**Результат:**
- Компрометированный сервис изолируется
- Остальные сервисы продолжают работать
- Система деградирует плавно, не падая полностью

## 📁 Структура файлов

```
frontend/nextjs/
├── lib/
│   ├── circuitBreaker.ts          # Circuit Breaker Pattern
│   ├── serviceIsolation.ts        # Service Isolation
│   ├── gracefulDegradation.ts     # Graceful Degradation
│   ├── supabaseClient.ts          # Supabase клиент (с circuit breaker)
│   ├── redis.ts                   # Redis клиент (с circuit breaker)
│   └── README_SECURITY.md         # Документация по безопасности
├── middleware.ts                  # Middleware с защитой
└── app/
    └── api/
        ├── health/
        │   ├── route.ts           # Базовый health check
        │   └── status/
        │       └── route.ts       # Расширенный status check
        └── notifications/
            └── telegram/
                └── route.ts       # Пример использования защиты
```

## 🔧 Настройка

### Переменные окружения

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx

# Redis (опционально)
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxx
# или
REDIS_URL=redis://localhost:6379

# Telegram (опционально)
TELEGRAM_BOT_TOKEN=xxx
TELEGRAM_NOTIFICATION_CHANNEL=@oss_dvfu

# Email (опционально)
EMAIL_SERVICE_URL=xxx
```

### Настройка Circuit Breakers

В `lib/circuitBreaker.ts`:

```typescript
export const circuitBreakers = {
  supabase: new CircuitBreaker('supabase', {
    failureThreshold: 5,    // Настроить под ваши нужды
    resetTimeout: 60000,    // Время восстановления
    successThreshold: 2,
  }),
  // ...
};
```

## ✅ Чеклист безопасности

- [x] Circuit Breaker для всех внешних сервисов
- [x] Service Isolation
- [x] Graceful Degradation
- [x] Rate Limiting (Redis + in-memory fallback)
- [x] IP блокировка
- [x] Security Headers
- [x] Health checks
- [x] Мониторинг состояния сервисов
- [x] Fallback механизмы
- [x] Документация

## 📚 Дополнительные ресурсы

- [Circuit Breaker Pattern](https://martinfowler.com/bliki/CircuitBreaker.html)
- [Graceful Degradation](https://developer.mozilla.org/en-US/docs/Glossary/Graceful_degradation)
- [Service Isolation](https://microservices.io/patterns/reliability/circuit-breaker.html)

---

**Последнее обновление:** 2024



