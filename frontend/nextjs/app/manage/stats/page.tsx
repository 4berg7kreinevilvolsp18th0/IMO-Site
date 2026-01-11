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

      setAuthorized(true);
      loadTodayStats();
    } catch (error) {
      console.error('Auth check error:', error);
      router.push('/manage/login');
    } finally {
      setLoading(false);
    }
  }

  async function loadTodayStats() {
    try {
      const today = new Date().toISOString().split('T')[0];
      const { data } = await supabase
        .from('statistics')
        .select('*')
        .eq('period', today)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (data && data.data) {
        const stats = data.data;
        setTotal(String(stats.total || ''));
        setNewCount(String(stats.by_status?.new || ''));
        setInProgress(String(stats.by_status?.in_progress || ''));
        setWaiting(String(stats.by_status?.waiting || ''));
        setClosed(String(stats.by_status?.closed || ''));
        setCreatedToday(String(stats.created_today || ''));
        setClosedToday(String(stats.closed_today || ''));
      }
    } catch (error) {
      // Нет данных за сегодня - это нормально
      console.log('No stats for today yet');
    }
  }

  async function saveStats() {
    if (!total || !newCount || !inProgress || !waiting || !closed) {
      toast.error('Заполните все обязательные поля');
      return;
    }

    setSaving(true);
    try {
      const user = await getCurrentUser();
      if (!user) {
        toast.error('Необходима авторизация');
        return;
      }

      const today = new Date().toISOString().split('T')[0];
