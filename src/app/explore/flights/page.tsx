"use client";
import { useState } from "react";
import type { FlightItem } from "@/lib/types";

export default function FlightsPage() {
    const [from, setFrom] = useState("YYZ");
    const [to, setTo] = useState("LAX");
    const [depart, setDepart] = useState(new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10));
    const [adults, setAdults] = useState(1);
    const [flights, setFlights] = useState<FlightItem[]>([]);
    const [loading, setLoading] = useState(false);

    async function search() {
        setLoading(true);
        const res = await fetch(`/api/flights?from=${from}&to=${to}&depart=${depart}&adults=${adults}`);
        const json = await res.json();
        setFlights(json.flights ?? []);
        setLoading(false);
    }

    return (
        <main className="p-6">
            <h1 className="text-3xl font-bold mb-4">Flights</h1>
            <div className="flex flex-wrap gap-3 mb-6">
                <input className="px-3 py-2 rounded bg-gray-800 border border-gray-700 w-24" value={from} onChange={e => setFrom(e.target.value.toUpperCase())} placeholder="From (IATA)" />
                <input className="px-3 py-2 rounded bg-gray-800 border border-gray-700 w-24" value={to} onChange={e => setTo(e.target.value.toUpperCase())} placeholder="To (IATA)" />
                <input type="date" className="px-3 py-2 rounded bg-gray-800 border border-gray-700" value={depart} onChange={e => setDepart(e.target.value)} />
                <input type="number" className="px-3 py-2 rounded bg-gray-800 border border-gray-700 w-24" value={adults} min={1} onChange={e => setAdults(Number(e.target.value))} />
                <button onClick={search} className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700">Search</button>
            </div>

            {loading ? <p>Searching…</p> : (
                <ul className="space-y-3">
                    {flights.map(f => (
                        <li key={f.id} className="rounded-xl p-4 bg-gray-800 border border-gray-700">
                            <div className="flex items-center justify-between">
                                <div className="font-semibold">${f.price} {f.currency}</div>
                                <a href={f.deeplink} target="_blank" className="px-3 py-2 rounded bg-indigo-600 hover:bg-indigo-700">Book</a>
                            </div>
                            <div className="mt-2 text-sm text-slate-300">
                                {f.legs.map((l, i) => (
                                    <div key={i}>{l.from} → {l.to} • {new Date(l.depart).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}–{new Date(l.arrive).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} ({l.carrier})</div>
                                ))}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}