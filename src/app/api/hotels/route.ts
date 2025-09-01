import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city") || "Toronto";
    const checkIn = searchParams.get("checkIn") || new Date().toISOString().slice(0, 10);
    const checkOut = searchParams.get("checkOut") || new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10);
    const adults = searchParams.get("adults") || "2";

    const marker = process.env.TRAVELPAYOUTS_MARKER || "0";
    // Simple hotels deep link (universal search)
    const url = `https://hotels.travelpayouts.com/?marker=${encodeURIComponent(marker)}&q=${encodeURIComponent(city)}&checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}`;

    // For now we return a single “search” item. You can later switch to Hotels API (paid) or other providers.
    return NextResponse.json({
        city, results: [{ id: "tp-search", name: `Search hotels in ${city}`, url }]
    });
}