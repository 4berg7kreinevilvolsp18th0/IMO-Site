'use client';

import React from 'react';
import CabinetGuard from '../../../components/CabinetGuard';

export default function CabinetUsersPage() {
  return (
    <CabinetGuard requiredRole="board">
      <main className="min-h-screen bg-oss-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-semibold mb-8">Управление пользователями</h1>
          
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-white/70 mb-4">
              Управление ролями пользователей будет доступно в будущих версиях.
              Сейчас роли назначаются напрямую в базе данных Supabase.
            </p>
            <div className="mt-4 text-sm text-white/60">
              <p>Для назначения ролей используйте SQL запросы в Supabase:</p>
              <pre className="mt-2 p-4 rounded-lg bg-white/5 text-xs overflow-x-auto">
{`INSERT INTO user_roles (user_id, role, direction_id)
VALUES ('<user-id>', 'member', '<direction-id>');`}
              </pre>
            </div>
          </div>
        </div>
      </main>
    </CabinetGuard>
  );
}

