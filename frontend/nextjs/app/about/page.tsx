import Image from 'next/image';
import info from '@/content/info.json';
import { NeonGrid, AngularDivider, DotMatrix, HexagonDecor, ScanlineOverlay } from '@/components/OceanDecorations';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'О школе',
  description: 'Институт Мирового Океана ДВФУ — научно-образовательный центр Ocean Science на острове Русский. Возможности, кампус, стипендии.',
  openGraph: {
    title: 'О школе — ИМО ДВФУ',
    description: 'Научно-образовательный центр Ocean Science. Кампус на острове Русский, полевые практики, морские экспедиции.',
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-imo-deep text-white font-body overflow-x-hidden">
      {/* Баннер */}
      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-24 scanlines">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050d1a] via-imo-navy to-imo-ocean" />
        <NeonGrid />
        <HexagonDecor className="bottom-10 right-20" />
        <ScanlineOverlay />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="border-2 border-imo-neon/30 p-3 inline-block mb-5 shadow-brutal">
            <Image
              src="/Лого вектор белое.svg"
              alt="ИМО"
              width={64}
              height={64}
              className="w-14 h-14 opacity-80"
            />
          </div>
          <p className="text-imo-neon/60 font-heading tracking-[0.3em] text-xs mb-3">ДВФУ</p>
          <h1
            className="text-4xl sm:text-5xl font-heading tracking-wider mb-4 glitch-text"
            data-text="ИНСТИТУТ МИРОВОГО ОКЕАНА"
          >
            ИНСТИТУТ МИРОВОГО ОКЕАНА
          </h1>
          <p className="text-white/60 font-light max-w-2xl mx-auto">
            Научно-образовательный центр Ocean Science на острове Русский
          </p>
        </div>

        <AngularDivider className="absolute bottom-0 left-0 right-0 text-imo-deep z-20" />
      </section>

      {/* Описание */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="brutal-card p-8 sm:p-10 mb-12 relative overflow-hidden brutal-border-neon">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-imo-neon via-imo-sky to-imo-magenta" />
          <p className="text-white/80 leading-[1.8] mb-5 font-light text-base">
            В Институте Мирового океана ДВФУ вы окажетесь в научно-образовательном центре Ocean Science
            и смежных наук. Можете изучать биологию и экологию, науки о Земле, заниматься мехатроникой
            и робототехникой.
          </p>
          <p className="text-white/80 leading-[1.8] mb-5 font-light text-base">
            Географическое расположение ДВФУ позволяет студентам ИМО на практике познакомиться с океаном
            во время занятий. Кампус расположен на острове Русский у берегов Японского моря.
          </p>
          <p className="text-white/80 leading-[1.8] font-light text-base">
            Институт Мирового океана является партнёром проекта &laquo;Плавучий университет&raquo; с международными
            учёными-участниками. Студенты ИМО регулярно применяют свои знания и оттачивают навыки
            в морских экспедициях на научно-исследовательских судах.
          </p>
        </div>

        {/* Возможности */}
        <div className="mb-12">
          <p className="text-imo-neon font-heading tracking-[0.2em] text-xs mb-2">ЧТО ТЫ ПОЛУЧИШЬ</p>
          <h2 className="font-heading text-2xl sm:text-3xl tracking-wide text-white mb-6">ВОЗМОЖНОСТИ</h2>
          <div className="w-12 h-[3px] bg-imo-neon mb-8" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {info.features.map((feature) => (
              <div key={feature.title} className="brutal-card flex items-center gap-4 p-5">
                <span className="text-2xl" aria-hidden="true">{feature.icon}</span>
                <span className="text-sm font-medium text-imo-foam/90">{feature.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Кампус */}
        <div className="mb-12 relative">
          <DotMatrix className="top-0 right-0" />
          <p className="text-imo-coral font-heading tracking-[0.2em] text-xs mb-2">ОСТРОВ РУССКИЙ</p>
          <h2 className="font-heading text-2xl sm:text-3xl tracking-wide text-white mb-6">КАМПУС</h2>
          <div className="w-12 h-[3px] bg-imo-coral mb-8" />

          <div className="brutal-card p-8 sm:p-10 brutal-border-coral">
            <ul className="space-y-4">
              {info.campus.facts.map((fact) => (
                <li key={fact} className="flex items-start gap-3 text-white/80 font-light">
                  <span className="text-imo-neon mt-0.5 text-base flex-shrink-0" aria-hidden="true">&#x25B8;</span>
                  <span className="text-sm leading-relaxed">{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Стипендии */}
        <div className="mb-12">
          <p className="text-imo-neon font-heading tracking-[0.2em] text-xs mb-2">ПОДДЕРЖКА</p>
          <h2 className="font-heading text-2xl sm:text-3xl tracking-wide text-white mb-6">СТИПЕНДИИ</h2>
          <div className="w-12 h-[3px] bg-imo-neon mb-8" />

          <div className="brutal-card p-8 sm:p-10">
            <ul className="space-y-4">
              {info.stipends.facts.map((fact) => (
                <li key={fact} className="flex items-start gap-3 text-white/80 font-light">
                  <span className="text-imo-coral mt-0.5" aria-hidden="true">&#x25A0;</span>
                  <span className="text-sm leading-relaxed">{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Контакты */}
        <div>
          <h2 className="font-heading text-2xl sm:text-3xl tracking-wide text-white mb-6">КОНТАКТЫ</h2>
          <div className="w-12 h-[3px] bg-imo-neon mb-8" />

          <div className="brutal-card p-8 sm:p-10 brutal-border-neon">
            <p className="text-white/80 text-sm mb-2 font-light">
              <strong className="font-medium">Адрес:</strong> {info.contacts.address}
            </p>
            <p className="text-white/80 text-sm mb-6 font-light">
              <strong className="font-medium">Email:</strong>{' '}
              <a href={`mailto:${info.contacts.email}`} className="text-imo-neon hover:text-imo-lime transition-colors">
                {info.contacts.email}
              </a>
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={info.links.official_site} target="_blank" rel="noopener noreferrer" className="btn-primary bg-imo-ocean text-white border-2 border-imo-ocean text-xs">
                OCEAN.STUDY
              </a>
              <a href={info.links.apply} target="_blank" rel="noopener noreferrer" className="btn-primary bg-imo-coral text-white border-2 border-imo-coral text-xs">
                ПОДАТЬ ДОКУМЕНТЫ
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
