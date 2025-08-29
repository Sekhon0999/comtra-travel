'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.ts';

type Row = { confidence: number; home?: { name?: string }; local?: { name?: string } };

export default function Home() {
  const [rows, setRows] = useState<Row[]>([]);
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
        if (data) setRows(data as Row[]);
      });
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1>Comtra Travel Hub 🌍</h1>
      {err && <p style={{ color: 'crimson' }}>Error: {err}</p>}
      <ul>
        {rows.map((r, i) => (
          <li key={i}>
            {r.home?.name} → {r.local?.name} (confidence {r.confidence})
          </li>
        ))}
      </ul>
      {rows.length === 0 && !err && <p>Loading…</p>}
    </main>
  );
}
