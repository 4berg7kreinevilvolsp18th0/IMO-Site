import Link from 'next/link';
import Image from 'next/image';
import { DIRECTIONS } from '@/lib/directions';
import { getAccentColor } from '@/lib/utils';
import info from '@/content/info.json';
import newsData from '@/content/news.json';
import SocialCard, { VkIcon, TgIcon } from '@/components/SocialCard';
import {
  WaveDivider,
  WaveDividerSoft,
  FloatingBubbles,
  FloatingFish,
  SeaweedDecor,
  WavePattern,
  Compass,
} from '@/components/OceanDecorations';

export default function Home() {
  const latestNews = newsData.slice(0, 3);

  return (
    <main className="min-h-screen bg-imo-deep text-white font-body overflow-x-hidden">

      {/* ═══════════════════════════════════════════
          СЕКЦИЯ 1 — HERO (как на ocean.study)
          ═══════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Градиентный фон */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050d1a] via-imo-navy to-imo-ocean" />

        {/* Декорации */}
        <FloatingBubbles />
        <FloatingFish className="top-1/4 left-0 text-imo-foam" />
        <FloatingFish className="top-2/3 left-0 text-imo-sky" />
        <WavePattern className="top-20 left-10 wave-shimmer" />
        <Compass className="bottom-20 right-10 slow-spin" />
        <SeaweedDecor className="bottom-0 left-[5%] text-imo-teal" />
        <SeaweedDecor className="bottom-0 right-[8%] text-imo-green" />

        {/* Свечения */}
        <div className="absolute top-20 -left-40 w-[500px] h-[500px] rounded-full bg-imo-ocean/20 blur-[120px]" aria-hidden="true" />
        <div className="absolute bottom-20 -right-40 w-[400px] h-[400px] rounded-full bg-imo-sky/15 blur-[100px]" aria-hidden="true" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center py-20">
          {/* Логотип */}
          <div className="flex justify-center mb-8 animate-fade-in-down">
            <Image
              src="/Лого вектор белое.svg"
              alt="Логотип Института Мирового Океана"
              width={100}
              height={100}
              className="w-20 h-20 sm:w-24 sm:h-24 gentle-float"
              priority
            />
          </div>

          {/* Тэглайн */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading tracking-wider mb-6 leading-[1.1] animate-fade-in-down">
            <span className="block text-white">{info.hero.tagline.split(' в ')[0]}</span>
            <span className="block bg-gradient-to-r from-imo-foam via-imo-sky to-imo-wave bg-clip-text text-transparent">
              в главном восточном
            </span>
            <span className="block text-white">вузе страны</span>
          </h1>

          <p className="text-imo-foam/60 font-heading tracking-[0.3em] text-xs sm:text-sm mb-6 animate-fade-in-up delay-200">
            {info.hero.subtitle}
          </p>

          <p className="text-base sm:text-lg max-w-3xl mx-auto text-white/70 mb-10 leading-relaxed animate-fade-in-up delay-300 font-light">
            {info.hero.description}
          </p>

          {/* CTA */}
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up delay-400">
            <a
              href={info.links.apply}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-imo-coral text-white hover:bg-orange-500"
            >
              Поступить
            </a>
            <a
              href={info.links.official_site}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-white hover:text-imo-foam"
            >
              ocean.study →
            </a>
          </div>
        </div>

        {/* Волна-разделитель */}
        <WaveDivider className="absolute bottom-0 left-0 right-0 text-imo-deep z-20" />
      </section>

      {/* ═══════════════════════════════════════════
          СЕКЦИЯ 2 — «В ИМО ТЫ СМОЖЕШЬ» (фичи)
          ═══════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28 bg-imo-deep">
        <WavePattern className="top-10 right-20 wave-shimmer" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="section-title text-3xl sm:text-4xl text-white mb-4">
              В Институте Мирового <br className="hidden sm:block" />океана ты сможешь
            </h2>
            <div className="w-16 h-1 bg-imo-wave mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {info.features.map((feature) => (
              <div
                key={feature.title}
                className="glass-card p-6 text-center group"
              >
                <span className="text-3xl sm:text-4xl block mb-3 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                  {feature.icon}
                </span>
                <span className="text-sm sm:text-base font-medium text-imo-foam/90">{feature.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          СЕКЦИЯ 3 — ПРОГРАММЫ БАКАЛАВРИАТА
          ═══════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        {/* Фоновый градиент */}
        <div className="absolute inset-0 bg-gradient-to-b from-imo-deep via-imo-navy/50 to-imo-deep" />
        <FloatingBubbles />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between gap-4 flex-wrap mb-12">
            <div>
              <p className="text-imo-sky font-heading tracking-[0.2em] text-xs mb-2">ОБРАЗОВАНИЕ</p>
              <h2 className="section-title text-3xl sm:text-4xl text-white">Бакалавриат</h2>
              <div className="w-12 h-1 bg-imo-wave mt-3 rounded-full" />
            </div>
            <Link
              href="/programs"
              className="text-sm text-imo-sky hover:text-imo-foam transition-colors font-heading tracking-wider"
            >
              ВСЕ ПРОГРАММЫ →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DIRECTIONS.map((d) => (
              <div
                key={d.slug}
                className="glass-card program-card p-6"
                style={{ '--accent-color': getAccentColor(d.slug) } as React.CSSProperties}
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl flex-shrink-0" aria-hidden="true">{d.icon}</span>
                  <div>
                    <h3 className="text-base font-medium leading-snug text-white font-body">
                      {d.title}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-white/50 leading-relaxed font-light">{d.description}</p>
              </div>
            ))}
            {/* Водные биоресурсы */}
            <div
              className="glass-card program-card p-6"
              style={{ '--accent-color': '#00897B' } as React.CSSProperties}
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl flex-shrink-0" aria-hidden="true">🐟</span>
                <h3 className="text-base font-medium leading-snug text-white font-body">
                  Водные биоресурсы и аквакультура
                </h3>
              </div>
              <p className="text-sm text-white/50 leading-relaxed font-light">
                Управление рыбохозяйством, марикультура, экологический мониторинг водных объектов.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          СЕКЦИЯ 4 — ЭКСПЕДИЦИИ (Плавучий университет)
          ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-imo-navy via-imo-ocean to-imo-wave" />
        <WaveDividerSoft className="absolute top-0 text-imo-deep rotate-180" />
        <FloatingBubbles />
        <SeaweedDecor className="bottom-0 left-[3%] text-imo-foam" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-24 sm:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-imo-foam/60 font-heading tracking-[0.2em] text-xs mb-3">ПЛАВУЧИЙ УНИВЕРСИТЕТ</p>
              <h2 className="section-title text-3xl sm:text-4xl text-white mb-6">
                {info.expeditions.title}
              </h2>
              <p className="section-subtitle text-white/80 mb-6 leading-relaxed">
                {info.expeditions.description}
              </p>
              <a
                href={info.expeditions.video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-white border-white/30 hover:border-imo-foam"
                aria-label="Смотреть видео об экспедициях (откроется в новом окне)"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
                Смотреть видео
              </a>
            </div>
            <div className="relative">
              {/* Декоративная карточка-иллюстрация */}
              <div className="glass-card p-8 text-center">
                <div className="text-6xl mb-4" aria-hidden="true">🚢</div>
                <h3 className="font-heading text-xl tracking-wider text-white mb-3">НИС ДВФУ</h3>
                <p className="text-sm text-white/60 font-light leading-relaxed">
                  Научно-исследовательские суда — ваш класс в открытом океане. Сбор проб, 
                  анализ экосистем и работа бок о бок с международными учёными.
                </p>
              </div>
              <FloatingFish className="top-4 -right-10 text-imo-foam" />
            </div>
          </div>
        </div>

        <WaveDividerSoft className="absolute bottom-0 text-imo-deep" />
      </section>

      {/* ═══════════════════════════════════════════
          СЕКЦИЯ 5 — ПРАКТИКИ И СТАЖИРОВКИ
          ═══════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28 bg-imo-deep">
        <WavePattern className="bottom-10 left-10 wave-shimmer" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-imo-sky font-heading tracking-[0.2em] text-xs mb-2">ОПЫТ</p>
            <h2 className="section-title text-3xl sm:text-4xl text-white mb-4">
              {info.practices.title}
            </h2>
            <div className="w-16 h-1 bg-imo-wave mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-8">
              <div className="text-3xl mb-4" aria-hidden="true">🔬</div>
              <h3 className="font-heading text-lg tracking-wider text-white mb-3">ПОЛЕВЫЕ ПРАКТИКИ</h3>
              <p className="text-sm text-white/60 font-light leading-relaxed">
                {info.practices.description}
              </p>
            </div>
            <div className="glass-card p-8">
              <div className="text-3xl mb-4" aria-hidden="true">✈️</div>
              <h3 className="font-heading text-lg tracking-wider text-white mb-3">МЕЖДУНАРОДНЫЕ СТАЖИРОВКИ</h3>
              <p className="text-sm text-white/60 font-light leading-relaxed">
                {info.practices.international}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          СЕКЦИЯ 6 — КАМПУС
          ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-imo-deep via-imo-navy/40 to-imo-deep" />
        <Compass className="top-10 left-10 slow-spin" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Карточка с фактами */}
            <div>
              <p className="text-imo-coral font-heading tracking-[0.2em] text-xs mb-2">ОСТРОВ РУССКИЙ</p>
              <h2 className="section-title text-3xl sm:text-4xl text-white mb-6">
                {info.campus.title}
              </h2>
              <ul className="space-y-4">
                {info.campus.facts.map((fact) => (
                  <li key={fact} className="flex items-start gap-3 text-white/80 font-light">
                    <span className="text-imo-wave mt-0.5 text-lg flex-shrink-0" aria-hidden="true">▸</span>
                    <span className="text-sm leading-relaxed">{fact}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Иллюстрация кампуса */}
            <div className="glass-card p-8 text-center">
              <div className="text-5xl mb-4" aria-hidden="true">🏛️</div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-2xl font-heading text-imo-foam">10 000+</div>
                  <div className="text-xs text-white/50 mt-1">мест в общежитиях</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-heading text-imo-foam">200</div>
                  <div className="text-xs text-white/50 mt-1">гектаров кампуса</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-heading text-imo-foam">8</div>
                  <div className="text-xs text-white/50 mt-1">учебных корпусов</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-heading text-imo-coral">2 860 ₽</div>
                  <div className="text-xs text-white/50 mt-1">проживание / мес.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          СЕКЦИЯ 7 — СТИПЕНДИИ
          ═══════════════════════════════════════════ */}
      <section className="relative py-16 sm:py-20 bg-imo-deep">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="glass-card p-8 sm:p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-imo-ocean via-imo-wave to-imo-sky" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-imo-wave font-heading tracking-[0.2em] text-xs mb-2">ПОДДЕРЖКА</p>
                <h2 className="section-title text-2xl sm:text-3xl text-white mb-4">
                  {info.stipends.title}
                </h2>
                <ul className="space-y-3">
                  {info.stipends.facts.map((fact) => (
                    <li key={fact} className="flex items-start gap-3 text-white/80 font-light">
                      <span className="text-imo-coral mt-0.5" aria-hidden="true">💰</span>
                      <span className="text-sm leading-relaxed">{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-center">
                <div className="inline-block">
                  <div className="text-5xl sm:text-6xl font-heading bg-gradient-to-r from-imo-foam to-imo-sky bg-clip-text text-transparent">
                    30 000 ₽
                  </div>
                  <div className="text-sm text-white/50 mt-2 font-light">максимальная партнёрская стипендия</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          СЕКЦИЯ 8 — НОВОСТИ
          ═══════════════════════════════════════════ */}
      {latestNews.length > 0 && (
        <section className="relative py-20 sm:py-28 bg-imo-deep">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-end justify-between gap-4 flex-wrap mb-12">
              <div>
                <p className="text-imo-sky font-heading tracking-[0.2em] text-xs mb-2">АКТУАЛЬНО</p>
                <h2 className="section-title text-3xl sm:text-4xl text-white">Новости</h2>
                <div className="w-12 h-1 bg-imo-wave mt-3 rounded-full" />
              </div>
              <Link
                href="/news"
                className="text-sm text-imo-sky hover:text-imo-foam transition-colors font-heading tracking-wider"
              >
                ВСЕ НОВОСТИ →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {latestNews.map((item) => (
                <article key={item.id} className="glass-card p-6 group">
                  <time className="text-xs text-imo-foam/50 font-body" dateTime={item.date}>
                    {new Date(item.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </time>
                  <h3 className="text-base font-medium mt-2 mb-2 leading-snug text-white group-hover:text-imo-sky transition-colors font-body">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed font-light">{item.intro}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          СЕКЦИЯ 9 — СОЦСЕТИ
          ═══════════════════════════════════════════ */}
      <section className="relative py-16 sm:py-20 bg-imo-deep">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="section-title text-2xl sm:text-3xl text-white mb-4">
              Ресурсы и соцсети
            </h2>
            <p className="section-subtitle text-white/50 max-w-xl mx-auto text-sm">
              Следите за новостями школы и студенческого совета ИМО
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <SocialCard
              href={info.links.vk_school}
              title="ВКонтакте школы"
              desc="Новости и объявления"
              icon={<VkIcon />}
              color="bg-[#4C75A3]"
            />
            <SocialCard
              href={info.links.telegram_school}
              title="Telegram школы"
              desc="Оперативная информация"
              icon={<TgIcon />}
              color="bg-[#2AABEE]"
            />
            <SocialCard
              href={info.links.vk_student_council}
              title="ВК студсовета"
              desc="Мероприятия и активности"
              icon={<VkIcon />}
              color="bg-[#4C75A3]"
            />
            <SocialCard
              href={info.links.telegram_student_council}
              title="Telegram студсовета"
              desc="Чат и новости"
              icon={<TgIcon />}
              color="bg-[#2AABEE]"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          СЕКЦИЯ 10 — CTA «ПОСТУПИТЬ»
          ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-imo-ocean via-imo-wave to-imo-sky" />
        <WaveDividerSoft className="absolute top-0 text-imo-deep rotate-180" />
        <FloatingBubbles />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-24 sm:py-32 text-center">
          <Image
            src="/Лого вектор белое.svg"
            alt="ИМО"
            width={60}
            height={60}
            className="w-14 h-14 mx-auto mb-6 opacity-80 gentle-float"
          />
          <h2 className="section-title text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            Присоединяйся к ИМО
          </h2>
          <p className="section-subtitle text-white/80 mb-10 max-w-2xl mx-auto">
            Кампус на острове Русский, море под окнами, морские экспедиции, стипендии до 30 000 ₽ 
            и стажировки в вузах Кореи, Японии и Китая.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={info.links.apply}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-white text-imo-navy hover:bg-imo-foam"
            >
              Поступить в ИМО
            </a>
            <a
              href={info.links.official_site}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-white border-white/40 hover:border-white/70"
            >
              ocean.study →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
