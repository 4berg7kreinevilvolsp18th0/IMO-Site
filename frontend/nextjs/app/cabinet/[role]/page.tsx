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
