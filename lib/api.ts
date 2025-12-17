const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

if (!API_BASE) {
  throw new Error("NEXT_PUBLIC_API_BASE is not set in .env.local");
}

type FetchOptions = RequestInit & {
  next?: { revalidate?: number; tags?: string[] };
};

export async function apiFetch<T>(path: string, options: FetchOptions = {}) {
  const url = path.startsWith("http") ? path : `${API_BASE}${path}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API error ${res.status}: ${text || res.statusText}`);
  }

  return (await res.json()) as T;
}
