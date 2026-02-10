/**
 * Типы данных для JSON-контента проекта ИМО ДВФУ
 */

export interface Feature {
  title: string;
  icon: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface SiteInfo {
  hero: {
    title: string;
    subtitle: string;
    tagline: string;
    description: string;
  };
  stats: Stat[];
  features: Feature[];
  expeditions: {
    title: string;
    description: string;
    video_url: string;
  };
  practices: {
    title: string;
    description: string;
    international: string;
  };
  campus: {
    title: string;
    facts: string[];
  };
  stipends: {
    title: string;
    facts: string[];
  };
  links: {
    vk_school: string;
    telegram_school: string;
    vk_student_council: string;
    telegram_student_council: string;
    official_site: string;
    apply: string;
  };
  contacts: {
    address: string;
    email: string;
  };
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  intro: string;
  slug: string;
}
