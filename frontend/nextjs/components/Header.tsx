'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useCallback, useRef } from 'react';

const NAV_LINKS = [
  { href: '/', label: 'Главная' },
  { href: '/programs', label: 'Программы' },
  { href: '/news', label: 'Новости' },
  { href: '/about', label: 'О школе' },
  { href: '/for-students', label: 'Для студентов' },
  { href: '/student-council', label: 'Студсовет' },
  { href: '/contacts', label: 'Контакты' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  // Throttled scroll handler
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const toggleMenu = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-imo-deep/95 backdrop-blur-sm border-b-2 border-imo-neon/30 shadow-[0_2px_0_rgba(0,255,224,0.15)]'
          : 'bg-transparent'
      }`}
      role="banner"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        {/* Логотип ИМО */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/Лого вектор белое.svg"
            alt="ИМО ДВФУ — на главную"
            width={36}
            height={36}
            className="w-8 h-8 sm:w-9 sm:h-9 transition-transform group-hover:translate-x-1"
          />
          <span className="hidden sm:flex flex-col leading-none">
            <span className="font-heading text-sm sm:text-base tracking-[0.15em] text-white group-hover:text-imo-neon transition-colors">
              ИМО
            </span>
            <span className="text-[10px] text-imo-foam/60 font-body tracking-wider mt-0.5">
              ДВФУ
            </span>
          </span>
        </Link>

        {/* Навигация (desktop) */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Основная навигация">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/70 hover:text-imo-neon font-body font-medium px-3 py-2 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:bg-imo-neon after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://ocean.study/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 text-xs px-4 py-2 bg-imo-neon/10 text-imo-neon font-heading tracking-[0.1em] border-2 border-imo-neon/40 shadow-brutal-sm hover:bg-imo-neon hover:text-imo-deep hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all duration-200"
            aria-label="Официальный сайт ocean.study (открывается в новом окне)"
          >
            OCEAN.STUDY
          </a>
        </nav>

        {/* Мобильное меню — кнопка */}
        <button
          className="md:hidden p-2 border-2 border-white/20 hover:border-imo-neon hover:text-imo-neon transition-colors"
          onClick={toggleMenu}
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          <svg className="w-6 h-6 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {open ? (
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Мобильная навигация */}
      <div
        id="mobile-nav"
        ref={mobileNavRef}
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
        role="navigation"
        aria-label="Мобильная навигация"
      >
        <nav className="border-t-2 border-imo-neon/20 bg-imo-deep/98 backdrop-blur-sm px-4 pb-4 pt-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="block text-sm text-white/70 hover:text-imo-neon font-body font-medium px-3 py-3 border-b border-white/5 last:border-b-0 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://ocean.study/"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-xs text-center mt-3 px-4 py-3 bg-imo-neon text-imo-deep font-heading tracking-[0.1em] border-2 border-imo-neon shadow-brutal-sm hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all"
            aria-label="Официальный сайт ocean.study (открывается в новом окне)"
          >
            OCEAN.STUDY
          </a>
        </nav>
      </div>
    </header>
  );
}
