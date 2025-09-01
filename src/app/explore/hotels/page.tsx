"use client";
import { useState } from "react";

export default function HotelsPage() {
    const [city, setCity] = useState("Toronto");
    const [checkIn, setCheckIn] = useState(new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10));
    const [checkOut, setCheckOut] = useState(new Date(Date.now() + 10 * 86400000).toISOString().slice(0, 10));
    const [url, setUrl] = useState<string | null>(null);

    async function search() {
        const res = await fetch(`/api/hotels?city=${encodeURIComponent(city)}&checkIn=${checkIn}&checkOut=${checkOut}`);
        const json = await res.json();
        setUrl(json?.results?.[0]?.url ?? null);
    }

    return (
        <main className="p-6">
            <h1 className="text-3xl font-bold mb-4">Hotels</h1>
            <div className="flex flex-wrap gap-3 mb-6">
                <input className="px-3 py-2 rounded bg-gray-800 border border-gray-700" value={city} onChange={e => setCity(e.target.value)} placeholder="City" />
                <input type="date" className="px-3 py-2 rounded bg-gray-800 border border-gray-700" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
                <input type="date" className="px-3 py-2 rounded bg-gray-800 border border-gray-700" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
                <button onClick={search} className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700">Search</button>
            </div>
            {url && (
                <a href={url} target="_blank" className="px-4 py-3 rounded bg-indigo-600 hover:bg-indigo-700 inline-block">Open hotel results</a>
            )}
        </main>
    );
}