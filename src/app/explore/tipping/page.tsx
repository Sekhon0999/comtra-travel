import { tippingByCountry } from "@/lib/tipping";

export default function TippingPage() {
    const countries = Object.entries(tippingByCountry);
    return (
        <main className="p-6">
            <h1 className="text-3xl font-bold mb-6">Tipping Culture</h1>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {countries.map(([cc, info]) => (
                    <div key={cc} className="rounded-xl p-4 bg-gray-800 border border-gray-700">
                        <div className="font-semibold mb-1">{cc}</div>
                        <ul className="text-sm text-slate-300 space-y-1">
                            {info.restaurants && <li>Restaurants: {info.restaurants}</li>}
                            {info.taxis && <li>Taxis: {info.taxis}</li>}
                            {info.bars && <li>Bars: {info.bars}</li>}
                            {info.hotels && <li>Hotels: {info.hotels}</li>}
                            {info.notes && <li className="text-slate-400">{info.notes}</li>}
                        </ul>
                    </div>
                ))}
            </div>
        </main>
    );
}