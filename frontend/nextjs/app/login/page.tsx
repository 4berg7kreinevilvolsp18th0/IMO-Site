'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from '../../lib/auth';
import { supabase } from '../../lib/supabaseClient';
import { getRecaptchaToken, verifyRecaptchaToken } from '../../lib/captcha';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockUntil, setBlockUntil] = useState<Date | null>(null);

  useEffect(() => {
    // Проверка блокировки на сервере (не из localStorage!)
    async function checkBlockStatus() {
      try {
        const response = await fetch('/api/auth/block');
        const data = await response.json();
        
        if (data.blocked) {
          setIsBlocked(true);
          // Если есть retryAfter, установить время разблокировки
          if (data.retryAfter) {
            const unblockTime = new Date(Date.now() + data.retryAfter * 1000);
            setBlockUntil(unblockTime);
          }
        }
      } catch (err) {
        // Игнорируем ошибки проверки блокировки
      }
    }
    
    checkBlockStatus();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // Проверка блокировки
    if (isBlocked && blockUntil && blockUntil > new Date()) {
      const minutesLeft = Math.ceil((blockUntil.getTime() - Date.now()) / 60000);
      setError(`Слишком много неудачных попыток. Попробуйте через ${minutesLeft} минут.`);
      return;
    }

    setLoading(true);

    try {
      // Проверка reCAPTCHA
      let captchaToken = '';
      if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
        try {
          captchaToken = await getRecaptchaToken('login');
          const captchaValid = await verifyRecaptchaToken(captchaToken);
          if (!captchaValid) {
            setError('Проверка безопасности не пройдена. Попробуйте еще раз.');
            setLoading(false);
            return;
          }
        } catch (captchaError) {
          console.error('reCAPTCHA error:', captchaError);
          // В development можно пропустить
          if (process.env.NODE_ENV === 'production') {
            setError('Ошибка проверки безопасности. Обновите страницу.');
            setLoading(false);
            return;
          }
        }
      }

      // Проверка rate limit на сервере
      const rateLimitCheck = await fetch('/api/auth/rate-limit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      if (!rateLimitCheck.ok) {
        const rateLimitData = await rateLimitCheck.json();
        if (rateLimitData.retryAfter) {
          const minutes = Math.ceil(rateLimitData.retryAfter / 60);
          setError(`Слишком много попыток. Попробуйте через ${minutes} минут.`);
          setLoading(false);
          return;
        }
      }

      // Логирование попытки входа
      await logLoginAttempt(email, 'attempt');

      const { data, error: signInError } = await signIn(email, password);

      if (signInError) {
        // Логирование неудачной попытки
        await logLoginAttempt(email, 'failed', signInError.message);

        // Унифицированное сообщение об ошибке (не раскрывать информацию)
        // Всегда одинаковое сообщение, независимо от причины
        // БЕЗОПАСНОСТЬ: Не раскрываем количество попыток или причину ошибки
        let errorMessage = 'Неверный email или пароль';
        
        // Только для rate limit показываем специальное сообщение
        if (signInError.message?.includes('Too many requests') || rateLimitCheck.status === 429) {
          errorMessage = 'Слишком много попыток. Попробуйте позже.';
          setIsBlocked(true);
          const rateLimitData = await rateLimitCheck.json();
          if (rateLimitData.retryAfter) {
            const unblockTime = new Date(Date.now() + rateLimitData.retryAfter * 1000);
            setBlockUntil(unblockTime);
          }
        }
        
        setError(errorMessage);
        setLoading(false);
        return;
      }

      // Проверка 2FA (если включена)
      if (signInError === null && data?.user) {
        const { data: user2FA } = await supabase
          .from('user_2fa')
          .select('enabled')
          .eq('user_id', data.user.id)
          .single();

        if (user2FA?.enabled) {
          // Требуется 2FA - сохранить сессию и запросить код
          // В production здесь нужно сохранить временную сессию
          // и показать форму ввода 2FA кода
          const twoFactorToken = await fetch('/api/auth/2fa/check', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: data.user.id,
              token: '', // Пока пустой, пользователь введет позже
            }),
          });

          const twoFactorData = await twoFactorToken.json();
          if (twoFactorData.required) {
            // Сохранить user ID для проверки 2FA
            sessionStorage.setItem('2fa_user_id', data.user.id);
            // Перенаправить на страницу ввода 2FA
            router.push('/login/2fa');
            setLoading(false);
            return;
          }
        }
      }

      // Логирование успешного входа
      await logLoginAttempt(email, 'success');

      // Перенаправление на скрытую админ-панель
      router.push('/manage');
      router.refresh();
    } catch (err: any) {
      await logLoginAttempt(email, 'error', err.message);
      setError(err.message || 'Неожиданная ошибка при входе');
      setLoading(false);
    }
  }

  async function logLoginAttempt(email: string, status: string, details?: string) {
    try {
      // Логирование в БД (если есть таблица security_log)
      await fetch('/api/security/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_type: 'login_attempt',
          email: email.substring(0, 3) + '***', // Частично скрытый email
          status,
          details,
          ip: 'client', // IP будет получен на сервере из заголовков
          user_agent: navigator.userAgent,
        }),
      });
    } catch (err) {
      // Игнорируем ошибки логирования (не критично)
      // Логирование ошибок логирования может привести к бесконечному циклу
    }
  }

  // IP будет получен на сервере из заголовков
  // Не нужно делать внешний запрос - это медленно и ненадежно

  return (
    <main className="min-h-screen flex items-center justify-center bg-oss-dark px-6 py-12">
      <div className="max-w-md w-full">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold mb-2">Вход в систему</h1>
            <p className="text-white/70">
              Для членов ОСС ДВФУ
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                required
                autoComplete="email"
                className="w-full rounded-xl bg-white/10 p-3 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-oss-red transition"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isBlocked}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Пароль</label>
              <input
                type="password"
                required
                autoComplete="current-password"
                className="w-full rounded-xl bg-white/10 p-3 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-oss-red transition"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isBlocked}
              />
            </div>

            {error && (
              <div className={`rounded-xl border p-4 text-sm ${
                error.includes('заблокирован') 
                  ? 'border-red-500/40 bg-red-500/10 text-red-400'
                  : 'border-yellow-500/40 bg-yellow-500/10 text-yellow-400'
              }`}>
                {error}
              </div>
            )}

            {/* Не показывать количество попыток - это помогает атакующим */}

            <button
              type="submit"
              disabled={loading || isBlocked}
              className="w-full rounded-xl bg-oss-red py-3 font-semibold hover:bg-oss-red/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Вход...' : 'Войти'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <Link
              href="/register"
              className="text-sm text-white/60 hover:text-white/80 transition"
            >
              Нет аккаунта? Зарегистрироваться
            </Link>
          </div>

          <div className="mt-4 text-xs text-white/40 text-center">
            <p>Для получения доступа обратитесь к руководству ОСС.</p>
          </div>
        </div>
      </div>
    </main>
  );
}

