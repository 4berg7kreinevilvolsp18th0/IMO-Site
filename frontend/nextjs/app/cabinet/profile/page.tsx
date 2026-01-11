'use client';

import React, { useEffect, useState } from 'react';
import CabinetGuard from '../../../components/CabinetGuard';
import { getCurrentUser, getUserRoles, signOut, type UserRoleWithDirection } from '../../../lib/auth';
import { supabase } from '../../../lib/supabaseClient';
import { useToast } from '../../../components/ToastProvider';

export default function CabinetProfilePage() {
  const toast = useToast();
  const [user, setUser] = useState<any>(null);
  const [roles, setRoles] = useState<UserRoleWithDirection[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [stats, setStats] = useState({
    totalAppeals: 0,
    myAppeals: 0,
    assignedToMe: 0,
    closedAppeals: 0,
  });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const { user: currentUser } = await getCurrentUser();
      if (!currentUser) return;

      setUser(currentUser);
      const userRoles = await getUserRoles();
      setRoles(userRoles);

      // Загружаем статистику
      const { data: appeals } = await supabase
        .from('appeals')
        .select('id, status, assigned_to')
        .eq('assigned_to', currentUser.id);

      if (appeals) {
        setStats({
          totalAppeals: appeals.length,
          myAppeals: appeals.length,
          assignedToMe: appeals.filter(a => a.assigned_to === currentUser.id).length,
          closedAppeals: appeals.filter(a => a.status === 'closed').length,
        });
      }
    } catch (error) {
      console.error('Load data error:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handlePasswordChange() {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('Пароли не совпадают');
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      toast.error('Пароль должен быть не менее 8 символов');
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordForm.newPassword,
      });

      if (error) throw error;

      toast.success('Пароль успешно изменен');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error: any) {
      toast.error(error.message || 'Ошибка при изменении пароля');
    } finally {
      setSaving(false);
    }
  }

  const roleLabels: Record<string, string> = {
    member: 'Член ОСС',
    lead: 'Руководитель направления',
    board: 'Руководство ОСС',
    staff: 'Аппарат',
  };

  return (
    <CabinetGuard>
      <main className="min-h-screen bg-oss-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-semibold mb-8">Профиль</h1>

          {loading ? (
            <div className="text-center text-white/50">Загрузка...</div>
          ) : (
            <div className="space-y-6">
              {/* Информация о пользователе */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-xl font-semibold mb-4">Личные данные</h2>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-white/60">Email</label>
                    <div className="mt-1 text-white">{user?.email}</div>
                  </div>
                  <div>
                    <label className="text-sm text-white/60">ID пользователя</label>
                    <div className="mt-1 text-white font-mono text-sm">{user?.id}</div>
                  </div>
                  {roles.length > 0 && (
                    <div>
                      <label className="text-sm text-white/60">Роли</label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {roles.map((r, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-lg bg-white/10 text-sm text-white/80"
                          >
                            {roleLabels[r.role] || r.role}
                            {r.directionId && ' (направление)'}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Статистика */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-xl font-semibold mb-4">Статистика</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-2xl font-semibold">{stats.totalAppeals}</div>
                    <div className="text-sm text-white/60">Всего обращений</div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold">{stats.assignedToMe}</div>
                    <div className="text-sm text-white/60">Назначено мне</div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold">{stats.closedAppeals}</div>
                    <div className="text-sm text-white/60">Закрыто</div>
                  </div>
                </div>
              </div>

              {/* Изменение пароля */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-xl font-semibold mb-4">Изменение пароля</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Новый пароль</label>
                    <input
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) =>
                        setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                      }
                      className="w-full rounded-xl bg-white/10 p-3 border border-white/20 text-white"
                      placeholder="Минимум 8 символов"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Подтвердите пароль</label>
                    <input
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) =>
                        setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                      }
                      className="w-full rounded-xl bg-white/10 p-3 border border-white/20 text-white"
                      placeholder="Повторите пароль"
                    />
                  </div>
                  <button
                    onClick={handlePasswordChange}
                    disabled={saving || !passwordForm.newPassword || !passwordForm.confirmPassword}
                    className="px-6 py-3 rounded-xl bg-oss-red font-semibold hover:bg-oss-red/90 transition disabled:opacity-50"
                  >
                    {saving ? 'Сохранение...' : 'Изменить пароль'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </CabinetGuard>
  );
}

