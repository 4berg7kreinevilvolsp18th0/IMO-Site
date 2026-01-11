'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from '../../../lib/auth';
import { getUserCabinetInfo, getCabinetUrl } from '../../../lib/cabinet';

export default function CabinetLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error: signInError } = await signIn(email, password);

      if (signInError) {
        let errorMessage = 'Ошибка входа';
        
        if (signInError.message?.includes('Invalid login credentials')) {
          errorMessage = 'Неверный email или пароль';
        } else if (signInError.message?.includes('Email not confirmed')) {
          errorMessage = 'Email не подтвержден. Проверьте почту.';
        } else if (signInError.message?.includes('Too many requests')) {
          errorMessage = 'Слишком много попыток. Попробуйте позже.';
        } else if (signInError.message) {
          errorMessage = signInError.message;
        }
        
        setError(errorMessage);
        setLoading(false);
        return;
      }

      // Получаем информацию о кабинете и редиректим
      const cabinetInfo = await getUserCabinetInfo();
      if (cabinetInfo) {
        const cabinetUrl = getCabinetUrl(cabinetInfo.cabinetType);
        router.push(cabinetUrl);
      } else {
        setError('У вас нет доступа к кабинету. Обратитесь к администратору.');
        setLoading(false);
      }
    } catch (err: any) {
      setError(err.message || 'Неожиданная ошибка при входе');
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-oss-dark light:bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold mb-2">Вход в личный кабинет</h1>
          <p className="text-white/70 light:text-gray-600">
            Доступ только для членов ОСС ДВФУ
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-xl bg-red-500/20 border border-red-500/50 p-4 text-red-200 text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl bg-white/10 p-3 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-oss-red focus:border-transparent"
              placeholder="your@email.com"
              placeholder="••••••••"
