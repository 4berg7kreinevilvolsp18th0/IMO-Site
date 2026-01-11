'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { getUserCabinetInfo, type CabinetType, getAvailableSections, hasCabinetAccess } from '../../../lib/cabinet';
import CabinetNav from '../../../components/CabinetNav';

export default function CabinetRolePage() {
  const router = useRouter();
  const params = useParams();
  const role = params.role as string;
  
  const [cabinetInfo, setCabinetInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCabinetInfo() {
      const info = await getUserCabinetInfo();
      
      if (!info) {
        router.push('/cabinet/login');
        return;
      }

      // Проверяем доступ к этому кабинету
      if (!hasCabinetAccess(info.cabinetType, role as any)) {
        // Редиректим на правильный кабинет
        const correctUrl = `/cabinet/${info.cabinetType}`;
        if (role !== info.cabinetType) {
          router.push(correctUrl);
          return;
        }
      }

      setCabinetInfo(info);
      setLoading(false);
    }

    loadCabinetInfo();
  }, [router, role]);

  if (loading) {
    return (
      <main className="min-h-screen bg-oss-dark">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center text-white/50">Загрузка...</div>
        </div>
      </main>
    );
  }

  if (!cabinetInfo) return null;

  const sections = getAvailableSections(cabinetInfo.cabinetType as CabinetType);
  const roleLabels: Record<string, string> = {
    member: 'Член ОСС',
    lead: 'Руководитель направления',
    board: 'Руководство ОСС',
    staff: 'Аппарат',
  };

  return (
    <main className="min-h-screen bg-oss-dark">
      <CabinetNav
        cabinetType={cabinetInfo.cabinetType}
        userEmail={cabinetInfo.user?.email}
        userRoles={cabinetInfo.roles}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2">
            Личный кабинет — {roleLabels[cabinetInfo.cabinetType || ''] || cabinetInfo.cabinetType}
          </h1>
          <p className="text-white/70">
            Добро пожаловать, {cabinetInfo.user?.email}
          </p>
        </div>

        {cabinetInfo.directions.length > 0 && (
          <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold mb-3">Ваши направления</h2>
            <div className="flex flex-wrap gap-2">
              {cabinetInfo.directions.map((dir: any) => (
                <span
                  key={dir.id}
                  className="px-3 py-1 rounded-lg bg-white/10 text-sm text-white/80"
                >
                  {dir.title}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition group"
            >
              <div className="flex items-start gap-4">
                {section.icon && (
                  <div className="text-3xl">{section.icon}</div>
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-oss-red transition">
                    {section.title}
                  </h3>
                  <p className="text-sm text-white/70">{section.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

