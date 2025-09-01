"use client";
import { useEffect, useState } from "react";

type Poi = { id: string; name: string; kinds?: string; url: string };

export default function GuidesPage() {
    const [city, setCity] = useState("Toronto");
    const [items, setItems] = useState<Poi[]>([]);
    const [loading, setLoading] = useState(false);

    async function load() {
        setLoading(true);
        const res = await fetch(`/api/pois?city=${encodeURIComponent(city)}`);
        const json = await res.json();
        setItems(json.pois ?? []);
        setLoading(false);
    }

    useEffect(() => { load(); }, []);

    return (
        <main className="p-6">
            <h1 className="text-3xl font-bold mb-4">Guides & POIs</h1>
            <div className="flex gap-3 mb-6">
                <input className="px-3 py-2 rounded bg-gray-800 border border-gray-700" value={city} onChange={e => setCity(e.target.value)} />
                <button onClick={load} className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700">Search</button>
            </div>

            {loading ? <p>Loading…</p> : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map(p => (
                        <a key={p.id} href={p.url} target="_blank" className="rounded-xl p-4 bg-gray-800 border border-gray-700 hover:shadow-lg">
                            <div className="font-semibold">{p.name || "Unnamed place"}</div>
                            <div className="text-slate-400 text-sm">{p.kinds}</div>
                        </a>
                    ))}
                </div>
            )}
        </main>
    );
}