'use client';

import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { NeonGrid, AngularDivider, ScanlineOverlay } from '@/components/OceanDecorations';
import ScheduleControls from '@/components/schedule/ScheduleControls';
import ScheduleWeekView from '@/components/schedule/ScheduleWeekView';
import ScheduleListView from '@/components/schedule/ScheduleListView';
import ScheduleDownload from '@/components/schedule/ScheduleDownload';
import scheduleData from '@/content/schedule.json';
import type { ScheduleData, ViewMode, ScheduleLesson } from '@/lib/schedule-types';
import { getWeekNumber, getWeekDates, formatDate, LESSON_TYPE_COLORS, LESSON_TYPE_LABELS } from '@/lib/schedule-types';

const data = scheduleData as ScheduleData;

const STORAGE_KEY_GROUP = 'imo-schedule-group';
const STORAGE_KEY_VIEW = 'imo-schedule-view';

export default function SchedulePage() {
  const scheduleRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const [selectedGroupId, setSelectedGroupId] = useState(data.groups[0]?.id || '');
  const [selectedSubgroup, setSelectedSubgroup] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(new Date());

  useEffect(() => {
    setMounted(true);
    const savedGroup = localStorage.getItem(STORAGE_KEY_GROUP);
    const savedView = localStorage.getItem(STORAGE_KEY_VIEW) as ViewMode | null;
    if (savedGroup && data.groups.some((g) => g.id === savedGroup)) {
      setSelectedGroupId(savedGroup);
    }
    if (savedView === 'week' || savedView === 'list') {
      setViewMode(savedView);
    }
    const isMobile = window.innerWidth < 640;
    if (isMobile && !savedView) {
      setViewMode('list');
    }
  }, []);

  const handleGroupChange = useCallback((groupId: string) => {
    setSelectedGroupId(groupId);
    setSelectedSubgroup(null);
    localStorage.setItem(STORAGE_KEY_GROUP, groupId);
  }, []);

  const handleViewChange = useCallback((mode: ViewMode) => {
    setViewMode(mode);
    localStorage.setItem(STORAGE_KEY_VIEW, mode);
  }, []);

  const selectedGroup = useMemo(
    () => data.groups.find((g) => g.id === selectedGroupId),
    [selectedGroupId]
  );

  const maxSubgroups = selectedGroup?.subgroups || 0;

  const filteredLessons: ScheduleLesson[] = useMemo(() => {
    let lessons = data.lessons.filter((l) => l.groupId === selectedGroupId);
    if (selectedSubgroup !== null) {
      lessons = lessons.filter(
        (l) => l.subgroup === null || l.subgroup === selectedSubgroup
      );
    }
    return lessons;
  }, [selectedGroupId, selectedSubgroup]);

  const weekDates = useMemo(() => getWeekDates(currentWeekStart), [currentWeekStart]);
  const weekNum = getWeekNumber(currentWeekStart);
  const weekLabel = `нед${weekNum}_${formatDate(weekDates[0])}-${formatDate(weekDates[5])}`;

  const totalLessonsThisWeek = useMemo(() => {
    const isEvenWeek = weekNum % 2 === 0;
    return filteredLessons.filter((l) => {
      if (l.weekParity === 'both') return true;
      if (l.weekParity === 'even' && isEvenWeek) return true;
      if (l.weekParity === 'odd' && !isEvenWeek) return true;
      return false;
    }).length;
  }, [filteredLessons, weekNum]);

  const uniqueTypes = useMemo(() => {
    const types = new Set(filteredLessons.map((l) => l.type));
    return Array.from(types);
  }, [filteredLessons]);

  if (!mounted) {
    return (
      <main className="min-h-screen bg-imo-deep text-white font-body">
        <div className="pt-32 pb-20 text-center">
          <div className="w-8 h-8 border-2 border-imo-neon/40 border-t-imo-neon animate-spin mx-auto" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-imo-deep text-white font-body overflow-x-hidden light:bg-[#F5F3F0] light:text-imo-deep">
      {/* Banner */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20 scanlines">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050d1a] via-imo-navy to-imo-ocean light:from-[#E8E5E0] light:via-[#F0EDE8] light:to-[#F5F3F0]" />
        <NeonGrid />
        <ScanlineOverlay />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-imo-neon/60 font-heading tracking-[0.3em] text-xs mb-3 light:text-imo-ocean/60">
            {data.semester.toUpperCase()}
          </p>
          <h1
            className="text-4xl sm:text-5xl font-heading tracking-wider mb-4 glitch-text"
            data-text="РАСПИСАНИЕ"
          >
            РАСПИСАНИЕ
          </h1>
          <p className="text-white/50 font-light max-w-xl mx-auto light:text-imo-deep/50">
            Актуальное расписание занятий с фильтрацией по подгруппам и возможностью скачивания
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="text-center">
              <p className="text-2xl font-heading text-imo-neon light:text-imo-ocean">{data.groups.length}</p>
              <p className="text-[10px] text-white/30 tracking-wider light:text-imo-deep/30">ГРУПП</p>
            </div>
            <div className="w-px h-8 bg-white/10 light:bg-imo-deep/10" />
            <div className="text-center">
              <p className="text-2xl font-heading text-imo-neon light:text-imo-ocean">{totalLessonsThisWeek}</p>
              <p className="text-[10px] text-white/30 tracking-wider light:text-imo-deep/30">ПАР НА НЕДЕЛЕ</p>
            </div>
            <div className="w-px h-8 bg-white/10 light:bg-imo-deep/10" />
            <div className="text-center">
              <p className="text-2xl font-heading text-imo-neon light:text-imo-ocean">{weekNum}</p>
              <p className="text-[10px] text-white/30 tracking-wider light:text-imo-deep/30">НЕДЕЛЯ</p>
            </div>
          </div>
        </div>

        <AngularDivider className="absolute bottom-0 left-0 right-0 text-imo-deep z-20 light:text-[#F5F3F0]" />
      </section>

      {/* Controls + Schedule */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Controls */}
        <div className="mb-6">
          <ScheduleControls
            groups={data.groups}
            selectedGroupId={selectedGroupId}
            onGroupChange={handleGroupChange}
            selectedSubgroup={selectedSubgroup}
            onSubgroupChange={setSelectedSubgroup}
            maxSubgroups={maxSubgroups}
            viewMode={viewMode}
            onViewModeChange={handleViewChange}
            currentWeekStart={currentWeekStart}
            onWeekChange={setCurrentWeekStart}
            scheduleRef={scheduleRef}
          />
        </div>

        {/* Download + Legend bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          {/* Legend */}
          <div className="flex flex-wrap items-center gap-3">
            {uniqueTypes.map((type) => {
              const colors = LESSON_TYPE_COLORS[type];
              return (
                <div key={type} className="flex items-center gap-1.5">
                  <div className={`w-2.5 h-2.5 ${colors.dot}`} />
                  <span className="text-[10px] text-white/40 light:text-imo-deep/40">
                    {LESSON_TYPE_LABELS[type]}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Download */}
          <ScheduleDownload
            scheduleRef={scheduleRef}
            groupName={selectedGroup?.name || ''}
            weekLabel={weekLabel}
          />
        </div>

        {/* Schedule content */}
        <div
          ref={scheduleRef}
          className="border-2 border-white/10 bg-imo-deep/50 backdrop-blur-sm light:border-imo-deep/10 light:bg-white/50"
        >
          {viewMode === 'week' ? (
            <ScheduleWeekView
              lessons={filteredLessons}
              currentWeekStart={currentWeekStart}
              groupName={selectedGroup?.name}
            />
          ) : (
            <ScheduleListView
              lessons={filteredLessons}
              currentWeekStart={currentWeekStart}
              groupName={selectedGroup?.name}
            />
          )}
        </div>

        {/* Last updated */}
        <p className="text-[10px] text-white/20 mt-4 text-right light:text-imo-deep/20">
          Последнее обновление: {data.updatedAt}
        </p>

        {/* External link hint */}
        <div className="mt-8 p-4 border-2 border-white/5 text-center light:border-imo-deep/5">
          <p className="text-xs text-white/30 light:text-imo-deep/30">
            Официальное расписание ДВФУ:{' '}
            <a
              href="https://unischedule.dvfu.ru"
              target="_blank"
              rel="noopener noreferrer"
              className="text-imo-neon/50 hover:text-imo-neon transition-colors underline underline-offset-2 light:text-imo-ocean/50 light:hover:text-imo-ocean"
            >
              unischedule.dvfu.ru
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
