import newsData from '@/content/news.json';
import { NeonGrid, AngularDivider, ScanlineOverlay } from '@/components/OceanDecorations';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Новости',
  description: 'Новости Института Мирового Океана ДВФУ. Приёмная кампания, экспедиции, стипендии и мероприятия.',
  openGraph: {
    title: 'Новости — ИМО ДВФУ',
    description: 'Актуальная информация об Институте Мирового Океана ДВФУ.',
  },
};

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-imo-deep text-white font-body overflow-x-hidden">
      {/* Баннер */}
      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-24 scanlines">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050d1a] via-imo-navy to-imo-ocean" />
        <NeonGrid />
        <ScanlineOverlay />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-imo-neon/60 font-heading tracking-[0.3em] text-xs mb-3">АКТУАЛЬНО</p>
          <h1
            className="text-4xl sm:text-5xl font-heading tracking-wider mb-4 glitch-text"
            data-text="НОВОСТИ ИМО"
          >
            НОВОСТИ ИМО
          </h1>
          <p className="text-white/60 font-light max-w-xl mx-auto">
            Актуальная информация об Институте Мирового Океана ДВФУ
          </p>
        </div>

        <AngularDivider className="absolute bottom-0 left-0 right-0 text-imo-deep z-20" />
      </section>

      {/* Список новостей */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        {newsData.length > 0 ? (
          <div className="flex flex-col gap-6">
            {newsData.map((item) => (
              <article
                key={item.id}
                className="brutal-card p-6 sm:p-8 relative overflow-hidden group"
              >
                {/* Акцентная полоса сверху */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-imo-neon to-imo-coral opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex items-start gap-4">
                  {/* Дата слева */}
                  <div className="hidden sm:flex flex-col items-center flex-shrink-0 w-14 border-2 border-white/10 p-2">
                    <span className="text-2xl font-heading text-imo-neon neon-glow">
                      {new Date(item.date).getDate()}
                    </span>
                    <span className="text-[10px] text-white/40 font-heading tracking-wider">
                      {new Date(item.date).toLocaleDateString('ru-RU', { month: 'short' }).toUpperCase().replace('.', '')}
                    </span>
                    <span className="text-[10px] text-white/30">
                      {new Date(item.date).getFullYear()}
                    </span>
                  </div>

                  <div className="flex-1">
                    <time className="sm:hidden text-xs text-imo-neon/50 block mb-1" dateTime={item.date}>
                      {new Date(item.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </time>
                    <h2 className="text-lg sm:text-xl font-medium mb-2 text-white group-hover:text-imo-neon transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-sm text-white/50 leading-relaxed font-light">{item.intro}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="brutal-card p-10 text-center brutal-border-neon">
            <div className="text-4xl mb-4" aria-hidden="true">📰</div>
            <p className="text-white/50 font-light">
              Пока нет опубликованных новостей.
            </p>
            <p className="text-xs text-white/30 mt-2">
              Добавьте новость в файл <code className="text-imo-neon font-mono">content/news.json</code>
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
