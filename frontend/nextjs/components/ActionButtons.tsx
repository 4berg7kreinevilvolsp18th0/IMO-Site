import { VkIcon, TgIcon } from '@/components/SocialCard';
import sc from '@/content/student-council.json';

export default function ActionButtons() {
  return (
    <div className="space-y-6">
      {/* Соцсети и боты */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ActionLink
          href={sc.links.vk}
          title="ВКонтакте"
          desc="Новости и мероприятия"
          icon={<VkIcon />}
          color="bg-[#4C75A3]"
        />
        <ActionLink
          href={sc.links.telegram_channel}
          title="Telegram канал"
          desc="Оперативная информация"
          icon={<TgIcon />}
          color="bg-[#2AABEE]"
        />
        <ActionLink
          href={sc.links.complaint_bot}
          title="Бот для обращений"
          desc="Жалобы и предложения"
          icon={<BotIcon />}
          color="bg-imo-coral"
        />
        <ActionLink
          href={sc.links.telegram_bot}
          title="Telegram бот"
          desc="Информация и сервисы"
          icon={<TgIcon />}
          color="bg-imo-teal"
        />
      </div>

      {/* Проекты */}
      {sc.links.projects.length > 0 && (
        <div>
          <h3 className="font-heading text-sm tracking-[0.15em] text-imo-neon/60 mb-3">ПРОЕКТЫ</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sc.links.projects.map((p) => (
              <a
                key={p.title}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-card flex items-start gap-4 p-5 group"
                aria-label={`${p.title} — ${p.desc}`}
              >
                <span className="text-2xl flex-shrink-0" aria-hidden="true">{p.icon}</span>
                <div>
                  <div className="font-medium text-white group-hover:text-imo-neon transition-colors text-sm">
                    {p.title}
                  </div>
                  <div className="text-xs text-white/40 mt-0.5 font-light">{p.desc}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ActionLink({
  href,
  title,
  desc,
  icon,
  color,
}: {
  href: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${title} — ${desc}`}
      className="brutal-card flex items-center gap-4 p-5 group"
    >
      <div
        className={`flex-shrink-0 w-12 h-12 ${color} flex items-center justify-center shadow-brutal-sm`}
      >
        {icon}
      </div>
      <div>
        <div className="font-medium text-white group-hover:text-imo-neon transition-colors text-sm">
          {title}
        </div>
        <div className="text-xs text-white/40 mt-0.5 font-light">{desc}</div>
      </div>
    </a>
  );
}

function BotIcon() {
  return (
    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  );
}
