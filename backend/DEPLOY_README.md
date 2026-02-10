# Path A — чеклист инфраструктуры (Vercel)

## Файлы «док-основания» для дирекции

| Файл | Назначение |
|------|------------|
| `vercel.json` | Роутинг на `api/index.py` |
| `api/index.py` | Entrypoint serverless (Mangum + Django ASGI) |
| `runtime.txt` | Версия Python (3.11) |
| `requirements.txt` | Зависимости (Django, Wagtail, mangum, dj-database-url, whitenoise) |
| `DEPLOY_README.md` | Этот чеклист |

## Переменные окружения (Vercel → Project Settings → Environment Variables)

| Переменная | Обязательно | Описание |
|------------|-------------|----------|
| `DJANGO_SETTINGS_MODULE` | да | `mysite.settings.prod` |
| `SECRET_KEY` | да | Секретный ключ Django |
| `ALLOWED_HOSTS` | да | `.vercel.app,yourdomain.tld` |
| `DATABASE_URL` | да | Postgres: `postgres://user:pass@host:5432/dbname` |
| `AWS_ACCESS_KEY_ID` | при S3/R2 | Ключ доступа к хранилищу |
| `AWS_SECRET_ACCESS_KEY` | при S3/R2 | Секрет |
| `AWS_STORAGE_BUCKET_NAME` | при S3/R2 | Имя бакета для MEDIA |
| `AWS_S3_REGION_NAME` | при S3/R2 | Регион (например `ru-1`) |

## Инфраструктурные требования

- **Внешний Postgres** — обязателен (Vercel не даёт постоянную БД).
- **Объектное хранилище (S3/R2/B2)** — для загрузки картинок/файлов из админки (MEDIA). Без него загрузки в админке могут не сохраняться между деплоями.
- **Миграции** — запускать вручную или через CI после деплоя:
  ```bash
  python manage.py migrate
  python manage.py collectstatic --noinput
  ```

## Локальная разработка

```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Админка: http://localhost:8000/admin/
