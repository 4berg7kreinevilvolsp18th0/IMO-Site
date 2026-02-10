import React from 'react';

interface SocialCardProps {
  href: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
}

export default function SocialCard({ href, title, desc, icon, color }: SocialCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${title} — ${desc}`}
      className="brutal-card flex items-start gap-4 p-5 group"
    >
      <div className={`flex-shrink-0 w-10 h-10 ${color} flex items-center justify-center shadow-brutal-sm`}>
        {icon}
      </div>
      <div>
        <div className="font-medium text-white group-hover:text-imo-neon transition-colors text-sm">{title}</div>
        <div className="text-xs text-white/40 mt-0.5 font-light">{desc}</div>
      </div>
    </a>
  );
}

export function VkIcon() {
  return (
    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M15.073 2H8.937C3.333 2 2 3.333 2 8.927v6.136C2 20.667 3.333 22 8.927 22h6.136C20.667 22 22 20.667 22 15.073V8.937C22 3.333 20.667 2 15.073 2m3.073 14.27h-1.459c-.552 0-.718-.45-1.707-1.45-.862-.831-1.229-.937-1.448-.937-.3 0-.387.087-.387.5v1.325c0 .356-.112.562-1.05.562-1.55 0-3.269-.937-4.481-2.681-1.825-2.563-2.325-4.481-2.325-4.887 0-.219.087-.419.5-.419h1.463c.375 0 .518.169.662.562.731 2.106 1.95 3.95 2.45 3.95.187 0 .275-.087.275-.562V9.637c-.056-.994-.581-1.075-.581-1.431 0-.175.143-.356.375-.356h2.3c.319 0 .431.175.431.537v2.919c0 .319.137.431.231.431.187 0 .35-.112.694-.456 1.075-1.206 1.844-3.069 1.844-3.069.1-.219.275-.419.65-.419h1.463c.437 0 .531.225.437.537-.181.85-1.937 3.319-1.937 3.319-.156.25-.219.362 0 .644.156.206.669.631 1.012 1.019.637.706 1.119 1.3 1.25 1.712.137.406-.069.619-.506.619"/>
    </svg>
  );
}

export function TgIcon() {
  return (
    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  );
}
