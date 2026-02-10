# Шрифты ИМО ДВФУ (Брендбук)

## Nasalization (заголовки)
- Подключается через CDN: `https://fonts.cdnfonts.com/css/nasalization-2`
- Tailwind-класс: `font-heading`
- CSS-переменная: `--font-heading`
- Всегда uppercase, letter-spacing: 0.02em
- Автор: Ray Larabie (Typodermic Fonts)

## Ubuntu (основной текст)
- Подключается через Google Fonts: `https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,400`
- Tailwind-класс: `font-body`
- CSS-переменная: `--font-body`
- Начертания: Light 300, Regular 400, Medium 500, Bold 700, Italic 400

## Использование

Шрифты подключены в `globals.css` через `@import`:
- `font-heading` — Nasalization (заголовки h1–h6, кнопки CTA, логотип)
- `font-body` — Ubuntu (весь остальной текст)

Локальные файлы шрифтов не требуются — оба шрифта загружаются с CDN.
