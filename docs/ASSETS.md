# Структура ассетов

## public/ (frontend/nextjs/public/)

```
public/
├── favicon.ico          # Иконка сайта (корень — для Next.js)
├── FAVICON_README.md    # Инструкция по favicon
├── fonts/               # Шрифты
│   ├── nasalization-rg.otf   # Nasalization (заголовки)
│   ├── NASALIZA.woff
│   ├── Ubuntu-L.ttf
│   ├── Ubuntu-LI.ttf
│   ├── Ubuntu-R.ttf
│   ├── Ubuntu-RI.ttf
│   ├── Ubuntu-M.ttf
│   ├── Ubuntu-MI.ttf
│   ├── Ubuntu-B.ttf
│   └── Ubuntu-BI.ttf
├── logos/               # Логотипы ИМО
│   ├── logo-imo.svg     # Основной SVG (белый на тёмном)
│   ├── icon.svg         # Иконка-логотип
│   ├── logo-imo.png     # Растровый логотип
│   └── sslogo.png       # Логотип SS
└── icons/               # Иконки (пусто, favicon в корне)
```

## Шрифты

| Файл | Назначение |
|------|------------|
| nasalization-rg.otf / NASALIZA.woff | Заголовки (font-heading) |
| Ubuntu-*.ttf | Основной текст (font-body) |

Путь в CSS: `/fonts/...`

## Логотипы

| Файл | Назначение |
|------|------------|
| logo-imo.svg | Основной логотип в шапке, футере, страницах |
| icon.svg | Альтернативная иконка |
| logo-imo.png | Растровый вариант |
| sslogo.png | Логотип студсовета |

Путь в коде: `/logos/logo-imo.svg`

## archive/imo-styles/

Макеты стилей IMO (HTML, CSS, изображения) — референсы для дизайна.
