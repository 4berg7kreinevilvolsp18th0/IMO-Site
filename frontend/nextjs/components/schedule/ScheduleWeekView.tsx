'use client';

import type { ScheduleLesson, DayOfWeek } from '@/lib/schedule-types';
import {
  DAYS_ORDER,
  DAY_LABELS,
  DAY_SHORT_LABELS,
  TIME_SLOTS,
  getWeekDates,
  formatDate,
  isToday,
  getWeekNumber,
} from '@/lib/schedule-types';
import ScheduleClassCard from './ScheduleClassCard';

interface ScheduleWeekViewProps {
  lessons: ScheduleLesson[];
  currentWeekStart: Date;
  groupName?: string;
}

export default function ScheduleWeekView({ lessons, currentWeekStart, groupName }: ScheduleWeekViewProps) {
  const weekDates = getWeekDates(currentWeekStart);
  const weekNum = getWeekNumber(currentWeekStart);
  const isEvenWeek = weekNum % 2 === 0;

  const filteredByParity = lessons.filter((l) => {
    if (l.weekParity === 'both') return true;
    if (l.weekParity === 'even' && isEvenWeek) return true;
    if (l.weekParity === 'odd' && !isEvenWeek) return true;
    return false;
  });

  const getLessonsForSlot = (day: DayOfWeek, timeStart: string): ScheduleLesson[] => {
    return filteredByParity.filter(
      (l) => l.day === day && l.timeStart === timeStart
    );
  };

  const hasLessonsOnDay = (day: DayOfWeek): boolean => {
    return filteredByParity.some((l) => l.day === day);
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[900px]">
        {/* Header row */}
        <div className="grid grid-cols-[80px_repeat(6,1fr)] border-b-2 border-white/10 light:border-imo-deep/10">
          {/* Time column header */}
          <div className="p-3 text-[10px] font-heading tracking-[0.15em] text-white/30 light:text-imo-deep/30">
            ВРЕМЯ
          </div>
          {/* Day headers */}
          {DAYS_ORDER.map((day, idx) => {
            const date = weekDates[idx];
            const todayMark = isToday(date);
            return (
              <div
                key={day}
                className={`p-3 text-center border-l-2 border-white/10 light:border-imo-deep/10 ${
                  todayMark ? 'bg-imo-neon/5 light:bg-imo-ocean/5' : ''
                }`}
              >
                <p className={`text-xs font-heading tracking-wider uppercase ${
                  todayMark ? 'text-imo-neon light:text-imo-ocean' : 'text-white/60 light:text-imo-deep/60'
                }`}>
                  <span className="hidden lg:inline">{DAY_LABELS[day]}</span>
                  <span className="lg:hidden">{DAY_SHORT_LABELS[day]}</span>
                </p>
                <p className={`text-[10px] mt-0.5 ${
                  todayMark ? 'text-imo-neon/70 font-medium light:text-imo-ocean/70' : 'text-white/30 light:text-imo-deep/30'
                }`}>
                  {formatDate(date)}
                </p>
                {todayMark && (
                  <div className="w-1.5 h-1.5 bg-imo-neon mx-auto mt-1 animate-pulse light:bg-imo-ocean" />
                )}
              </div>
            );
          })}
        </div>

        {/* Time slots rows */}
        {TIME_SLOTS.map((slot) => {
          const hasAnyLesson = DAYS_ORDER.some((day) => getLessonsForSlot(day, slot.start).length > 0);
          if (!hasAnyLesson) return null;

          return (
            <div
              key={slot.start}
              className="grid grid-cols-[80px_repeat(6,1fr)] border-b border-white/5 light:border-imo-deep/5 min-h-[80px]"
            >
              {/* Time label */}
              <div className="p-2 flex flex-col justify-center items-center border-r-2 border-white/10 light:border-imo-deep/10">
                <span className="text-xs font-medium text-imo-neon/70 light:text-imo-ocean/70">{slot.start}</span>
                <span className="text-[9px] text-white/25 light:text-imo-deep/25">{slot.end}</span>
              </div>

              {/* Day cells */}
              {DAYS_ORDER.map((day, idx) => {
                const cellLessons = getLessonsForSlot(day, slot.start);
                const date = weekDates[idx];
                const todayMark = isToday(date);

                return (
                  <div
                    key={day}
                    className={`p-1.5 border-l border-white/5 light:border-imo-deep/5 ${
                      todayMark ? 'bg-imo-neon/[0.02] light:bg-imo-ocean/[0.02]' : ''
                    } ${!hasLessonsOnDay(day) ? 'opacity-40' : ''}`}
                  >
                    <div className="space-y-1">
                      {cellLessons.map((lesson) => (
                        <ScheduleClassCard
                          key={lesson.id}
                          lesson={lesson}
                          groupName={groupName}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}

        {/* Empty state */}
        {filteredByParity.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-white/30 text-sm light:text-imo-deep/30">Нет занятий на эту неделю</p>
          </div>
        )}
      </div>
    </div>
  );
}
