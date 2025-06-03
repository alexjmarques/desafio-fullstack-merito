'use client';
import TransactionForm from '@/components/TransactionForm';
import { fetcher } from '@/lib/api';
import { useState } from 'react';
import useSWR from 'swr';

interface Transaction {
  id: number;
  date: string;
  tx_type: string;
  fund: { ticker: string };
  share_qty: number;
  amount: number;
}

export default function TransactionsPage() {
  const { data: txs, mutate } = useSWR('/transactions', fetcher);
  const { data: funds } = useSWR('/funds', fetcher);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Movimentações</h1>
        <button onClick={() => setOpen(true)} className="btn-primary">+ Nova</button>
      </div>

      {txs && (
        <table className="w-full border">
          <thead className="bg-zinc-100 text-left">
            <tr><th>Data</th><th>Tipo</th><th>Fundo</th><th>Cotas</th><th>Valor (R$)</th></tr>
          </thead>
          <tbody>
            {txs.map((t: Transaction) => (
              <tr key={t.id} className="border-t">
                <td>{t.date}</td><td>{t.tx_type}</td><td>{t.fund.ticker}</td>
                <td>{t.share_qty}</td><td>{Number(t.amount).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {open && funds && (
        <TransactionForm funds={funds} onClose={() => setOpen(false)} onSaved={() => mutate()} />
      )}
    </>
  );
}
