import Image from 'next/image';
import Link from 'next/link';
import info from '@/content/info.json';
import { AngularDivider } from './OceanDecorations';

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="relative bg-imo-navy" role="contentinfo">
      <AngularDivider className="text-imo-navy -mt-1" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* О школе */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/Лого вектор белое.svg"
                alt="ИМО"
                width={32}
                height={32}
                className="w-8 h-8 opacity-80"
              />
              <div className="flex flex-col leading-none">
                <span className="font-heading text-sm tracking-[0.15em] text-white">ИМО</span>
                <span className="text-[10px] text-imo-neon/60 font-body tracking-wider mt-0.5">ДВФУ</span>
              </div>
            </div>
            <p className="text-sm text-white/40 leading-relaxed font-body font-light">
              Институт Мирового Океана.<br />
              Дальневосточный федеральный<br />
              университет.
            </p>
          </div>

          {/* Навигация */}
          <nav aria-label="Навигация в подвале">
            <h4 className="font-heading text-imo-neon/60 text-[11px] tracking-[0.15em] mb-4">НАВИГАЦИЯ</h4>
            <div className="flex flex-col gap-2.5">
              <FooterLink href="/programs" label="Программы" />
              <FooterLink href="/news" label="Новости" />
              <FooterLink href="/about" label="О школе" />
              <FooterLink href="/contacts" label="Контакты" />
            </div>
          </nav>

          {/* Студентам */}
          <div>
            <h4 className="font-heading text-imo-neon/60 text-[11px] tracking-[0.15em] mb-4">СТУДЕНТАМ</h4>
            <div className="flex flex-col gap-2.5">
              <FooterLink href="/for-students" label="Полезные ссылки" />
              <FooterLink href="/guides" label="Гайды студента" />
              <FooterLink href={info.links.vk_school} label="ВКонтакте школы" external />
              <FooterLink href={info.links.telegram_school} label="Telegram школы" external />
              <FooterLink href={info.links.official_site} label="ocean.study" external />
            </div>
          </div>

          {/* Студсовет */}
          <div>
            <h4 className="font-heading text-imo-neon/60 text-[11px] tracking-[0.15em] mb-4">СТУДСОВЕТ</h4>
            <div className="flex flex-col gap-2.5">
              <FooterLink href="/student-council" label="О студсовете" />
              <FooterLink href="/student-council/team" label="Состав" />
              <FooterLink href="/student-council/documents" label="Документы" />
              <FooterLink href="/student-council/contacts" label="Контакты студсовета" />
              <FooterLink href={info.links.vk_student_council} label="ВК студсовета" external />
              <FooterLink href={info.links.telegram_student_council} label="Telegram студсовета" external />
            </div>
          </div>
        </div>

        {/* Нижняя полоса */}
        <div className="border-t-2 border-imo-neon/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/30 font-body font-light">
            &copy; {year} Институт Мирового Океана &middot; ДВФУ &middot; Остров Русский, Владивосток
          </p>
          <a
            href={info.links.apply}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-imo-neon/50 hover:text-imo-neon font-heading tracking-[0.1em] transition-colors"
          >
            ПОСТУПИТЬ &rarr;
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, label, external = false }: { href: string; label: string; external?: boolean }) {
  const cls = "text-sm text-white/40 hover:text-imo-neon transition-colors font-body font-light";
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {label}
    </Link>
  );
}
