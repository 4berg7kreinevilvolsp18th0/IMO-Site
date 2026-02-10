import { DIRECTIONS } from '@/lib/directions';
import { getAccentColor } from '@/lib/utils';
import info from '@/content/info.json';
import { NeonGrid, AngularDivider, ScanlineOverlay } from '@/components/OceanDecorations';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Программы',
  description: '7 программ бакалавриата и 9 программ магистратуры в Институте Мирового Океана ДВФУ. География, биология, экология, мехатроника.',
  openGraph: {
    title: 'Программы подготовки — ИМО ДВФУ',
    description: 'Бакалавриат и магистратура в Институте Мирового Океана ДВФУ.',
  },
};

const MASTERS = [
  { icon: '🗺️', title: 'Социально-экономическая география и пространственная аналитика', code: '05.04.02 География', places: '15 бюджетных мест', desc: 'Геомаркетинг, стратегии развития, пространственные данные.' },
  { icon: '⛈️', title: 'Прикладная гидрометеорология', code: '05.04.05', places: '15 бюджетных мест', desc: 'Мониторинг прибрежных территорий, цифровое моделирование, прогнозирование.' },
  { icon: '🏖️', title: 'Технологии мониторинга прибрежных экосистем', code: '05.04.06', places: '15 бюджетных мест', desc: 'Морское право, биомониторинг, экологическая безопасность.' },
  { icon: '🔬', title: 'Биологические системы (совместно с ДВО РАН)', code: '06.04.01', places: '25 бюджетных мест', desc: 'Биосистемы, биомониторинг, природоохранные технологии.' },
  { icon: '🧫', title: 'Молекулярная и клеточная биология', code: '06.04.01', places: '15 бюджетных мест', desc: 'Генная инженерия, биоинформатика, биомаркеры заболеваний.' },
  { icon: '🌾', title: 'Агроэкология (совместно с РГАУ МСХА)', code: '06.04.02', places: '14 бюджетных мест', desc: 'Цифровое земледелие, воспроизводство плодородия почв.' },
  { icon: '🤖', title: 'Мехатроника и робототехника (с ИАПУ ДВО РАН)', code: '15.04.06', places: '18 бюджетных мест', desc: 'Проектирование мехатронных систем, подводные роботы.' },
  { icon: '🐠', title: 'Водные биоресурсы и аквакультура', code: '35.04.07', places: '5 мест (договор)', desc: 'Воспроизводство гидробионтов, рыбоохрана, аквакультура.' },
];

export default function ProgramsPage() {
  return (
    <main className="min-h-screen bg-imo-deep text-white font-body overflow-x-hidden">
      {/* Баннер */}
      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-24 scanlines">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050d1a] via-imo-navy to-imo-ocean" />
        <NeonGrid />
        <ScanlineOverlay />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-imo-neon/60 font-heading tracking-[0.3em] text-xs mb-3">ОБРАЗОВАНИЕ</p>
          <h1
            className="text-4xl sm:text-5xl font-heading tracking-wider mb-4 glitch-text"
            data-text="ПРОГРАММЫ ПОДГОТОВКИ"
          >
            ПРОГРАММЫ ПОДГОТОВКИ
          </h1>
          <p className="text-white/60 font-light max-w-2xl mx-auto">
            7 программ бакалавриата и 9 программ магистратуры. Подробности на{' '}
            <a href={info.links.official_site} target="_blank" rel="noopener noreferrer" className="text-imo-neon hover:text-imo-lime transition-colors">
              ocean.study
            </a>.
          </p>
        </div>

        <AngularDivider className="absolute bottom-0 left-0 right-0 text-imo-deep z-20" />
      </section>

      {/* Бакалавриат */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="mb-10">
          <p className="text-imo-neon font-heading tracking-[0.2em] text-xs mb-2">ПЕРВАЯ СТУПЕНЬ</p>
          <h2 className="font-heading text-2xl sm:text-3xl tracking-wide text-white">БАКАЛАВРИАТ</h2>
          <div className="w-12 h-[3px] bg-imo-neon mt-3" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
          {DIRECTIONS.map((d) => (
            <ProgramCard
              key={d.slug}
              icon={d.icon}
              title={d.title}
              desc={d.description}
              accentColor={getAccentColor(d.slug)}
            />
          ))}
          <ProgramCard
            icon="🐟"
            title="Водные биоресурсы и аквакультура"
            desc="Управление рыбохозяйством, марикультура, экологический мониторинг водных объектов."
            accentColor="#00897B"
          />
        </div>
      </section>

      {/* Магистратура */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-imo-deep via-imo-navy/30 to-imo-deep" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <p className="text-imo-coral font-heading tracking-[0.2em] text-xs mb-2">ВТОРАЯ СТУПЕНЬ</p>
            <h2 className="font-heading text-2xl sm:text-3xl tracking-wide text-white">МАГИСТРАТУРА</h2>
            <div className="w-12 h-[3px] bg-imo-coral mt-3" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {MASTERS.map((item) => (
              <div key={item.code + item.title} className="program-card p-6" style={{ '--accent-color': '#FF7043' } as React.CSSProperties}>
                <div className="flex items-start gap-3 mb-2">
                  <span className="text-2xl flex-shrink-0" aria-hidden="true">{item.icon}</span>
                  <div>
                    <h3 className="text-base font-medium leading-snug text-white font-body">{item.title}</h3>
                    <p className="text-xs text-imo-neon/50 mt-1">{item.code} &middot; {item.places}</p>
                  </div>
                </div>
                <p className="text-sm text-white/50 leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-imo-deep">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-heading text-2xl sm:text-3xl tracking-wide text-white mb-4">ГОТОВ ПОСТУПИТЬ?</h2>
          <p className="text-white/50 font-light mb-8">
            Подробная информация о вступительных испытаниях и документах — на официальном сайте ДВФУ.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={info.links.apply} target="_blank" rel="noopener noreferrer" className="btn-primary bg-imo-coral text-white border-2 border-imo-coral">
              Подать документы
            </a>
            <a href={info.links.official_site} target="_blank" rel="noopener noreferrer" className="btn-outline text-white border-white/30">
              ocean.study &rarr;
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function ProgramCard({ icon, title, desc, accentColor }: { icon: string; title: string; desc: string; accentColor: string }) {
  return (
    <div className="program-card p-6 group" style={{ '--accent-color': accentColor } as React.CSSProperties}>
      <div className="flex items-start gap-3 mb-3">
        <span className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true">{icon}</span>
        <h3 className="text-base font-medium leading-snug text-white group-hover:text-imo-neon transition-colors font-body">{title}</h3>
      </div>
      <p className="text-sm text-white/50 leading-relaxed font-light">{desc}</p>
    </div>
  );
}
