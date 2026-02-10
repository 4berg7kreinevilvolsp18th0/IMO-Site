'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { NeonGrid, AngularDivider, ScanlineOverlay, DotMatrix } from '@/components/OceanDecorations';
import resourcesData from '@/content/resources.json';

/* ── типы ─────────────────────────────────── */
interface ResourceItem {
  title: string;
  url: string;
  icon: string;
  desc: string;
}

interface ResourceCategory {
  category: string;
  icon: string;
  items: ResourceItem[];
}

const resources: ResourceCategory[] = resourcesData as ResourceCategory[];

/* ── цвета категорий ──────────────────────── */
const CATEGORY_COLORS = [
  { border: 'border-imo-neon/40', shadow: 'shadow-brutal', accent: 'text-imo-neon', bg: 'bg-imo-neon/5' },
  { border: 'border-imo-coral/40', shadow: 'shadow-brutal-coral', accent: 'text-imo-coral', bg: 'bg-imo-coral/5' },
  { border: 'border-imo-sky/40', shadow: 'shadow-brutal', accent: 'text-imo-sky', bg: 'bg-imo-sky/5' },
  { border: 'border-imo-lime/40', shadow: 'shadow-brutal-lime', accent: 'text-imo-lime', bg: 'bg-imo-lime/5' },
  { border: 'border-imo-neon/40', shadow: 'shadow-brutal', accent: 'text-imo-neon', bg: 'bg-imo-neon/5' },
  { border: 'border-imo-coral/40', shadow: 'shadow-brutal-coral', accent: 'text-imo-coral', bg: 'bg-imo-coral/5' },
];

export default function ForStudentsPage() {
  const [search, setSearch] = useState('');
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return resources;
    const q = search.toLowerCase();
    return resources
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            item.title.toLowerCase().includes(q) ||
            item.desc.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [search]);

  const totalLinks = resources.reduce((acc, cat) => acc + cat.items.length, 0);

  return (
    <main className="min-h-screen bg-imo-deep text-white font-body overflow-x-hidden">
      {/* SEO — статический head через metadata невозможен в "use client",
          используем document.title в продакшене или layout-level metadata */}

      {/* ── Баннер ──────────────────────────── */}
      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-24 scanlines">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050d1a] via-imo-navy to-imo-ocean" />
        <NeonGrid />
        <ScanlineOverlay />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-imo-neon/60 font-heading tracking-[0.3em] text-xs mb-3">
            {totalLinks} ССЫЛОК ДЛЯ СТУДЕНТОВ
          </p>
          <h1
            className="text-4xl sm:text-5xl font-heading tracking-wider mb-4 glitch-text"
            data-text="ПОЛЕЗНОЕ"
          >
            ПОЛЕЗНОЕ
          </h1>
          <p className="text-white/60 font-light max-w-2xl mx-auto mb-8">
            Все сервисы, порталы и ресурсы в одном месте — быстрый доступ к LMS, расписанию, библиотеке и документам
          </p>

          {/* Поиск */}
          <div className="max-w-md mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-imo-neon/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="square" strokeLinejoin="miter" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="search"
              placeholder="Найти сервис..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border-2 border-imo-neon/30 text-white placeholder:text-white/30 font-light text-sm focus:outline-none focus:border-imo-neon/60 focus:shadow-brutal transition-all"
              aria-label="Поиск по сервисам"
            />
          </div>
        </div>

        <AngularDivider className="absolute bottom-0 left-0 right-0 text-imo-deep z-20" />
      </section>

      {/* ── Категории ──────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/40 text-lg">Ничего не найдено по запросу &laquo;{search}&raquo;</p>
            <button
              onClick={() => setSearch('')}
              className="mt-4 text-imo-neon hover:text-imo-lime transition-colors text-sm"
            >
              Сбросить поиск
            </button>
          </div>
        )}

        <div className="space-y-12">
          {filtered.map((cat, catIdx) => {
            const colors = CATEGORY_COLORS[catIdx % CATEGORY_COLORS.length];
            const isOpen = openCategory === cat.category;

            return (
              <div key={cat.category}>
                {/* Заголовок категории */}
                <button
                  onClick={() => setOpenCategory(isOpen ? null : cat.category)}
                  className="sm:pointer-events-none sm:cursor-default flex items-center gap-3 mb-6 w-full text-left group"
                  aria-expanded={isOpen}
                >
                  <span className="text-2xl" aria-hidden="true">{cat.icon}</span>
                  <h2 className={`font-heading text-xl sm:text-2xl tracking-wide ${colors.accent}`}>
                    {cat.category.toUpperCase()}
                  </h2>
                  <div className={`flex-1 h-[2px] ${colors.bg} ml-2`} />
                  {/* Мобильная стрелка */}
                  <svg
                    className={`w-5 h-5 ${colors.accent} sm:hidden transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="square" strokeLinejoin="miter" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Карточки ссылок — на десктопе всегда видны, на мобильных — аккордеон */}
                <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${!isOpen ? 'hidden sm:grid' : 'grid'}`}>
                  {cat.items.map((item) => (
                    <a
                      key={item.title}
                      href={item.url}
                      target={item.url.startsWith('#') ? undefined : '_blank'}
                      rel={item.url.startsWith('#') ? undefined : 'noopener noreferrer'}
                      className={`brutal-card p-5 border-2 ${colors.border} group hover:${colors.shadow} transition-all`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-xl flex-shrink-0 mt-0.5" aria-hidden="true">{item.icon}</span>
                        <div className="min-w-0">
                          <h3 className="text-sm font-medium text-white group-hover:text-imo-neon transition-colors leading-tight mb-1">
                            {item.title}
                          </h3>
                          <p className="text-xs text-white/40 font-light leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                      {/* Внешняя ссылка индикатор */}
                      {!item.url.startsWith('#') && (
                        <div className="mt-3 flex items-center gap-1 text-[10px] text-white/20 group-hover:text-imo-neon/50 transition-colors">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="square" strokeLinejoin="miter" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          <span>{new URL(item.url).hostname}</span>
                        </div>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Ссылка на гайды */}
        <div className="mt-16 relative">
          <DotMatrix className="top-0 right-10" />
          <div className="brutal-card p-8 sm:p-10 brutal-border-neon text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-imo-neon via-imo-sky to-imo-magenta" />
            <p className="text-imo-neon font-heading tracking-[0.2em] text-xs mb-2">FAQ</p>
            <h2 className="font-heading text-2xl sm:text-3xl tracking-wide text-white mb-4">
              ЕСТЬ ВОПРОСЫ?
            </h2>
            <p className="text-white/60 font-light max-w-lg mx-auto mb-6">
              Посмотри раздел гайдов — пошаговые инструкции по общежитию, стипендиям, документам и учёбе.
            </p>
            <Link href="/guides" className="btn-primary inline-block">
              ГАЙДЫ СТУДЕНТА →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
