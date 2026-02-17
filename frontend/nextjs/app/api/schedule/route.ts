import { NextResponse } from 'next/server';
import scheduleData from '@/content/schedule.json';
import type { ScheduleData } from '@/lib/schedule-types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const groupId = searchParams.get('group');

  const data = scheduleData as ScheduleData;

  if (groupId) {
    const filteredLessons = data.lessons.filter((l) => l.groupId === groupId);
    return NextResponse.json({
      ...data,
      lessons: filteredLessons,
    });
  }

  return NextResponse.json(data);
}
