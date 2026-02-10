import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Страница не найдена',
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-imo-deep text-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-heading text-imo-neon neon-glow mb-4">
          404
        </div>
        <h1 className="font-heading text-2xl tracking-wider mb-4">
          СТРАНИЦА НЕ НАЙДЕНА
        </h1>
        <p className="text-white/60 font-light mb-8 leading-relaxed">
          Эта страница могла быть перемещена или удалена. Проверьте адрес или вернитесь на главную.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-primary bg-imo-ocean text-white border-2 border-imo-ocean">
            На главную
          </Link>
          <Link href="/programs" className="btn-outline text-white border-white/30">
            Программы
          </Link>
        </div>
      </div>
    </main>
  );
}
