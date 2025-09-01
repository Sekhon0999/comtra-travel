import { NextRequest, NextResponse } from "next/server";
import { safeFetch } from "@/lib/fetchers";
import { mapTicketmaster, mapEventbrite, mapSeatGeek } from "@/lib/normalize";
import type { EventItem } from "@/lib/types";

export const runtime = "nodejs"; // keep on Node for fetch limits

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city") || "Toronto";
    const keyword = searchParams.get("q") || "";

    const tmKey = process.env.TICKETMASTER_API_KEY!;
    const ebKey = process.env.EVENTBRITE_TOKEN!;
    const sgId = process.env.SEATGEEK_CLIENT_ID!;

    const tasks: Promise<EventItem[]>[] = [];

    if (tmKey) {
        const url =
            `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${tmKey}` +
            `&city=${encodeURIComponent(city)}&size=25&sort=date,asc${keyword ? `&keyword=${encodeURIComponent(keyword)}` : ""}`;
        tasks.push(safeFetch(url).then(mapTicketmaster).catch(() => []));
    }
    if (ebKey) {
        const url =
            `https://www.eventbriteapi.com/v3/events/search/?location.address=${encodeURIComponent(city)}` +
            `${keyword ? `&q=${encodeURIComponent(keyword)}` : ""}`;
        tasks.push(
            safeFetch(url, { headers: { Authorization: `Bearer ${ebKey}` } })
                .then(mapEventbrite)
                .catch(() => [])
        );
    }
    if (sgId) {
        const url =
            `https://api.seatgeek.com/2/events?client_id=${sgId}&venue.city=${encodeURIComponent(city)}` +
            `${keyword ? `&q=${encodeURIComponent(keyword)}` : ""}`;
        tasks.push(safeFetch(url).then(mapSeatGeek).catch(() => []));
    }

    const lists = await Promise.all(tasks);
    // Merge + de-dup by id:source
    const merged = [...lists.flat()];
    const seen = new Set<string>();
    const dedup = merged.filter(e => {
        const key = `${e.source}:${e.id}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });

    return NextResponse.json({ city, total: dedup.length, events: dedup });
}