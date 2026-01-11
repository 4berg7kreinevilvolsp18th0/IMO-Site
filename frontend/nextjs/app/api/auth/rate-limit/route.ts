import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimitRedis, blockIP, isIPBlocked } from '../../../../lib/redis';

export const dynamic = 'force-dynamic';

/**
 * Проверка rate limit для входа
 * БЕЗОПАСНОСТЬ: Использует Redis для распределенного rate limiting
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;
    
    const ip = request.ip || 
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'unknown';
    
    // Проверить, не заблокирован ли IP
    const isBlocked = await isIPBlocked(ip);
    if (isBlocked) {
      return NextResponse.json(
        {
          allowed: false,
          blocked: true,
          message: 'IP заблокирован из-за подозрительной активности',
        },
        { status: 403 }
      );
    }
    
    // Комбинированный ключ: IP + email (первые 3 символа)
    const key = `login:${ip}:${email ? email.substring(0, 3) : 'unknown'}`;
    
    // 5 попыток в минуту
    const limit = checkRateLimit(key, 5, 60000);
    
    if (!limit.allowed) {
      return NextResponse.json(
        {
          allowed: false,
          retryAfter: Math.ceil((limit.resetTime - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            'Retry-After': Math.ceil((limit.resetTime - Date.now()) / 1000).toString(),
          },
        }
      );
    }
    
    return NextResponse.json({
      allowed: true,
      remaining: limit.remaining,
      resetTime: limit.resetTime,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to check rate limit' },
      { status: 500 }
    );
  }
}

