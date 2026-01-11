'use client';

import React from 'react';
import CabinetGuard from '../../../components/CabinetGuard';
import Link from 'next/link';

export default function CabinetContentPage() {
  return (
    <CabinetGuard requiredRole={['lead', 'board']}>
      <main className="min-h-screen bg-oss-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-semibold mb-8">Контент</h1>
          
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-white/70 mb-4">
              Управление контентом (новости, гайды, FAQ) доступно в админ-панели.
            </p>
            <Link
              href="/admin/content"
              className="inline-block px-6 py-3 rounded-xl bg-oss-red font-semibold hover:bg-oss-red/90 transition"
            >
              Перейти к управлению контентом
            </Link>
          </div>
        </div>
      </main>
    </CabinetGuard>
  );
}

