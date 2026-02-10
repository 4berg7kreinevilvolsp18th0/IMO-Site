# Деплой: где что хостится и как делать бэкапы

## Где хостится CMS

- **Path A:** Vercel (serverless). Домен/поддомен указывается в Vercel (например `cms.imo.example.com`).
- **Path B (рекомендованный):** CMS на отдельном сервере — VPS, Render, Railway, РФ-хостинг. Адрес вида `https://cms.yourdomain.tld`.

В обоих случаях для продакшена нужны:
- внешняя БД Postgres (`DATABASE_URL`);
- при Path A — объектное хранилище для MEDIA (S3/R2/B2), иначе загрузки из админки не сохраняются между деплоями.

## Где хостится фронт

- **Next.js (Path B):** Vercel. Домен основной — например `https://imo.dvfu.ru` или `https://yourdomain.tld`.
- Переменная окружения на Vercel: `NEXT_PUBLIC_CMS_URL=https://cms.yourdomain.tld` (адрес API CMS).

## Где лежат доступы

| Что | Где |
|-----|-----|
| Логин/пароль админки Wagtail | Создаются через `python manage.py createsuperuser`; хранить в менеджере паролей / у ответственного |
| `SECRET_KEY`, `DATABASE_URL` | Vercel → Project → Settings → Environment Variables (или .env на сервере CMS) |
| Доступ к БД Postgres | У хостинга БД (Neon, Supabase, Railway и т.д.) |
| Доступы S3/R2 (если используются) | В env: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_STORAGE_BUCKET_NAME` |

## Как делать бэкап БД и медиа

- **БД:** регулярный дамп Postgres (например `pg_dump`) по расписанию или вручную. Хранить в безопасном месте.
- **Медиа (файлы/картинки):** если используется S3/R2 — включить версионирование/бэкапы у провайдера. Если медиа на диске сервера — копировать папку `media/` в хранилище по расписанию.

Подробности по миграциям и первому деплою — в **backend/DEPLOY_README.md**.
