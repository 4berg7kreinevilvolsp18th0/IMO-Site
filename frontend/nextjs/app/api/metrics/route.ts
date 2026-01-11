import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Метрики frontend приложения
 */
export async function GET() {
  try {
    const metrics = {
      timestamp: new Date().toISOString(),
