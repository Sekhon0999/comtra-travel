import { NextRequest, NextResponse } from "next/server";
import { safeFetch } from "@/lib/fetchers";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city") || "Toronto";
    const key = process.env.OPENTRIPMAP_API_KEY!;

    if (!key) return NextResponse.json({ pois: [] });

    // 1) Geocode city
    const geo = await safeFetch(`https://api.opentripmap.com/0.1/en/places/geoname?name=${encodeURIComponent(city)}&apikey=${key}`).catch(() => null);
    if (!geo?.lat || !geo?.lon) return NextResponse.json({ pois: [] });

    // 2) Nearby interesting places
    const list = await safeFetch(`https://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon=${geo.lon}&lat=${geo.lat}&rate=2&limit=20&apikey=${key}`).catch(() => ({ features: [] as any[] }));
    const items = (list?.features ?? []).map((f: any) => ({
        id: f.id,
        name: f.properties?.name,
        kinds: f.properties?.kinds,
        url: `https://opentripmap.com/en/card/${f.id}`,
    }));

    return NextResponse.json({ city, pois: items });
}