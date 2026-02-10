'use client';

import { useState } from 'react';
import Link from 'next/link';
import { NeonGrid, AngularDivider, ScanlineOverlay, HexagonDecor } from '@/components/OceanDecorations';
import GuidesAccordion from '@/components/GuidesAccordion';
import guidesData from '@/content/guides.json';

export default function GuidesPage() {
  const [search, setSearch] = useState('');

  const totalQuestions = guidesData.reduce((acc, cat) => acc + cat.items.length, 0);

  return (
    <main className="min-h-screen bg-imo-deep text-white font-body overflow-x-hidden">
      {/* ── Баннер ──────────────────────────── */}
      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-24 scanlines">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050d1a] via-imo-navy to-imo-ocean" />
        <NeonGrid />
        <HexagonDecor className="bottom-10 right-20" />
        <ScanlineOverlay />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-imo-neon/60 font-heading tracking-[0.3em] text-xs mb-3">
            {totalQuestions} ОТВЕТОВ НА ВОПРОСЫ
          </p>
          <h1
            className="text-4xl sm:text-5xl font-heading tracking-wider mb-4 glitch-text"
            data-text="ГАЙДЫ СТУДЕНТА"
          >
            ГАЙДЫ СТУДЕНТА
          </h1>
          <p className="text-white/60 font-light max-w-2xl mx-auto mb-8">
            Пошаговые инструкции по самым частым вопросам — от расписания до стипендий
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
              placeholder="Найти ответ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border-2 border-imo-neon/30 text-white placeholder:text-white/30 font-light text-sm focus:outline-none focus:border-imo-neon/60 focus:shadow-brutal transition-all"
              aria-label="Поиск по вопросам"
            />
          </div>
        </div>

        <AngularDivider className="absolute bottom-0 left-0 right-0 text-imo-deep z-20" />
      </section>

      {/* ── Контент ──────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <GuidesAccordion categories={guidesData} searchQuery={search} />

        {/* Ссылка на полезное */}
        <div className="mt-16 brutal-card p-8 sm:p-10 brutal-border-neon text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-imo-magenta via-imo-neon to-imo-sky" />
          <p className="text-imo-coral font-heading tracking-[0.2em] text-xs mb-2">СЕРВИСЫ</p>
          <h2 className="font-heading text-2xl sm:text-3xl tracking-wide text-white mb-4">
            НУЖЕН БЫСТРЫЙ ДОСТУП?
          </h2>
          <p className="text-white/60 font-light max-w-lg mx-auto mb-6">
            Все ссылки на LMS, расписание, библиотеку и другие сервисы — в разделе «Полезное».
          </p>
          <Link href="/for-students" className="btn-primary inline-block">
            ПОЛЕЗНЫЕ ССЫЛКИ →
          </Link>
        </div>
      </section>
    </main>
  );
}
