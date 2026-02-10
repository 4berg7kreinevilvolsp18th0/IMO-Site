# Сайт ИМО ДВФУ — фронтенд (Next.js)

## Как запустить локально

```bash
cd frontend/nextjs
npm install
npm run dev
```

Сайт будет на http://localhost:3000

## Как обновлять контент (без базы данных!)

Весь контент хранится в файлах — **никакой БД не нужно**.

### Новости
Файл: `content/news.json`

Формат:
```json
{
  "id": "4",
  "title": "Заголовок новости",
  "date": "2026-02-01",
  "intro": "Краткое описание новости.",
  "slug": "slug-novosti"
}
```
Просто добавьте новый объект в массив и сделайте `git push`.

### Информация о школе, ссылки, статистика
Файл: `content/info.json`

Здесь можно менять:
- `hero` — заголовок и описание на главной
- `stats` — цифры (программы, бюджетные места и т.д.)
- `features` — фишки школы
- `links` — ссылки на ВК, Telegram, ocean.study, подачу документов
- `contacts` — адрес, email

### Программы подготовки
Файл: `lib/directions.ts`

Массив программ бакалавриата с описаниями.

## Как деплоить на Vercel

1. Подключите репозиторий к Vercel.
2. Root Directory: `frontend/nextjs`
3. Framework: Next.js (определится автоматически).
4. Никаких переменных окружения не нужно (нет БД).
5. Каждый `git push` автоматически деплоит.

## Структура

```
frontend/nextjs/
├── app/               # страницы (Next.js App Router)
│   ├── page.tsx       # главная
│   ├── news/          # новости
│   ├── programs/      # программы
│   ├── about/         # о школе
│   └── contacts/      # контакты
├── components/        # Header, Footer
├── content/           # JSON-файлы с контентом (новости, информация)
│   ├── news.json
│   └── info.json
├── lib/               # данные (directions.ts)
└── public/            # статика, шрифты, favicon
```
