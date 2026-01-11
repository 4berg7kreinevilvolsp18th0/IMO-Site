'use client';

import React, { useEffect, useState } from 'react';
import CabinetGuard from '../../../components/CabinetGuard';
import { supabase } from '../../../lib/supabaseClient';
import { useToast } from '../../../components/ToastProvider';
import { getCurrentUser } from '../../../lib/auth';

export default function CabinetStatsPage() {
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
