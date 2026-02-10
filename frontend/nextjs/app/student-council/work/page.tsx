import sc from '@/content/student-council.json';
import StudentCouncilNav from '@/components/StudentCouncilNav';
import { NeonGrid, AngularDivider, ScanlineOverlay } from '@/components/OceanDecorations';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Работа студсовета',
  description: 'Направления деятельности студенческого совета ИМО ДВФУ: защита прав, мероприятия, волонтёрство.',
  openGraph: {
    title: 'Работа студсовета — ИМО ДВФУ',
    description: 'Чем занимается студенческий совет Института Мирового Океана ДВФУ.',
  },
};

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-imo-deep text-white font-body overflow-x-hidden">
      {/* Баннер */}
      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-24 scanlines">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050d1a] via-imo-navy to-imo-ocean" />
        <NeonGrid />
        <ScanlineOverlay />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-5xl mb-4" aria-hidden="true">⚡</div>
          <p className="text-imo-neon/60 font-heading tracking-[0.3em] text-xs mb-3">СТУДСОВЕТ ИМО</p>
          <h1 className="text-4xl sm:text-5xl font-heading tracking-wider mb-4">РАБОТА</h1>
          <p className="text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            Направления деятельности студенческого совета
          </p>
        </div>

        <AngularDivider className="absolute bottom-0 left-0 right-0 text-imo-deep z-20" />
      </section>

      <StudentCouncilNav />

      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sc.work.map((item) => (
            <article key={item.title} className="brutal-card p-6 group text-center">
              <span className="text-4xl block mb-4 group-hover:scale-110 transition-transform duration-200" aria-hidden="true">
                {item.icon}
              </span>
              <h2 className="text-sm font-heading tracking-wider text-white mb-3 group-hover:text-imo-neon transition-colors">
                {item.title.toUpperCase()}
              </h2>
              <p className="text-xs text-white/50 font-light leading-relaxed">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
