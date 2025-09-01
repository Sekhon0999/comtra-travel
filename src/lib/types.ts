export type EventItem = {
    id: string;
    name: string;
    start: string;        // ISO
    venue?: string;
    city?: string;
    url: string;          // deep link to provider
    source: "ticketmaster" | "eventbrite" | "seatgeek";
};

export type FlightQuery = {
    from: string;         // IATA, e.g., YYZ
    to: string;           // IATA, e.g., LAX
    depart: string;       // YYYY-MM-DD
    return?: string;      // optional
    adults?: number;
};

export type FlightItem = {
    id: string;
    price: number;
    currency: string;
    duration: number;     // minutes
    legs: Array<{ from: string; to: string; depart: string; arrive: string; carrier: string }>;
    deeplink: string;     // provider deep link
};

export type HotelQuery = {
    city: string;         // city name
    checkIn: string;      // YYYY-MM-DD
    checkOut: string;     // YYYY-MM-DD
    adults?: number;
};

export type HotelItem = {
    id: string;
    name: string;
    price?: number;
    currency?: string;
    rating?: number;
    url: string;          // affiliate deep link (Travelpayouts)
    address?: string;
};