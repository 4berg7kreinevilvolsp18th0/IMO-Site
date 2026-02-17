'use client';

import type { ScheduleGroup, ViewMode } from '@/lib/schedule-types';
import { getWeekDates, formatDate, formatDateFull, getWeekNumber } from '@/lib/schedule-types';

interface ScheduleControlsProps {
  groups: ScheduleGroup[];
  selectedGroupId: string;
  onGroupChange: (groupId: string) => void;
  selectedSubgroup: number | null;
  onSubgroupChange: (subgroup: number | null) => void;
  maxSubgroups: number;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  currentWeekStart: Date;
  onWeekChange: (date: Date) => void;
  scheduleRef: React.RefObject<HTMLDivElement | null>;
}

export default function ScheduleControls({
  groups,
  selectedGroupId,
  onGroupChange,
  selectedSubgroup,
  onSubgroupChange,
  maxSubgroups,
  viewMode,
  onViewModeChange,
  currentWeekStart,
  onWeekChange,
}: ScheduleControlsProps) {
  const weekDates = getWeekDates(currentWeekStart);
  const weekNum = getWeekNumber(currentWeekStart);

  const goToPrevWeek = () => {
    const prev = new Date(currentWeekStart);
    prev.setDate(prev.getDate() - 7);
    onWeekChange(prev);
  };

  const goToNextWeek = () => {
    const next = new Date(currentWeekStart);
    next.setDate(next.getDate() + 7);
    onWeekChange(next);
  };

  const goToToday = () => {
    onWeekChange(new Date());
  };

  const selectedGroup = groups.find((g) => g.id === selectedGroupId);

  return (
    <div className="space-y-4">
      {/* Row 1: Group + Subgroup */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Group selector */}
        <div className="relative">
          <select
            value={selectedGroupId}
            onChange={(e) => onGroupChange(e.target.value)}
            className="appearance-none bg-white/5 border-2 border-imo-neon/30 text-white text-sm font-medium px-4 py-2.5 pr-10 focus:outline-none focus:border-imo-neon/60 focus:shadow-brutal-sm transition-all cursor-pointer light:bg-white light:text-imo-deep light:border-imo-ocean/30 light:focus:border-imo-ocean/60"
          >
            {groups.map((g) => (
              <option key={g.id} value={g.id} className="bg-imo-deep text-white">
                {g.name}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-4 h-4 text-imo-neon/50 light:text-imo-ocean/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="square" strokeLinejoin="miter" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Specialization badge */}
        {selectedGroup && (
          <span className="text-xs text-white/40 font-light hidden sm:inline light:text-imo-deep/50">
            {selectedGroup.specialization}, {selectedGroup.course} курс
          </span>
        )}

        {/* Subgroup filter */}
        {maxSubgroups > 0 && (
          <div className="flex items-center gap-1 ml-auto sm:ml-0">
            <button
              onClick={() => onSubgroupChange(null)}
              className={`text-xs px-3 py-1.5 border-2 transition-all ${
                selectedSubgroup === null
                  ? 'border-imo-neon/60 bg-imo-neon/15 text-imo-neon shadow-brutal-sm light:border-imo-ocean/60 light:bg-imo-ocean/15 light:text-imo-ocean'
                  : 'border-white/15 text-white/50 hover:border-imo-neon/30 hover:text-white/70 light:border-imo-deep/15 light:text-imo-deep/50 light:hover:border-imo-ocean/30'
              }`}
            >
              Все
            </button>
            {Array.from({ length: maxSubgroups }, (_, i) => i + 1).map((sg) => (
              <button
                key={sg}
                onClick={() => onSubgroupChange(sg)}
                className={`text-xs px-3 py-1.5 border-2 transition-all ${
                  selectedSubgroup === sg
                    ? 'border-imo-neon/60 bg-imo-neon/15 text-imo-neon shadow-brutal-sm light:border-imo-ocean/60 light:bg-imo-ocean/15 light:text-imo-ocean'
                    : 'border-white/15 text-white/50 hover:border-imo-neon/30 hover:text-white/70 light:border-imo-deep/15 light:text-imo-deep/50 light:hover:border-imo-ocean/30'
                }`}
              >
                пг.{sg}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Row 2: View mode + Week navigation */}
      <div className="flex flex-wrap items-center gap-3">
        {/* View toggle */}
        <div className="flex border-2 border-white/15 light:border-imo-deep/15">
          <button
            onClick={() => onViewModeChange('week')}
            className={`text-xs px-4 py-2 font-medium transition-all ${
              viewMode === 'week'
                ? 'bg-imo-neon/15 text-imo-neon light:bg-imo-ocean/15 light:text-imo-ocean'
                : 'text-white/50 hover:text-white/70 light:text-imo-deep/50 light:hover:text-imo-deep/70'
            }`}
          >
            <span className="hidden sm:inline">Сетка</span>
            <svg className="w-4 h-4 sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="square" strokeLinejoin="miter" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`text-xs px-4 py-2 font-medium transition-all border-l-2 border-white/15 light:border-imo-deep/15 ${
              viewMode === 'list'
                ? 'bg-imo-neon/15 text-imo-neon light:bg-imo-ocean/15 light:text-imo-ocean'
                : 'text-white/50 hover:text-white/70 light:text-imo-deep/50 light:hover:text-imo-deep/70'
            }`}
          >
            <span className="hidden sm:inline">Список</span>
            <svg className="w-4 h-4 sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="square" strokeLinejoin="miter" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Week navigation */}
        <div className="flex items-center gap-2 flex-1 justify-center">
          <button
            onClick={goToPrevWeek}
            className="p-2 text-white/50 hover:text-imo-neon transition-colors light:text-imo-deep/50 light:hover:text-imo-ocean"
            aria-label="Предыдущая неделя"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="square" strokeLinejoin="miter" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="text-center min-w-[200px]">
            <p className="text-sm font-medium text-white light:text-imo-deep">
              {formatDateFull(weekDates[0])} — {formatDateFull(weekDates[5])}
            </p>
            <p className="text-[10px] text-white/40 font-light mt-0.5 light:text-imo-deep/40">
              {weekNum} неделя ({weekNum % 2 === 0 ? 'чётная' : 'нечётная'})
            </p>
          </div>

          <button
            onClick={goToNextWeek}
            className="p-2 text-white/50 hover:text-imo-neon transition-colors light:text-imo-deep/50 light:hover:text-imo-ocean"
            aria-label="Следующая неделя"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="square" strokeLinejoin="miter" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Today button */}
        <button
          onClick={goToToday}
          className="text-xs px-4 py-2 border-2 border-imo-coral/40 text-imo-coral hover:bg-imo-coral/15 transition-all font-medium light:border-imo-ocean/40 light:text-imo-ocean light:hover:bg-imo-ocean/15"
        >
          Сегодня
        </button>
      </div>
    </div>
  );
}
