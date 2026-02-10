# Backend — Django + Wagtail (ИМО)

CMS для сайта Института Мирового Океана.

## Локальная разработка

```bash
python -m venv .venv
# Windows: .venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py setup_wagtail_groups   # группы Editors / Admins
python manage.py runserver
```

- Админка: http://localhost:8000/admin/
- API (Path B): http://localhost:8000/api/v2/pages/

## Структура

- `mysite/` — настройки Django (base, dev, prod)
- `home/` — главная страница (HomePage)
- `pages/` — обычные страницы (StandardPage)
- `news/` — новости (NewsIndexPage, NewsPage)
- `api/index.py` — entrypoint для Path A (Vercel serverless)

## Path A (Vercel)

См. **DEPLOY_README.md** — переменные окружения, миграции, хранилище MEDIA.

## Path B (Headless)

Фронт (Next.js) запрашивает данные по `NEXT_PUBLIC_CMS_URL/api/v2/pages/`.
