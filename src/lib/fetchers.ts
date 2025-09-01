const TIMEOUT = 12000;

export async function safeFetch(url: string, init?: RequestInit) {
    const ctrl = new AbortController();
    const id = setTimeout(() => ctrl.abort(), TIMEOUT);
    try {
        const res = await fetch(url, { ...init, signal: ctrl.signal, cache: "no-store" });
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        return res.json();
    } finally {
        clearTimeout(id);
    }
}