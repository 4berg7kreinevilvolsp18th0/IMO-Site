import sc from '@/content/student-council.json';
import StudentCouncilNav from '@/components/StudentCouncilNav';
import { NeonGrid, AngularDivider, ScanlineOverlay } from '@/components/OceanDecorations';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Документы студсовета',
  description: 'Положения, планы работы, отчёты и протоколы студенческого совета ИМО ДВФУ.',
  openGraph: {
    title: 'Документы студсовета — ИМО ДВФУ',
    description: 'Официальные документы студенческого совета Института Мирового Океана.',
  },
};

function DocIcon({ type }: { type: string }) {
  if (type === 'pdf') {
    return (
      <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9l-6-6H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M13 3v6h6" />
      </svg>
    );
  }
  return (
    <svg className="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  );
}

export default function DocumentsPage() {
  return (
    <main className="min-h-screen bg-imo-deep text-white font-body overflow-x-hidden">
      {/* Баннер */}
      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-24 scanlines">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050d1a] via-imo-navy to-imo-ocean" />
        <NeonGrid />
        <ScanlineOverlay />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-5xl mb-4" aria-hidden="true">📄</div>
          <p className="text-imo-neon/60 font-heading tracking-[0.3em] text-xs mb-3">СТУДСОВЕТ ИМО</p>
          <h1 className="text-4xl sm:text-5xl font-heading tracking-wider mb-4">ДОКУМЕНТЫ</h1>
          <p className="text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            Официальные документы студенческого совета
          </p>
        </div>

        <AngularDivider className="absolute bottom-0 left-0 right-0 text-imo-deep z-20" />
      </section>

      <StudentCouncilNav />

      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
        <div className="space-y-4">
          {sc.documents.map((doc) => (
            <a
              key={doc.title}
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="brutal-card p-5 flex items-center gap-4 group"
              aria-label={`Открыть документ: ${doc.title}`}
            >
              <DocIcon type={doc.type} />
              <div className="flex-1 min-w-0">
                <h2 className="text-sm font-medium text-white group-hover:text-imo-neon transition-colors truncate">
                  {doc.title}
                </h2>
                <p className="text-xs text-white/40 mt-0.5 uppercase tracking-wide">{doc.type}</p>
              </div>
              <svg className="w-5 h-5 text-white/20 group-hover:text-imo-neon transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
