'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUserCabinetInfo, getCabinetUrl } from '../../lib/cabinet';

export default function CabinetPage() {
  const router = useRouter();

  useEffect(() => {
    async function redirect() {
      const cabinetInfo = await getUserCabinetInfo();
      if (cabinetInfo) {
        const cabinetUrl = getCabinetUrl(cabinetInfo.cabinetType);
        router.push(cabinetUrl);
      } else {
        router.push('/cabinet/login');
      }
    }
    redirect();
  }, [router]);

  return (
    <main className="min-h-screen bg-oss-dark flex items-center justify-center">
      <div className="text-center text-white/50">Перенаправление...</div>
    </main>
  );
}

