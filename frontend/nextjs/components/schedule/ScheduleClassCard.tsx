'use client';

import { useState } from 'react';
import type { ScheduleLesson } from '@/lib/schedule-types';
import { LESSON_TYPE_LABELS, LESSON_TYPE_COLORS } from '@/lib/schedule-types';

interface ScheduleClassCardProps {
  lesson: ScheduleLesson;
  compact?: boolean;
  groupName?: string;
}

export default function ScheduleClassCard({ lesson, compact = false, groupName }: ScheduleClassCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const colors = LESSON_TYPE_COLORS[lesson.type];

  return (
    <>
      <button
        onClick={() => setShowDetails(true)}
        className={`w-full text-left rounded-none border-2 ${colors.border} ${colors.bg} p-2 transition-all hover:scale-[1.02] hover:shadow-brutal-sm group cursor-pointer light:bg-white/80 ${
          compact ? 'py-1.5 px-2' : 'p-2.5'
        }`}
      >
        <div className="flex items-start gap-1.5">
          <div className={`w-1 min-w-[4px] self-stretch rounded-none ${colors.dot} flex-shrink-0 mt-0.5`} />
          <div className="min-w-0 flex-1">
            <p className={`font-medium text-white leading-tight truncate group-hover:text-imo-neon transition-colors light:text-imo-deep ${
              compact ? 'text-[10px]' : 'text-xs'
            }`}>
              {lesson.subject}
            </p>
            {!compact && (
              <>
                <p className="text-[10px] text-white/50 mt-0.5 truncate light:text-imo-deep/60">
                  {lesson.room && <span className="font-medium">{lesson.room}</span>}
                  {lesson.teacher && <span> &middot; {lesson.teacher}</span>}
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className={`text-[9px] px-1.5 py-0.5 border ${colors.border} ${colors.text} font-medium tracking-wide uppercase`}>
                    {LESSON_TYPE_LABELS[lesson.type]}
                  </span>
                  {lesson.subgroup && (
                    <span className="text-[9px] px-1.5 py-0.5 border border-white/20 text-white/50 light:border-imo-deep/20 light:text-imo-deep/50">
                      пг. {lesson.subgroup}
                    </span>
                  )}
                  {lesson.weekParity !== 'both' && (
                    <span className="text-[9px] px-1.5 py-0.5 border border-white/20 text-white/50 light:border-imo-deep/20 light:text-imo-deep/50">
                      {lesson.weekParity === 'even' ? 'чёт.' : 'нечёт.'}
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </button>

      {showDetails && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowDetails(false)}
        >
          <div
            className="bg-imo-deep border-2 border-imo-neon/40 shadow-brutal max-w-md w-full p-0 relative light:bg-white light:border-imo-ocean/30"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`${colors.bg} border-b-2 ${colors.border} p-5`}>
              <h3 className="font-heading text-lg tracking-wide text-white leading-tight light:text-imo-deep">
                {lesson.subject}
              </h3>
            </div>

            {/* Details */}
            <div className="p-5 space-y-3">
              <DetailRow label="ДИСЦИПЛИНА" value={lesson.subject} />
              <DetailRow label="ВРЕМЯ ЗАНЯТИЯ" value={`${lesson.timeStart} – ${lesson.timeEnd}`} />
              {groupName && <DetailRow label="ГРУППА" value={groupName} />}
              {lesson.room && <DetailRow label="АУДИТОРИЯ" value={lesson.room} />}
              {lesson.teacher && <DetailRow label="ПРЕПОДАВАТЕЛЬ" value={lesson.teacher} />}
              <DetailRow label="ТИП ЗАНЯТИЯ" value={LESSON_TYPE_LABELS[lesson.type]} />
              {lesson.subgroup && <DetailRow label="ПОДГРУППА" value={`Подгруппа ${lesson.subgroup}`} />}
              {lesson.weekParity !== 'both' && (
                <DetailRow
                  label="НЕДЕЛЯ"
                  value={lesson.weekParity === 'even' ? 'Чётная неделя' : 'Нечётная неделя'}
                />
              )}
            </div>

            {/* Footer */}
            <div className="border-t-2 border-white/10 p-4 flex justify-end light:border-imo-deep/10">
              <button
                onClick={() => setShowDetails(false)}
                className="px-6 py-2 text-xs font-heading tracking-[0.1em] bg-imo-neon/10 text-imo-neon border-2 border-imo-neon/40 hover:bg-imo-neon hover:text-imo-deep transition-all light:bg-imo-ocean/10 light:text-imo-ocean light:border-imo-ocean/40 light:hover:bg-imo-ocean light:hover:text-white"
              >
                ЗАКРЫТЬ
              </button>
            </div>

            {/* Close X */}
            <button
              onClick={() => setShowDetails(false)}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-white/40 hover:text-imo-neon transition-colors light:text-imo-deep/40 light:hover:text-imo-ocean"
              aria-label="Закрыть"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="square" strokeLinejoin="miter" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="text-[10px] font-heading tracking-[0.15em] text-imo-neon/60 min-w-[110px] pt-0.5 light:text-imo-ocean/70">
        {label}
      </span>
      <span className="text-sm text-white font-light light:text-imo-deep">
        {value}
      </span>
    </div>
  );
}
