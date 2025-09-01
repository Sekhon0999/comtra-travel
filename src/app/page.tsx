// src/app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* backdrop */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-600 via-violet-600 to-pink-600" />
        <div className="absolute inset-x-0 top-0 h-[520px] bg-[url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center opacity-20" />

        <div className="mx-auto max-w-6xl px-4 pt-16 pb-10 md:pt-24 md:pb-16 text-white">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm backdrop-blur">
              <span className="text-yellow-300">★</span> Rated 4.9 by travelers
            </div>
            <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
              Find your next stay, flight, or perfect weekend escape
            </h1>
            <p className="mt-3 text-white/85 md:text-lg">
              Compare deals across hotels, flights, and experiences—then book with confidence.
            </p>
          </div>

          {/* Search Card */}
          <div className="mt-8 rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-black/5 text-slate-800">
            {/* Tabs */}
            <div className="flex gap-2 border-b border-slate-200 pb-3">
              <button className="rounded-full bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white">
                Stays
              </button>
              <button className="rounded-full px-4 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100">
                Flights
              </button>
              <button className="rounded-full px-4 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100">
                Experiences
              </button>
            </div>

            {/* Inputs */}
            <div className="mt-4 grid gap-3 md:grid-cols-12">
              <div className="md:col-span-5">
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  Destination
                </label>
                <input
                  placeholder="Where to?"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-indigo-200 focus:ring-4"
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  Check-in
                </label>
                <input
                  type="date"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-indigo-200 focus:ring-4"
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  Check-out
                </label>
                <input
                  type="date"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-indigo-200 focus:ring-4"
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  Guests
                </label>
                <select className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-indigo-200 focus:ring-4">
                  <option>1 adult</option>
                  <option>2 adults</option>
                  <option>Family</option>
                  <option>Group (5+)</option>
                </select>
              </div>
              <div className="md:col-span-1 flex items-end">
                <Link
                  href="/explore"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-500"
                >
                  Search
                </Link>
              </div>
            </div>

            {/* Quick filters */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {["Free cancellation", "Breakfast included", "4★ & up", "Near city center"].map(
                (f) => (
                  <button
                    key={f}
                    className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50"
                  >
                    {f}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Trust row */}
          <div className="mt-6 grid gap-4 text-sm text-white/85 md:grid-cols-3">
            <div className="flex items-center gap-2">
              <span>🛡️</span> Secure payments & data protection
            </div>
            <div className="flex items-center gap-2">
              <span>💬</span> 24/7 support for every booking
            </div>
            <div className="flex items-center gap-2">
              <span>🏷️</span> Price transparency—no hidden fees
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR DESTINATIONS */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold">Popular right now</h2>
          <Link href="/explore" className="text-sm font-medium text-indigo-600 hover:underline">
            See all
          </Link>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              city: "Paris",
              img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop",
            },
            {
              city: "Tokyo",
              img: "https://images.unsplash.com/photo-1505063368232-7fbb0b6741d7?q=80&w=1200&auto=format&fit=crop",
            },
            {
              city: "New York",
              img: "https://images.unsplash.com/photo-1468436139062-f60a71c5c892?q=80&w=1200&auto=format&fit=crop",
            },
            {
              city: "Bali",
              img: "https://images.unsplash.com/photo-1518544801976-3e3b228c1e2a?q=80&w=1200&auto=format&fit=crop",
            },
          ].map((d) => (
            <Link
              key={d.city}
              href="/explore/hotels"
              className="group overflow-hidden rounded-2xl bg-slate-900/5 ring-1 ring-black/5"
            >
              <div
                className="h-44 w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundImage: `url(${d.img})` }}
                aria-label={d.city}
              />
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{d.city}</h3>
                  <span className="text-xs rounded bg-emerald-100 px-2 py-0.5 text-emerald-700">
                    Trending
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-500">Hand-picked stays & experiences</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-400 to-pink-500 p-6 md:p-10">
          <div className="max-w-2xl">
            <h3 className="text-2xl font-bold text-white">Unlock Member Prices</h3>
            <p className="mt-2 text-white/90">
              Sign in to access exclusive discounts on select hotels and flights.
            </p>
          </div>
          <div className="mt-4">
            <Link
              href="/explore"
              className="inline-flex rounded-md bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100"
            >
              Explore deals
            </Link>
          </div>
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/20 blur-2xl" />
        </div>
      </section>
    </main>
  );
}