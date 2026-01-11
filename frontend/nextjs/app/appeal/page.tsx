'use client';

import React from 'react';
import Link from 'next/link';

export default function AppealPage() {
  const botUrl = process.env.NEXT_PUBLIC_TELEGRAM_BOT_URL || 'https://t.me/oss_dvfu_bot';

  return (
    <main className="min-h-screen bg-oss-dark light:bg-gray-50 text-white light:text-gray-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-4">Обращения через Telegram бот</h1>
          <p className="text-white/70 light:text-gray-600 mb-6">
            Все обращения теперь принимаются через единый Telegram бот для удобства и оперативности.
          </p>
        </div>
        
        <div className="space-y-4">
          <a
            href={botUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 rounded-xl bg-oss-red font-semibold hover:bg-oss-red/90 transition
              light:shadow-[0_4px_12px_rgba(209,31,42,0.25)] light:hover:shadow-[0_8px_24px_rgba(209,31,42,0.35)]
              flex items-center justify-center gap-3 mx-auto"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.169 0-.315.06-.459.19l-1.15.956-2.22 1.851c-.09.08-.18.15-.27.22-.09.07-.18.13-.27.18-.09.05-.18.09-.27.12-.09.03-.18.05-.27.05-.09 0-.18-.02-.27-.05-.09-.03-.18-.07-.27-.12-.09-.05-.18-.11-.27-.18-.09-.07-.18-.14-.27-.22l-2.22-1.851-1.15-.956c-.144-.13-.29-.19-.459-.19-.169 0-.315.06-.459.19-.144.13-.229.31-.229.52 0 .21.085.39.229.52l1.15.956 2.22 1.851c.09.08.18.15.27.22.09.07.18.13.27.18.09.05.18.09.27.12.09.03.18.05.27.05.09 0 .18-.02.27-.05.09-.03.18-.07.27-.12.09-.05.18-.11.27-.18.09-.07.18-.14.27-.22l2.22-1.851 1.15-.956c.144-.13.229-.31.229-.52 0-.21-.085-.39-.229-.52-.144-.13-.29-.19-.459-.19z"/>
            </svg>
            Открыть Telegram бот
          </a>
          
          <Link
            href="/appeal/status"
            className="inline-block px-6 py-3 rounded-xl border border-white/20 text-white/80 hover:text-white transition
              light:bg-white light:border-2 light:border-gray-300 light:text-gray-900 
              light:hover:bg-gray-50 light:hover:border-oss-red/40 light:hover:text-oss-red"
          >
            Проверить статус обращения
          </Link>
        </div>
        
        <div className="mt-8 text-sm text-white/60 light:text-gray-500">
          <p>Статистика обращений доступна на странице <Link href="/statistics" className="text-oss-red hover:underline">Статистика</Link></p>
        </div>
      </div>
    </main>
  );
}
