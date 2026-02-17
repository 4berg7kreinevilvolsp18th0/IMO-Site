/**
 * Типы данных для расписания ИМО ДВФУ
 */

export type DayOfWeek = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';

export type LessonType = 'lecture' | 'seminar' | 'lab' | 'practice' | 'exam' | 'consultation';

export type WeekParity = 'both' | 'even' | 'odd';

export interface ScheduleGroup {
  id: string;
  name: string;
  specialization: string;
  course: number;
  subgroups: number;
}

export interface ScheduleLesson {
  id: string;
  groupId: string;
  day: DayOfWeek;
  timeStart: string;
  timeEnd: string;
  subject: string;
  teacher: string;
  room: string;
  type: LessonType;
  subgroup: number | null;
  weekParity: WeekParity;
  dateStart?: string;
  dateEnd?: string;
}

export interface ScheduleData {
  updatedAt: string;
  semester: string;
  groups: ScheduleGroup[];
  lessons: ScheduleLesson[];
}

export type ViewMode = 'week' | 'list';

export const DAY_LABELS: Record<DayOfWeek, string> = {
  mon: 'Понедельник',
  tue: 'Вторник',
  wed: 'Среда',
  thu: 'Четверг',
  fri: 'Пятница',
  sat: 'Суббота',
};

export const DAY_SHORT_LABELS: Record<DayOfWeek, string> = {
  mon: 'пн',
  tue: 'вт',
  wed: 'ср',
  thu: 'чт',
  fri: 'пт',
  sat: 'сб',
};

export const DAYS_ORDER: DayOfWeek[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

export const LESSON_TYPE_LABELS: Record<LessonType, string> = {
  lecture: 'Лекция',
  seminar: 'Семинар',
  lab: 'Лабораторная',
  practice: 'Практика',
  exam: 'Экзамен',
  consultation: 'Консультация',
};

export const LESSON_TYPE_COLORS: Record<LessonType, { bg: string; border: string; text: string; dot: string }> = {
  lecture: {
    bg: 'bg-imo-ocean/20',
    border: 'border-imo-ocean/50',
    text: 'text-imo-wave',
    dot: 'bg-imo-ocean',
  },
  seminar: {
    bg: 'bg-imo-neon/10',
    border: 'border-imo-neon/40',
    text: 'text-imo-neon',
    dot: 'bg-imo-neon',
  },
  lab: {
    bg: 'bg-imo-coral/15',
    border: 'border-imo-coral/40',
    text: 'text-imo-coral',
    dot: 'bg-imo-coral',
  },
  practice: {
    bg: 'bg-imo-neon-cyan/15',
    border: 'border-imo-neon-cyan/40',
    text: 'text-imo-neon-cyan',
    dot: 'bg-imo-neon-cyan',
  },
  exam: {
    bg: 'bg-red-500/15',
    border: 'border-red-500/40',
    text: 'text-red-400',
    dot: 'bg-red-500',
  },
  consultation: {
    bg: 'bg-imo-foam/10',
    border: 'border-imo-foam/30',
    text: 'text-imo-foam',
    dot: 'bg-imo-foam',
  },
};

export const TIME_SLOTS = [
  { start: '08:30', end: '10:00' },
  { start: '10:10', end: '11:40' },
  { start: '11:50', end: '13:20' },
  { start: '13:30', end: '15:00' },
  { start: '15:10', end: '16:40' },
  { start: '16:50', end: '18:20' },
  { start: '18:30', end: '20:00' },
];

export function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

export function getWeekDates(date: Date): Date[] {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(d.setDate(diff));
  monday.setHours(0, 0, 0, 0);

  return Array.from({ length: 6 }, (_, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    return date;
  });
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
}

export function formatDateFull(date: Date): string {
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
}

export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export function getDayOfWeekFromDate(date: Date): DayOfWeek {
  const days: DayOfWeek[] = ['sun' as DayOfWeek, 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  return days[date.getDay()] || 'mon';
}
