'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Ошибка приложения:', error);
  }, [error]);

  return (
    <main className="min-h-screen bg-imo-deep text-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">🌊</div>
        <h1 className="font-heading text-3xl tracking-wider mb-4 glitch-text" data-text="ПРОИЗОШЛА ОШИБКА">
          ПРОИЗОШЛА ОШИБКА
        </h1>
        <p className="text-white/60 font-light mb-8 leading-relaxed">
          Что-то пошло не так. Попробуйте обновить страницу или вернуться на главную.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={reset}
            className="btn-primary bg-imo-coral text-white border-2 border-imo-coral"
          >
            Попробовать снова
          </button>
          <a href="/" className="btn-outline text-white border-white/30">
            На главную
          </a>
        </div>
      </div>
    </main>
  );
}
