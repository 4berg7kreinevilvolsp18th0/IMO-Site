'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';
import { useToast } from '../../../components/ToastProvider';
import { getCurrentUser } from '../../../lib/auth';

export default function ManageStatsPage() {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  
  const [total, setTotal] = useState('');
  const [newCount, setNewCount] = useState('');
  const [inProgress, setInProgress] = useState('');
  const [waiting, setWaiting] = useState('');
  const [closed, setClosed] = useState('');
  const [createdToday, setCreatedToday] = useState('');
  const [closedToday, setClosedToday] = useState('');

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const user = await getCurrentUser();
      if (!user) {
        router.push('/manage/login');
        return;
      }

      // Проверяем роль пользователя
      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      const allowedRoles = ['member', 'lead', 'board', 'staff'];
      if (!roles || !allowedRoles.includes(roles.role)) {
        toast.error('У вас нет доступа к этой странице');
        router.push('/manage');
        return;
      }
