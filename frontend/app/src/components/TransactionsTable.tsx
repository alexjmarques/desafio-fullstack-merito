'use client';

import { fetcher } from '@/lib/api';
import { useEffect, useState } from 'react';
import { Fund, Transaction } from '../interfaces';
import { formatDate } from '../utils/formatData';



export default function TransactionsTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [funds, setFunds] = useState<Fund[]>([]);

  useEffect(() => {
    fetcher('/transactions').then((transactions) => {
      setTransactions(transactions);
    });
    fetcher('/funds').then((funds) => {
      setFunds(funds);
    });
  }, []);

  if (!transactions) return <p className="text-zinc-500">Carregando…</p>;
  if (transactions.length === 0)
    return <p className="text-zinc-500">Ainda não há movimentações registradas.</p>;

  const lastFourTransactions = transactions
  .slice()
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 4);

  return (
    <div className="overflow-hidden rounded-xl shadow bg-white w-full">
      <table className="w-full text-left">
        <thead className="bg-[#F3F3F3] text-sm">
          <tr>
            <th className="px-4 py-3 font-semibold text-black text-base">Data</th>
            <th className="px-4 py-3 font-semibold text-black text-base">Fundo</th>
            <th className="px-4 py-3 font-semibold text-black text-base">Tipo</th>
            <th className="px-4 py-3 font-semibold text-black text-base">Cotas</th>
            <th className="px-4 py-3 font-semibold text-black text-base">Valor&nbsp;(R$)</th>
          </tr>
        </thead>
        <tbody>
          {lastFourTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((tx: Transaction) => {
            const fund = funds?.find((f: Fund) => f.id === tx.fund_id);
            return (
              <tr key={tx.id} className="border-t border-gray-200 text-sm">
                <td className={`px-4 py-4 ${tx.tx_type === 'RESGATE' ? 'line-through' : ''}`}>
                  {formatDate(tx.date)}
                </td>
                <td className={`px-4 py-4 ${tx.tx_type === 'RESGATE' ? 'line-through' : ''}`}>{fund?.ticker ?? ''} - {fund?.name ?? ''}</td>
                <td
                  className={`px-4 py-2 font-medium ${
                    tx.tx_type === 'RESGATE' ? 'text-red-600 line-through' : 'text-green-600'
                  }`}
                >
                  {tx.tx_type}
                </td>
                <td className={`px-4 py-4 ${tx.tx_type === 'RESGATE' ? 'line-through' : ''}`}>{tx?.share_qty ?? ''}</td>
                <td className={`px-4 py-4 ${tx.tx_type === 'RESGATE' ? 'line-through' : ''}`}>{Number(tx?.amount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}