import sc from '@/content/student-council.json';
import StudentCouncilNav from '@/components/StudentCouncilNav';
import { FloatingBubbles, WaveDivider } from '@/components/OceanDecorations';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Достижения студсовета',
  description: 'Награды, реализованные проекты и достижения студенческого совета ИМО ДВФУ.',
  openGraph: {
    title: 'Достижения студсовета — ИМО ДВФУ',
    description: 'Значимые достижения и проекты студенческого совета Института Мирового Океана.',
  },
};

export default function AchievementsPage() {
  return (
    <main className="min-h-screen bg-imo-deep text-white font-body overflow-x-hidden">
      {/* Баннер */}
      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050d1a] via-imo-navy to-imo-ocean" />
        <FloatingBubbles />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-5xl mb-4" aria-hidden="true">🏆</div>
          <p className="text-imo-foam/60 font-heading tracking-[0.3em] text-xs mb-3">СТУДСОВЕТ ИМО</p>
          <h1 className="text-4xl sm:text-5xl font-heading tracking-wider mb-4">ДОСТИЖЕНИЯ</h1>
          <p className="text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            Наши проекты, награды и результаты
          </p>
        </div>

        <WaveDivider className="absolute bottom-0 left-0 right-0 text-imo-deep z-20" />
      </section>

      <StudentCouncilNav />

      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
        {/* Таймлайн */}
        <div className="relative">
          {/* Вертикальная линия */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-imo-ocean/40" aria-hidden="true" />

          <div className="space-y-8">
            {sc.achievements.map((a, i) => (
              <article key={`${a.year}-${a.title}`} className="relative pl-14">
                {/* Маркер */}
                <div
                  className="absolute left-[13px] w-5 h-5 rounded-full bg-imo-deep border-2 border-imo-sky flex items-center justify-center"
                  aria-hidden="true"
                >
                  <div className="w-2 h-2 rounded-full bg-imo-sky" />
                </div>

                <div className="glass-card p-5">
                  <span className="text-imo-coral font-heading text-xs tracking-wider">{a.year}</span>
                  <h2 className="text-base font-medium text-white mt-1 mb-2">{a.title}</h2>
                  <p className="text-sm text-white/50 font-light leading-relaxed">{a.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
