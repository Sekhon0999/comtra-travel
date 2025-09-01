export const tippingByCountry: Record<string, {
    restaurants?: string;
    taxis?: string;
    bars?: string;
    hotels?: string;
    notes?: string;
}> = {
    US: { restaurants: "15–20%", taxis: "10–15%", bars: "$1 per drink or 15–20%", hotels: "$2–5 housekeeping", notes: "High tipping culture." },
    CA: { restaurants: "15–20%", taxis: "10–15%", bars: "$1 per drink", hotels: "$2–5 housekeeping", notes: "Similar to US." },
    GB: { restaurants: "Service included; otherwise ~12.5%", taxis: "Round up or 10%", bars: "No tipping in pubs", hotels: "£1–2 baggage", notes: "Varies by venue." },
    // Add more…
};