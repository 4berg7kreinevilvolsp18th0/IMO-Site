import Image from 'next/image';
import info from '@/content/info.json';
import { NeonGrid, AngularDivider, DotMatrix, ScanlineOverlay } from '@/components/OceanDecorations';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Контакты',
  description: 'Контактная информация Института Мирового Океана ДВФУ. Адрес, email, социальные сети.',
  openGraph: {
    title: 'Контакты — ИМО ДВФУ',
    description: 'Свяжитесь с Институтом Мирового Океана ДВФУ. Остров Русский, Владивосток.',
  },
};

export default function ContactsPage() {
  return (
    <main className="min-h-screen bg-imo-deep text-white font-body overflow-x-hidden">
      {/* Баннер */}
      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-24 scanlines">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050d1a] via-imo-navy to-imo-ocean" />
        <NeonGrid />
        <ScanlineOverlay />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-imo-neon/60 font-heading tracking-[0.3em] text-xs mb-3">СВЯЗАТЬСЯ</p>
          <h1
            className="text-4xl sm:text-5xl font-heading tracking-wider mb-4 glitch-text"
            data-text="КОНТАКТЫ"
          >
            КОНТАКТЫ
          </h1>
          <p className="text-white/60 font-light max-w-xl mx-auto">
            Свяжитесь с Институтом Мирового Океана ДВФУ
          </p>
        </div>

        <AngularDivider className="absolute bottom-0 left-0 right-0 text-imo-deep z-20" />
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        {/* Основная информация */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
          <div className="brutal-card p-8 relative overflow-hidden brutal-border-neon">
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/Лого вектор белое.svg"
                alt="ИМО"
                width={36}
                height={36}
                className="w-9 h-9 opacity-80"
              />
              <h2 className="font-heading text-sm tracking-[0.15em] text-white">ИМО ДВФУ</h2>
            </div>
            <address className="space-y-3 not-italic">
              <p className="text-sm text-white/60 font-light flex items-start gap-2">
                <span className="text-imo-neon mt-0.5" aria-hidden="true">&#x25B8;</span>
                {info.contacts.address}
              </p>
              <p className="text-sm text-white/60 font-light flex items-start gap-2">
                <span className="text-imo-neon mt-0.5" aria-hidden="true">&#x25B8;</span>
                <a href={`mailto:${info.contacts.email}`} className="text-imo-neon hover:text-imo-lime transition-colors">
                  {info.contacts.email}
                </a>
              </p>
            </address>
          </div>

          <div className="brutal-card p-8 relative overflow-hidden">
            <h2 className="font-heading text-sm tracking-[0.15em] text-white mb-5">ОФИЦИАЛЬНЫЙ САЙТ</h2>
            <a
              href={info.links.official_site}
              target="_blank"
              rel="noopener noreferrer"
              className="text-imo-neon hover:text-imo-lime text-lg font-heading tracking-wider transition-colors neon-glow"
              aria-label="Официальный сайт ИМО — ocean.study"
            >
              OCEAN.STUDY
            </a>
            <p className="text-sm text-white/50 mt-3 font-light leading-relaxed">
              Полная информация о программах, поступлении и жизни в кампусе.
            </p>
          </div>
        </div>

        {/* Соцсети */}
        <div className="mb-14 relative">
          <DotMatrix className="top-0 right-0" />
          <p className="text-imo-neon font-heading tracking-[0.2em] text-xs mb-2">БУДЬ НА СВЯЗИ</p>
          <h2 className="font-heading text-2xl sm:text-3xl tracking-wide text-white mb-6">СОЦИАЛЬНЫЕ СЕТИ</h2>
          <div className="w-12 h-[3px] bg-imo-neon mb-8" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ContactSocialCard
              href={info.links.vk_school}
              title="ВКонтакте школы"
              desc="Новости и объявления ИМО"
              icon="📢"
              accent="bg-[#4C75A3]"
            />
            <ContactSocialCard
              href={info.links.telegram_school}
              title="Telegram школы"
              desc="Оперативная информация"
              icon="💬"
              accent="bg-[#2AABEE]"
            />
            <ContactSocialCard
              href={info.links.vk_student_council}
              title="ВК студенческого совета"
              desc="Мероприятия и активности"
              icon="🎉"
              accent="bg-[#4C75A3]"
            />
            <ContactSocialCard
              href={info.links.telegram_student_council}
              title="Telegram студсовета"
              desc="Чат и новости студсовета"
              icon="🤝"
              accent="bg-[#2AABEE]"
            />
          </div>
        </div>

        {/* CTA */}
        <div className="brutal-card p-8 sm:p-10 text-center relative overflow-hidden brutal-border-neon">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-imo-neon via-imo-sky to-imo-coral" />
          <h3 className="font-heading text-xl tracking-wider text-white mb-3">ХОЧЕШЬ ПОСТУПИТЬ?</h3>
          <p className="text-sm text-white/50 font-light mb-6 max-w-lg mx-auto">
            Узнай всё о программах, вступительных испытаниях и документах на официальном сайте.
          </p>
          <a
            href={info.links.apply}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary bg-imo-coral text-white border-2 border-imo-coral"
          >
            Подать документы
          </a>
        </div>
      </section>
    </main>
  );
}

function ContactSocialCard({ href, title, desc, icon, accent }: {
  href: string; title: string; desc: string; icon: string; accent: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${title} — ${desc}`}
      className="brutal-card flex items-start gap-4 p-5 group"
    >
      <div className={`flex-shrink-0 w-10 h-10 ${accent} flex items-center justify-center text-lg shadow-brutal-sm`} aria-hidden="true">
        {icon}
      </div>
      <div>
        <div className="font-medium text-white group-hover:text-imo-neon transition-colors text-sm">{title}</div>
        <div className="text-xs text-white/40 mt-0.5 font-light">{desc}</div>
      </div>
    </a>
  );
}
