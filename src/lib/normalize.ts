import type { EventItem, FlightItem } from "./types";

// Ticketmaster
export function mapTicketmaster(json: any): EventItem[] {
    const events = json?._embedded?.events ?? [];
    return events.map((e: any) => ({
        id: e.id,
        name: e.name,
        start: e.dates?.start?.dateTime ?? e.dates?.start?.localDate ?? "",
        venue: e._embedded?.venues?.[0]?.name,
        city: e._embedded?.venues?.[0]?.city?.name,
        url: e.url,
        source: "ticketmaster" as const,
    }));
}

// Eventbrite
export function mapEventbrite(json: any): EventItem[] {
    const events = json?.events ?? [];
    return events.map((e: any) => ({
        id: e.id,
        name: e.name?.text ?? "",
        start: e.start?.utc ?? "",
        venue: undefined,
        city: undefined,
        url: e.url,
        source: "eventbrite" as const,
    }));
}

// SeatGeek
export function mapSeatGeek(json: any): EventItem[] {
    const events = json?.events ?? [];
    return events.map((e: any) => ({
        id: String(e.id),
        name: e.short_title || e.title,
        start: e.datetime_utc,
        venue: e.venue?.name,
        city: e.venue?.city,
        url: e.url,
        source: "seatgeek" as const,
    }));
}

// Kiwi flights (Tequila)
export function mapKiwi(json: any): FlightItem[] {
    const data = json?.data ?? [];
    return data.map((it: any) => ({
        id: it.id,
        price: it.price,
        currency: it.currency || "USD",
        duration: it.duration?.total ?? 0,
        legs: (it.route || []).map((r: any) => ({
            from: r.flyFrom,
            to: r.flyTo,
            depart: r.utc_departure,
            arrive: r.utc_arrival,
            carrier: r.airline,
        })),
        deeplink: it.deep_link, // Tequila provides ready deep links
    }));
}