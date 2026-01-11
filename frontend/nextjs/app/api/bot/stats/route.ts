import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabaseClient';

export const dynamic = 'force-dynamic';

/**
 * API для получения статистики от Telegram бота
 * Бот отправляет статистику обращений, которая сохраняется в БД
 */
export async function POST(request: NextRequest) {
  try {
    // Проверка API ключа
    const authHeader = request.headers.get('authorization');
    const apiKey = process.env.BOT_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'BOT_API_KEY not configured' },
        { status: 500 }
      );
    }
