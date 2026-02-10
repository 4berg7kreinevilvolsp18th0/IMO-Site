import Link from 'next/link';
import sc from '@/content/student-council.json';
import StudentCouncilNav from '@/components/StudentCouncilNav';
import ActionButtons from '@/components/ActionButtons';
import { NeonGrid, AngularDivider, ScanlineOverlay } from '@/components/OceanDecorations';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Студенческий совет',
  description: 'Студенческий совет Института Мирового Океана ДВФУ. Мероприятия, проекты, защита прав студентов.',
  openGraph: {
    title: 'Студенческий совет — ИМО ДВФУ',
    description: 'Орган студенческого самоуправления ИМО ДВФУ. Мероприятия, проекты, обращения.',
  },
};

const SECTIONS = [
  { href: '/student-council/team', title: 'Состав', desc: 'Члены студсовета и их роли', icon: '👥' },
  { href: '/student-council/documents', title: 'Документы', desc: 'Положения, планы, отчёты', icon: '📄' },
  { href: '/student-council/achievements', title: 'Достижения', desc: 'Награды и реализованные проекты', icon: '🏆' },
  { href: '/student-council/work', title: 'Работа', desc: 'Направления деятельности', icon: '⚡' },
  { href: '/student-council/contacts', title: 'Контакты', desc: 'Как связаться и куда обратиться', icon: '📬' },
];

export default function StudentCouncilPage() {
  return (
    <main className="min-h-screen bg-imo-deep text-white font-body overflow-x-hidden">
      {/* Баннер */}
      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-24 scanlines">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050d1a] via-imo-navy to-imo-ocean" />
        <NeonGrid />
        <ScanlineOverlay />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-5xl mb-4" aria-hidden="true">🎓</div>
          <p className="text-imo-neon/60 font-heading tracking-[0.3em] text-xs mb-3">ИМО ДВФУ</p>
          <h1
            className="text-4xl sm:text-5xl font-heading tracking-wider mb-4 glitch-text"
            data-text={sc.hero.title}
          >
            {sc.hero.title}
          </h1>
          <p className="text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            {sc.hero.description}
          </p>
        </div>

        <AngularDivider className="absolute bottom-0 left-0 right-0 text-imo-deep z-20" />
      </section>

      {/* Навигация */}
      <StudentCouncilNav />

      {/* Разделы — карточки */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {SECTIONS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="brutal-card p-6 group text-center"
            >
              <span className="text-3xl block mb-3 group-hover:scale-110 transition-transform duration-200" aria-hidden="true">
                {s.icon}
              </span>
              <h2 className="font-heading text-sm tracking-wider text-white mb-2 group-hover:text-imo-neon transition-colors">
                {s.title}
              </h2>
              <p className="text-xs text-white/40 font-light">{s.desc}</p>
            </Link>
          ))}
        </div>

        {/* Новости студсовета */}
        {sc.news.length > 0 && (
          <div className="mb-16">
            <p className="text-imo-neon font-heading tracking-[0.2em] text-xs mb-2">АКТУАЛЬНО</p>
            <h2 className="font-heading text-2xl sm:text-3xl tracking-wide text-white mb-6">НОВОСТИ СТУДСОВЕТА</h2>
            <div className="w-12 h-[3px] bg-imo-neon mb-8" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {sc.news.map((item) => (
                <article key={item.id} className="brutal-card p-6 group">
                  <time className="text-xs text-imo-neon/50 font-body" dateTime={item.date}>
                    {new Date(item.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </time>
                  <h3 className="text-base font-medium mt-2 mb-2 leading-snug text-white group-hover:text-imo-neon transition-colors font-body">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed font-light">{item.intro}</p>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Кнопки действий */}
        <div>
          <p className="text-imo-coral font-heading tracking-[0.2em] text-xs mb-2">БУДЬ НА СВЯЗИ</p>
          <h2 className="font-heading text-2xl sm:text-3xl tracking-wide text-white mb-6">СОЦСЕТИ И СЕРВИСЫ</h2>
          <div className="w-12 h-[3px] bg-imo-coral mb-8" />
          <ActionButtons />
        </div>
      </section>
    </main>
  );
}
