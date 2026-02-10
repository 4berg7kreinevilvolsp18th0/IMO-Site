export type Direction = {
  slug: string;
  title: string;
  description: string;
  color: string;      // tailwind bg color
  textColor: string;  // tailwind text color
  icon: string;       // emoji
};

export const DIRECTIONS: Direction[] = [
  {
    slug: 'geography',
    title: 'География и моделирование геосистем',
    description: 'Изменения окружающей среды, картографирование, ГИС-технологии, геомаркетинг.',
    color: 'bg-imo-ocean',
    textColor: 'text-imo-ocean',
    icon: '🌍',
  },
  {
    slug: 'hydrometeo',
    title: 'Цифровая гидрометеорология',
    description: 'Атмосфера и гидросфера, климатические риски, метеорология, океанология.',
    color: 'bg-imo-wave',
    textColor: 'text-imo-wave',
    icon: '🌊',
  },
  {
    slug: 'ecology',
    title: 'Экология и природопользование',
    description: 'Управление качеством окружающей среды, мониторинг, экологическая безопасность.',
    color: 'bg-imo-green',
    textColor: 'text-imo-green',
    icon: '🌿',
  },
  {
    slug: 'biology',
    title: 'Биология',
    description: 'Зоология, генетика, микробиология, гидробиология, биотехнологии.',
    color: 'bg-imo-teal',
    textColor: 'text-imo-teal',
    icon: '🧬',
  },
  {
    slug: 'soil',
    title: 'Архитектура экосистем (Почвоведение)',
    description: 'Гидропоника, цифровое земледелие, агроэкология, кадастр.',
    color: 'bg-amber-700',
    textColor: 'text-amber-700',
    icon: '🌱',
  },
  {
    slug: 'robotics',
    title: 'Мехатроника и робототехника',
    description: 'Подводные роботы, мехатронные системы, автоматизация, САПР.',
    color: 'bg-imo-coral',
    textColor: 'text-imo-coral',
    icon: '🤖',
  },
];
