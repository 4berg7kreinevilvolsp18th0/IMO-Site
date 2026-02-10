'use client';

import { useState } from 'react';

/* ── типы ─────────────────────────────────── */
interface GuideItem {
  question: string;
  answer: string;
}

interface GuideCategory {
  category: string;
  icon: string;
  items: GuideItem[];
}

/* ── цвета категорий (повторяют ресурсы) ─── */
const CAT_ACCENTS = [
  'border-imo-neon/40 text-imo-neon',
  'border-imo-coral/40 text-imo-coral',
  'border-imo-sky/40 text-imo-sky',
  'border-imo-lime/40 text-imo-lime',
  'border-imo-neon/40 text-imo-neon',
];

/* ── простой markdown-like рендерер ──────── */
function renderAnswer(text: string) {
  // Разбиваем на строки
  const lines = text.split('\n');

  return lines.map((line, i) => {
    // Ссылки вида [text](url)
    const withLinks = line.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-imo-neon hover:text-imo-lime transition-colors underline underline-offset-2">$1</a>'
    );

    // Жирный текст **text**
    const withBold = withLinks.replace(
      /\*\*([^*]+)\*\*/g,
      '<strong class="font-medium text-white">$1</strong>'
    );

    // Нумерованные списки
    const numberedMatch = line.match(/^(\d+)\.\s(.+)/);
    if (numberedMatch) {
      return (
        <div key={i} className="flex items-start gap-2 mb-1">
          <span className="text-imo-neon/60 text-xs font-mono mt-0.5 flex-shrink-0 w-4">
            {numberedMatch[1]}.
          </span>
          <span
            className="text-white/70 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: withBold.replace(/^\d+\.\s/, '') }}
          />
        </div>
      );
    }

    // Маркированные списки
    if (line.startsWith('- ')) {
      return (
        <div key={i} className="flex items-start gap-2 mb-1">
          <span className="text-imo-neon mt-1.5 flex-shrink-0" aria-hidden="true">▸</span>
          <span
            className="text-white/70 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: withBold.replace(/^-\s/, '') }}
          />
        </div>
      );
    }

    // Пустая строка
    if (!line.trim()) return <div key={i} className="h-2" />;

    // Обычный текст
    return (
      <p
        key={i}
        className="text-white/70 text-sm leading-relaxed mb-1"
        dangerouslySetInnerHTML={{ __html: withBold }}
      />
    );
  });
}

/* ── компонент ───────────────────────────── */
export default function GuidesAccordion({
  categories,
  searchQuery = '',
}: {
  categories: GuideCategory[];
  searchQuery?: string;
}) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggle = (key: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  /* Фильтрация по поиску */
  const filtered = searchQuery.trim()
    ? categories
        .map((cat) => ({
          ...cat,
          items: cat.items.filter(
            (item) =>
              item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.answer.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter((cat) => cat.items.length > 0)
    : categories;

  if (filtered.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white/40 text-lg">
          Ничего не найдено по запросу &laquo;{searchQuery}&raquo;
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {filtered.map((cat, catIdx) => {
        const accent = CAT_ACCENTS[catIdx % CAT_ACCENTS.length];
        const accentColor = accent.split(' ')[1]; // text-imo-neon etc.

        return (
          <div key={cat.category}>
            {/* Заголовок категории */}
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl" aria-hidden="true">{cat.icon}</span>
              <h2 className={`font-heading text-xl sm:text-2xl tracking-wide ${accentColor}`}>
                {cat.category.toUpperCase()}
              </h2>
              <div className="flex-1 h-[2px] bg-white/5 ml-2" />
              <span className="text-xs text-white/30 font-mono">
                {cat.items.length}
              </span>
            </div>

            {/* Вопросы */}
            <div className="space-y-3">
              {cat.items.map((item, itemIdx) => {
                const key = `${cat.category}-${itemIdx}`;
                const isOpen = openItems.has(key);

                return (
                  <div
                    key={key}
                    className={`border-2 transition-all ${
                      isOpen
                        ? `${accent.split(' ')[0]} bg-white/[0.02] shadow-brutal-sm`
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <button
                      onClick={() => toggle(key)}
                      className="w-full text-left p-5 flex items-center gap-3 group"
                      aria-expanded={isOpen}
                    >
                      <span
                        className={`text-sm font-mono flex-shrink-0 transition-colors ${
                          isOpen ? accentColor : 'text-white/30'
                        }`}
                      >
                        {isOpen ? '−' : '+'}
                      </span>
                      <span
                        className={`text-sm font-medium transition-colors ${
                          isOpen ? 'text-white' : 'text-white/80 group-hover:text-white'
                        }`}
                      >
                        {item.question}
                      </span>
                    </button>

                    {/* Ответ */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-5 pb-5 pl-12">
                        <div className={`border-l-2 ${accent.split(' ')[0]} pl-4`}>
                          {renderAnswer(item.answer)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
