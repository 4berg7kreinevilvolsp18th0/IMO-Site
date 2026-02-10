# Схема деплоя ИМО

## Path A — Django+Wagtail на Vercel (serverless)

```
[ Vercel ]
    │
    ├── api/index.py (Mangum → Django ASGI)
    ├── Статика /media, /static (или внешнее хранилище)
    └── Запросы → Wagtail (админка + сайт)

Внешние сервисы:
  • Postgres (DATABASE_URL) — обязательно
  • S3/R2 (опционально) — для MEDIA
```

**Плюсы:** один хостинг. **Минусы:** cold start, лимиты serverless для админки.

---

## Path B — Headless (рекомендованный)

```
[ Vercel ]                    [ CMS-сервер ]
  Next.js                         Django+Wagtail
  (фронт)                         (админка + API)
       │                                │
       └──── GET /api/v2/pages/ ────────┘
       └──── GET /api/v2/pages/?type=news.NewsPage

  • Фронт: Vercel (быстро, без боли).
  • CMS: VPS / Render / Railway / РФ-хостинг.
  • Контент редактируется в Wagtail, отдаётся по API.
```

---

## Path C — Документация для дирекции

  • **docs/onboarding.md** — как зайти в админку, добавить страницу/новость, меню, картинки.
  • **docs/content-model.md** — типы страниц (HomePage, StandardPage, NewsIndex, NewsPage).
  • **docs/deploy.md** — где хостится CMS и фронт, доступы, бэкапы.

Группы в Wagtail: **Editors** (контент), **Admins** (полный доступ).
