'use client';

import { useState, useCallback } from 'react';

interface ScheduleDownloadProps {
  scheduleRef: React.RefObject<HTMLDivElement | null>;
  groupName: string;
  weekLabel: string;
}

export default function ScheduleDownload({ scheduleRef, groupName, weekLabel }: ScheduleDownloadProps) {
  const [loading, setLoading] = useState(false);

  const handleDownload = useCallback(async () => {
    if (!scheduleRef.current || loading) return;
    setLoading(true);

    try {
      const html2canvas = (await import('html2canvas')).default;

      const canvas = await html2canvas(scheduleRef.current, {
        backgroundColor: '#051A24',
        scale: 2,
        useCORS: true,
        logging: false,
        windowWidth: 1200,
      });

      const link = document.createElement('a');
      const safeName = groupName.replace(/[^a-zA-Zа-яА-Я0-9.-]/g, '_');
      link.download = `расписание_${safeName}_${weekLabel}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Screenshot failed:', err);
    } finally {
      setLoading(false);
    }
  }, [scheduleRef, groupName, weekLabel, loading]);

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="flex items-center gap-2 text-xs px-4 py-2 border-2 border-imo-neon/30 text-imo-neon/80 hover:border-imo-neon/60 hover:text-imo-neon hover:bg-imo-neon/5 transition-all disabled:opacity-40 disabled:cursor-not-allowed light:border-imo-ocean/30 light:text-imo-ocean/80 light:hover:border-imo-ocean/60 light:hover:text-imo-ocean light:hover:bg-imo-ocean/5"
      title="Скачать расписание как PNG"
    >
      {loading ? (
        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="square" strokeLinejoin="miter" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      )}
      <span className="hidden sm:inline">{loading ? 'Генерация...' : 'Скачать PNG'}</span>
    </button>
  );
}
