const isServer = typeof window === 'undefined';

const base = isServer
  ? process.env.INTERNAL_API_URL
  : process.env.NEXT_PUBLIC_API_URL!;

export const fetcher = (url: string) => fetch(base + url).then(r => r.json());

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const post = (url: string, body: any) =>
  fetch(base + url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then(r => {
    if (!r.ok) throw Error('Erro');
    return r.json();
  });
