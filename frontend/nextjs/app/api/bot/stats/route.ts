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

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized. Missing or invalid Authorization header' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    if (token !== apiKey) {
      return NextResponse.json(
        { error: 'Unauthorized. Invalid API key' },
        { status: 401 }
      );
    }

    // Получение данных от бота
    const body = await request.json();
    const {
      total,
      by_status,
      by_direction,
      created_today,
      closed_today,
      timestamp,
    } = body;

    // Валидация данных
    if (
      typeof total !== 'number' ||
      !by_status ||
      !by_direction ||
      typeof created_today !== 'number' ||
      typeof closed_today !== 'number'
    ) {
      return NextResponse.json(
        { error: 'Invalid data format' },
        { status: 400 }
      );
    }

    // Сохранение статистики в БД
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    
    const statsData = {
      period: today,
      source: 'bot',
      data: {
        total,
        by_status,
        by_direction,
        created_today,
        closed_today,
        timestamp: timestamp || new Date().toISOString(),
      },
    };

    // Проверяем, есть ли уже статистика за сегодня от бота
    const { data: existing } = await supabase
      .from('statistics')
      .select('id')
      .eq('period', today)
      .eq('source', 'bot')
      .single();

    if (existing) {
      // Обновляем существующую запись
      const { error: updateError } = await supabase
        .from('statistics')
        .update({
          data: statsData.data,
        })
        .eq('id', existing.id);

      if (updateError) {
        console.error('Error updating statistics:', updateError);
        return NextResponse.json(
          { error: 'Failed to update statistics' },
          { status: 500 }
        );
      }
    } else {
      // Создаем новую запись
      const { error: insertError } = await supabase
        .from('statistics')
        .insert(statsData);

      if (insertError) {
        console.error('Error inserting statistics:', insertError);
        return NextResponse.json(
          { error: 'Failed to save statistics' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Statistics saved successfully',
      period: today,
    });
  } catch (error: any) {
    console.error('Bot stats API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

