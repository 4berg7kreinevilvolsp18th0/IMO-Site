import sc from '@/content/student-council.json';
import StudentCouncilNav from '@/components/StudentCouncilNav';
import ActionButtons from '@/components/ActionButtons';
import { NeonGrid, AngularDivider, ScanlineOverlay } from '@/components/OceanDecorations';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Контакты студсовета',
  description: 'Контакты студенческого совета ИМО ДВФУ: email, кабинет, часы работы, соцсети и бот для обращений.',
  openGraph: {
    title: 'Контакты студсовета — ИМО ДВФУ',
    description: 'Свяжитесь со студенческим советом Института Мирового Океана ДВФУ.',
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
          <div className="text-5xl mb-4" aria-hidden="true">📬</div>
          <p className="text-imo-neon/60 font-heading tracking-[0.3em] text-xs mb-3">СТУДСОВЕТ ИМО</p>
          <h1 className="text-4xl sm:text-5xl font-heading tracking-wider mb-4">КОНТАКТЫ</h1>
          <p className="text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            Как связаться со студенческим советом
          </p>
        </div>

        <AngularDivider className="absolute bottom-0 left-0 right-0 text-imo-deep z-20" />
      </section>

      <StudentCouncilNav />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        {/* Контактная информация */}
        <div className="brutal-card p-6 sm:p-8 mb-10 brutal-border-neon">
          <h2 className="font-heading text-lg tracking-wider text-white mb-6">ИНФОРМАЦИЯ</h2>
          <address className="not-italic space-y-4">
            <div className="flex items-start gap-4">
              <span className="text-imo-neon text-sm mt-0.5 flex-shrink-0" aria-hidden="true">&#x25B8;</span>
              <div>
                <div className="text-xs text-imo-neon/40 font-heading tracking-wider mb-0.5">EMAIL</div>
                <a
                  href={`mailto:${sc.contacts.email}`}
                  className="text-sm text-imo-neon hover:text-imo-lime transition-colors"
                >
                  {sc.contacts.email}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-imo-neon text-sm mt-0.5 flex-shrink-0" aria-hidden="true">&#x25B8;</span>
              <div>
                <div className="text-xs text-imo-neon/40 font-heading tracking-wider mb-0.5">КАБИНЕТ</div>
                <div className="text-sm text-white/80">{sc.contacts.office}</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-imo-neon text-sm mt-0.5 flex-shrink-0" aria-hidden="true">&#x25B8;</span>
              <div>
                <div className="text-xs text-imo-neon/40 font-heading tracking-wider mb-0.5">ЧАСЫ РАБОТЫ</div>
                <div className="text-sm text-white/80">{sc.contacts.hours}</div>
              </div>
            </div>
          </address>
          <p className="text-sm text-white/50 mt-6 font-light leading-relaxed">{sc.contacts.desc}</p>
        </div>

        {/* Кнопки соцсетей и ботов */}
        <div>
          <p className="text-imo-coral font-heading tracking-[0.2em] text-xs mb-2">НА СВЯЗИ</p>
          <h2 className="font-heading text-2xl sm:text-3xl tracking-wide text-white mb-6">СОЦСЕТИ И БОТЫ</h2>
          <div className="w-12 h-[3px] bg-imo-coral mb-8" />
          <ActionButtons />
        </div>
      </section>
    </main>
  );
}
