import sc from '@/content/student-council.json';
import StudentCouncilNav from '@/components/StudentCouncilNav';
import { FloatingBubbles, WaveDivider } from '@/components/OceanDecorations';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Состав студсовета',
  description: 'Члены студенческого совета ИМО ДВФУ — председатель, заместители и ответственные за направления.',
  openGraph: {
    title: 'Состав студсовета — ИМО ДВФУ',
    description: 'Познакомьтесь с командой студенческого совета Института Мирового Океана.',
  },
};

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-imo-deep text-white font-body overflow-x-hidden">
      {/* Баннер */}
      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050d1a] via-imo-navy to-imo-ocean" />
        <FloatingBubbles />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-5xl mb-4" aria-hidden="true">👥</div>
          <p className="text-imo-foam/60 font-heading tracking-[0.3em] text-xs mb-3">СТУДСОВЕТ ИМО</p>
          <h1 className="text-4xl sm:text-5xl font-heading tracking-wider mb-4">СОСТАВ</h1>
          <p className="text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            Команда студенческого совета ИМО ДВФУ
          </p>
        </div>

        <WaveDivider className="absolute bottom-0 left-0 right-0 text-imo-deep z-20" />
      </section>

      <StudentCouncilNav />

      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sc.team.map((member) => (
            <article key={member.role} className="glass-card p-6 text-center group">
              {/* Аватар-заглушка */}
              <div className="w-20 h-20 rounded-full bg-imo-ocean/30 border-2 border-imo-sky/20 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl text-imo-sky/80" aria-hidden="true">
                  {member.name.split(' ').map((n) => n[0]).join('')}
                </span>
              </div>
              <h2 className="text-base font-medium text-white mb-1 group-hover:text-imo-sky transition-colors">
                {member.name}
              </h2>
              <p className="text-xs text-imo-sky/70 font-heading tracking-wider mb-3">{member.role}</p>
              <p className="text-xs text-white/40 font-light leading-relaxed">{member.desc}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
