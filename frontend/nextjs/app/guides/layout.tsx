import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Гайды студента',
  description:
    'Ответы на частые вопросы студентов ИМО ДВФУ — учёба, общежитие, стипендии, документы, советы первокурсникам.',
  openGraph: {
    title: 'Гайды студента — ИМО ДВФУ',
    description:
      'Пошаговые инструкции по расписанию, пересдачам, общежитию, стипендиям и документам.',
  },
};

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
