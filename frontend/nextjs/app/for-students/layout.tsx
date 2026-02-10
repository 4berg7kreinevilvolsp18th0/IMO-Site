import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Полезное для студентов',
  description:
    'Все ссылки и сервисы для студентов ИМО ДВФУ в одном месте — LMS, расписание, библиотека, общежитие, стипендии, документы и карьера.',
  openGraph: {
    title: 'Полезное для студентов — ИМО ДВФУ',
    description:
      'Быстрый доступ к LMS, расписанию, электронной зачётке и другим сервисам ДВФУ.',
  },
};

export default function ForStudentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
