"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Category = {
    slug: string;
    title: string;
    desc: string;
    cta?: string;
    emoji: string;
};

const CATEGORIES: Category[] = [
    { slug: "hotels", title: "Hotels", desc: "Find stays by area, price & rating.", emoji: "🏨", cta: "Browse hotels" },
    { slug: "flights", title: "Flights", desc: "Compare fares & routes instantly.", emoji: "✈️", cta: "Search flights" },
    { slug: "events", title: "Events", desc: "Concerts, sports & festivals near you.", emoji: "🎟️", cta: "See events" },
    { slug: "guides", title: "Guides", desc: "Neighborhoods, visas, safety & more.", emoji: "📚", cta: "Open guides" },
    { slug: "tipping", title: "Tipping", desc: "Local tipping norms by country/city.", emoji: "💸", cta: "Check etiquette" },
    { slug: "pois", title: "POIs", desc: "Sights, cafés and must-do experiences.", emoji: "📍", cta: "Explore places" },
];

export default function ExplorePage() {
    const [q, setQ] = useState("");
    const [pill, setPill] = useState<string>("all");

    const filtered = useMemo(() => {
        const list = pill === "all" ? CATEGORIES : CATEGORIES.filter(c => c.slug === pill);
        if (!q.trim()) return list;
        const t = q.trim().toLowerCase();
        return list.filter(
            (c) =>
                c.title.toLowerCase().includes(t) ||
                c.desc.toLowerCase().includes(t) ||
                c.slug.toLowerCase().includes(t)
        );
    }, [q, pill]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
            {/* Top bar */}
            <div className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/80 border-b border-white/10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-3">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/20 ring-1 ring-purple-400/30">
                            <span className="text-lg">🧭</span>
                        </span>
                        <div>
                            <p className="text-sm text-slate-300">Explore</p>
                            <h1 className="text-xl font-semibold tracking-tight">Find what you need, fast</h1>
                        </div>
                    </div>

                    {/* Search + Pills */}
                    <div className="flex flex-1 md:flex-none items-center gap-3">
                        <div className="relative flex-1 md:w-80">
                            <input
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                                placeholder="Search modules (hotels, flights, events…) "
                                className="w-full rounded-lg bg-slate-800/70 border border-white/10 px-3.5 py-2.5 text-sm outline-none ring-0 focus:border-purple-400/50 focus:bg-slate-800/90"
                            />
                            {q && (
                                <button
                                    onClick={() => setQ("")}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 text-xs"
                                    aria-label="Clear search"
                                >
                                    ✕
                                </button>
                            )}
                        </div>

                        <div className="hidden md:flex gap-2">
                            {[
                                { id: "all", label: "All" },
                                ...CATEGORIES.map((c) => ({ id: c.slug, label: c.title })),
                            ].map((p) => (
                                <button
                                    key={p.id}
                                    onClick={() => setPill(p.id)}
                                    className={[
                                        "rounded-full px-3 py-1.5 text-xs border transition",
                                        pill === p.id
                                            ? "bg-purple-500 text-white border-purple-400/50 shadow shadow-purple-500/30"
                                            : "bg-slate-800/60 text-slate-300 border-white/10 hover:bg-slate-800"
                                    ].join(" ")}
                                >
                                    {p.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
                {/* Breadcrumb */}
                <nav className="mb-6 text-xs text-slate-400">
                    <ol className="flex items-center gap-2">
                        <li>
                            <Link href="/" className="hover:text-slate-200">Home</Link>
                        </li>
                        <li className="opacity-50">/</li>
                        <li className="text-slate-200">Explore</li>
                    </ol>
                </nav>

                {/* Section header */}
                <header className="mb-8">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        Pick a module to start planning smarter
                    </h2>
                    <p className="mt-1 text-sm text-slate-400">
                        Seamless flows to search, compare and book. Built for speed.
                    </p>
                </header>

                {/* Grid */}
                {filtered.length === 0 ? (
                    <div className="rounded-xl border border-white/10 bg-slate-900/50 p-10 text-center">
                        <p className="text-slate-300">No results. Try a different search.</p>
                    </div>
                ) : (
                    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filtered.map((c) => (
                            <li key={c.slug}>
                                <Link
                                    href={`/${c.slug}`}
                                    className="group block rounded-2xl border border-white/10 bg-slate-900/60 p-5 transition hover:-translate-y-0.5 hover:border-purple-400/40 hover:bg-slate-900/80"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="grid h-12 w-12 place-items-center rounded-xl bg-purple-500/15 ring-1 ring-purple-400/30 text-xl">
                                            {c.emoji}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-base font-semibold text-white">{c.title}</h3>
                                                <span className="text-xs text-slate-400 group-hover:text-slate-200 transition">
                                                    Open →
                                                </span>
                                            </div>
                                            <p className="mt-1 text-sm leading-6 text-slate-400">{c.desc}</p>
                                            <div className="mt-4">
                                                <span className="inline-block rounded-md bg-purple-500 px-3 py-1.5 text-xs font-medium text-white shadow shadow-purple-500/30">
                                                    {c.cta ?? "Open"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Helpful links */}
                <div className="mt-10 grid gap-4 md:grid-cols-2">
                    <Callout
                        title="Need trip ideas?"
                        body="Browse curated guides for popular cities with insider picks."
                        href="/guides"
                    />
                    <Callout
                        title="On a budget?"
                        body="Use Explore → Flights to find flexible dates and cheaper routes."
                        href="/flights"
                    />
                </div>
            </div>
        </div>
    );
}

function Callout({ title, body, href }: { title: string; body: string; href: string }) {
    return (
        <Link
            href={href}
            className="block rounded-2xl border border-white/10 bg-slate-900/60 p-5 transition hover:border-purple-400/40 hover:bg-slate-900/80"
        >
            <div className="flex items-start gap-3">
                <div className="h-2.5 w-2.5 mt-1.5 rounded-full bg-purple-400/90" />
                <div>
                    <h4 className="font-medium text-white">{title}</h4>
                    <p className="mt-1 text-sm text-slate-400">{body}</p>
                    <span className="mt-3 inline-flex text-xs text-slate-300 hover:text-slate-100">
                        Learn more →
                    </span>
                </div>
            </div>
        </Link>
    );
}