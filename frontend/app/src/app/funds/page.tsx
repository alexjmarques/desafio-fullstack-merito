'use client';
import FundForm from '@/components/FundForm';
import { fetcher } from '@/lib/api';
import { useState } from 'react';
import useSWR from 'swr';

interface Fund {
  id: number;
  name: string;
  ticker: string;
  fund_type: string;
  share_value: number;
}

export default function FundsPage() {
  const { data: funds, mutate } = useSWR('/funds', fetcher);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Fundos cadastrados</h1>
        <button onClick={() => setOpen(true)} className="btn-primary">+ Novo</button>
      </div>

      {funds && (
        <table className="w-full border">
          <thead className="bg-zinc-100 text-left">
            <tr><th>Nome</th><th>Ticker</th><th>Tipo</th><th>Cota (R$)</th></tr>
          </thead>
          <tbody>
            {funds.map((f: Fund) => (
              <tr key={f.id} className="border-t">
                <td>{f.name}</td><td>{f.ticker}</td><td>{f.fund_type}</td><td>{Number(f.share_value).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {open && <FundForm onClose={() => setOpen(false)} onSaved={() => mutate()} />}
    </div>
  );
}
