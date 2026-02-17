'use client';

import { useState } from 'react';
import type { ScheduleLesson, DayOfWeek } from '@/lib/schedule-types';
import {
  DAYS_ORDER,
  DAY_LABELS,
  LESSON_TYPE_LABELS,
  LESSON_TYPE_COLORS,
  getWeekDates,
  formatDate,
  isToday,
  getWeekNumber,
} from '@/lib/schedule-types';
import ScheduleClassCard from './ScheduleClassCard';

interface ScheduleListViewProps {
  lessons: ScheduleLesson[];
  currentWeekStart: Date;
  groupName?: string;
}

export default function ScheduleListView({ lessons, currentWeekStart, groupName }: ScheduleListViewProps) {
  const weekDates = getWeekDates(currentWeekStart);
  const weekNum = getWeekNumber(currentWeekStart);
  const isEvenWeek = weekNum % 2 === 0;
  const todayIdx = new Date().getDay();
  const initialDay: DayOfWeek | null = todayIdx >= 1 && todayIdx <= 6 ? DAYS_ORDER[todayIdx - 1] : DAYS_ORDER[0];
  const [expandedDay, setExpandedDay] = useState<DayOfWeek | null>(initialDay);

  const filteredByParity = lessons.filter((l) => {
    if (l.weekParity === 'both') return true;
    if (l.weekParity === 'even' && isEvenWeek) return true;
    if (l.weekParity === 'odd' && !isEvenWeek) return true;
    return false;
  });

  const getLessonsForDay = (day: DayOfWeek): ScheduleLesson[] => {
    return filteredByParity
      .filter((l) => l.day === day)
      .sort((a, b) => a.timeStart.localeCompare(b.timeStart));
  };

  return (
    <div className="space-y-4">
      {DAYS_ORDER.map((day, idx) => {
        const dayLessons = getLessonsForDay(day);
        const date = weekDates[idx];
        const todayMark = isToday(date);
        const isExpanded = expandedDay === day;

        if (dayLessons.length === 0) return null;

        return (
          <div
            key={day}
            className={`border-2 transition-all ${
              todayMark
                ? 'border-imo-neon/40 shadow-brutal-sm light:border-imo-ocean/40'
                : 'border-white/10 light:border-imo-deep/10'
            }`}
          >
            {/* Day header */}
            <button
              onClick={() => setExpandedDay(isExpanded ? null : day)}
              className={`w-full flex items-center justify-between p-4 text-left transition-all ${
                todayMark
                  ? 'bg-imo-neon/5 light:bg-imo-ocean/5'
                  : 'bg-white/[0.02] hover:bg-white/[0.04] light:bg-imo-deep/[0.02] light:hover:bg-imo-deep/[0.04]'
              }`}
            >
              <div className="flex items-center gap-3">
                {todayMark && (
                  <div className="w-2 h-2 bg-imo-neon animate-pulse light:bg-imo-ocean" />
                )}
                <div>
                  <h3 className={`font-heading text-sm tracking-wider uppercase ${
                    todayMark ? 'text-imo-neon light:text-imo-ocean' : 'text-white/80 light:text-imo-deep/80'
                  }`}>
                    {DAY_LABELS[day]}
                  </h3>
                  <p className="text-[10px] text-white/30 mt-0.5 light:text-imo-deep/30">
                    {formatDate(date)} &middot; {dayLessons.length} {dayLessons.length === 1 ? 'пара' : dayLessons.length < 5 ? 'пары' : 'пар'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Lesson type badges preview */}
                <div className="hidden sm:flex items-center gap-1">
                  {dayLessons.slice(0, 4).map((l) => {
                    const colors = LESSON_TYPE_COLORS[l.type];
                    return (
                      <div key={l.id} className={`w-2 h-2 ${colors.dot}`} title={LESSON_TYPE_LABELS[l.type]} />
                    );
                  })}
                </div>

                {/* Expand arrow */}
                <svg
                  className={`w-4 h-4 text-white/30 transition-transform light:text-imo-deep/30 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="square" strokeLinejoin="miter" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {/* Lessons */}
            <div className={`${isExpanded ? 'block' : 'hidden sm:block'}`}>
              <div className="divide-y divide-white/5 light:divide-imo-deep/5">
                {dayLessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex items-stretch"
                    >
                      {/* Time */}
                      <div className="w-20 flex-shrink-0 p-3 flex flex-col items-center justify-center border-r border-white/5 light:border-imo-deep/5">
                        <span className="text-xs font-medium text-imo-neon/70 light:text-imo-ocean/70">
                          {lesson.timeStart}
                        </span>
                        <span className="text-[9px] text-white/25 light:text-imo-deep/25">
                          {lesson.timeEnd}
                        </span>
                      </div>

                      {/* Lesson content */}
                      <div className="flex-1 p-3">
                        <ScheduleClassCard
                          lesson={lesson}
                          groupName={groupName}
                        />
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}

      {filteredByParity.length === 0 && (
        <div className="py-20 text-center border-2 border-white/10 light:border-imo-deep/10">
          <p className="text-white/30 text-sm light:text-imo-deep/30">Нет занятий на эту неделю</p>
        </div>
      )}
    </div>
  );
}
