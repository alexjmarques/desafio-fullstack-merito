'use client';

import { fetcher } from '@/lib/api';
import useSWR from 'swr';

interface FundLite {
  id: number;
  ticker: string;
}

interface Transaction {
  id: number;
  date: string;
  tx_type: 'APORTE' | 'RESGATE';
  share_qty: number;
  amount: number;
  fund: FundLite;
}

export default function TransactionsTable({ initialData }: { initialData?: Transaction[] }) {
  const { data } = useSWR<Transaction[]>('/transactions', fetcher, {
    fallbackData: initialData,
  });

  if (!data) return <p className="text-zinc-500">Carregando…</p>;
  if (data.length === 0)
    return <p className="text-zinc-500">Ainda não há movimentações registradas.</p>;

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="min-w-full text-sm">
        <thead className="bg-zinc-100 text-left text-xs font-semibold uppercase tracking-wider">
          <tr>
            <th className="px-4 py-2">Data</th>
            <th className="px-4 py-2">Fundo</th>
            <th className="px-4 py-2">Tipo</th>
            <th className="px-4 py-2">Cotas</th>
            <th className="px-4 py-2">Valor&nbsp;(R$)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((tx: Transaction) => (
            <tr key={tx.id} className="border-t">
              <td className="px-4 py-2">
                {new Date(tx.date).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}
              </td>
              <td className="px-4 py-2">{tx.fund.ticker}</td>
              <td
                className={`px-4 py-2 font-medium ${
                  tx.tx_type === 'RESGATE' ? 'text-red-600' : 'text-green-600'
                }`}
              >
                {tx.tx_type}
              </td>
              <td className="px-4 py-2">{tx.share_qty}</td>
              <td className="px-4 py-2">{tx.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}