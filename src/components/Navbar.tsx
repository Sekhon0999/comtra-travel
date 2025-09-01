import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center px-6 py-4 bg-purple-700 text-white">
            <h1 className="text-xl font-bold">Comtra Travel Hub</h1>
            <div className="space-x-6">
                <Link href="/">Home</Link>
                <Link href="/explore">Explore</Link>
            </div>
        </nav>
    );
}