'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [rows, setRows] = useState<any[]>([]);
  const [err, setErr] = useState<string>();

  useEffect(() => {
    supabase
      .from('equivalents')
      .select(`
        confidence,
        home:home_brand_id ( name ),
        local:local_brand_id ( name )
      `)
      .then(({ data, error }) => {
        if (error) setErr(error.message);
        setRows(data || []);
      });
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1>Comtra Travel Hub 🌍</h1>
      {err && <p style={{ color: 'crimson' }}>Error: {err}</p>}
      <ul>
        {rows.map((r, i) => (
          <li key={i}>
            {r.home?.name} → {r.local?.name} ({r.confidence})
          </li>
        ))}
      </ul>
    </main>
  );
}
