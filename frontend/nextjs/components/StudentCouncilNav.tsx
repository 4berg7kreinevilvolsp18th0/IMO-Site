'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SC_LINKS = [
  { href: '/student-council', label: 'Главная' },
  { href: '/student-council/team', label: 'Состав' },
  { href: '/student-council/documents', label: 'Документы' },
  { href: '/student-council/achievements', label: 'Достижения' },
  { href: '/student-council/work', label: 'Работа' },
  { href: '/student-council/contacts', label: 'Контакты' },
];

export default function StudentCouncilNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Навигация студсовета"
      className="max-w-5xl mx-auto px-4 sm:px-6 mb-10"
    >
      <div className="flex flex-wrap gap-2 justify-center">
        {SC_LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs sm:text-sm px-4 py-2 font-heading tracking-wider transition-all duration-200 border-2 ${
                isActive
                  ? 'bg-imo-neon/10 text-imo-neon border-imo-neon/40 shadow-brutal-sm'
                  : 'text-white/60 border-transparent hover:text-imo-neon hover:border-imo-neon/20'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
