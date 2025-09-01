"use client";
import { useEffect, useState } from "react";
import type { EventItem } from "@/lib/types";

export default function EventsPage() {
    const [city, setCity] = useState("Toronto");
    const [q, setQ] = useState("");
    const [items, setItems] = useState<EventItem[]>([]);
    const [loading, setLoading] = useState(false);

    async function load() {
        setLoading(true);
        const res = await fetch(`/api/events?city=${encodeURIComponent(city)}&q=${encodeURIComponent(q)}`);
        const json = await res.json();
        setItems(json.events ?? []);
        setLoading(false);
    }

    useEffect(() => { load(); /* load initial */ }, []);

    return (
        <main className="p-6">
            <h1 className="text-3xl font-bold mb-4">Events</h1>
            <div className="flex gap-3 mb-6">
                <input className="px-3 py-2 rounded bg-gray-800 border border-gray-700" value={city} onChange={e => setCity(e.target.value)} placeholder="City" />
                <input className="px-3 py-2 rounded bg-gray-800 border border-gray-700" value={q} onChange={e => setQ(e.target.value)} placeholder="Keyword (optional)" />
                <button onClick={load} className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700">Search</button>
            </div>

            {loading ? <p>Loading…</p> : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map(e => (
                        <a key={`${e.source}:${e.id}`} href={e.url} target="_blank" className="block rounded-xl p-4 bg-gray-800 border border-gray-700 hover:shadow-lg">
                            <div className="text-sm text-slate-400 mb-1">{e.source.toUpperCase()}</div>
                            <div className="font-semibold">{e.name}</div>
                            <div className="text-slate-400 text-sm">{e.city} {e.venue ? `• ${e.venue}` : ""}</div>
                            <div className="text-slate-400 text-sm">{new Date(e.start).toLocaleString()}</div>
                        </a>
                    ))}
                </div>
            )}
        </main>
    );
}