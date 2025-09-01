import { NextRequest, NextResponse } from "next/server";
import { safeFetch } from "@/lib/fetchers";
import { mapKiwi } from "@/lib/normalize";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const from = searchParams.get("from") || "YYZ";
    const to = searchParams.get("to") || "LAX";
    const depart = searchParams.get("depart") || new Date().toISOString().slice(0, 10);
    const ret = searchParams.get("return") || "";
    const adults = Number(searchParams.get("adults") || "1");

    const key = process.env.KIWI_API_KEY!;
    if (!key) {
        return NextResponse.json({ error: "KIWI_API_KEY missing" }, { status: 400 });
    }

    // Tequila /v2/search
    const url = new URL("https://api.tequila.kiwi.com/v2/search");
    url.searchParams.set("fly_from", from);
    url.searchParams.set("fly_to", to);
    url.searchParams.set("date_from", depart);
    url.searchParams.set("date_to", depart);
    if (ret) {
        url.searchParams.set("return_from", ret);
        url.searchParams.set("return_to", ret);
    }
    url.searchParams.set("adults", String(adults));
    url.searchParams.set("curr", "USD");
    url.searchParams.set("limit", "20");
    url.searchParams.set("one_for_city", "1");

    const json = await safeFetch(url.toString(), { headers: { apikey: key } }).catch(() => null);
    if (!json) return NextResponse.json({ flights: [] });

    const flights = mapKiwi(json);
    return NextResponse.json({ flights });
}