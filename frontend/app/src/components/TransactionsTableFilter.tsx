'use client';

import { FundLite, Transaction } from '../interfaces';
import { formatDate } from '../utils/formatData';

export default function TransactionsTableFilter({ data, funds, handlefundId }: { data: Transaction[], funds: FundLite[], handlefundId: (t: Transaction) => void }) {

  return (
    <div className="overflow-hidden rounded-xl shadow bg-white">
          <table className="w-full text-left">
            <thead className="bg-[#F3F3F3] text-sm">
              <tr>
                <th className="px-4 py-3 font-semibold text-black text-base">Data</th>
                <th className="px-4 py-3 font-semibold text-black text-base">Tipo</th>
                <th className="px-4 py-3 font-semibold text-black text-base">Fundo</th>
                <th className="px-4 py-3 font-semibold text-black text-base">Cotas</th>
                <th className="px-4 py-3 font-semibold text-black text-base">Valor (R$)</th>
                <th className="px-4 py-3 font-semibold text-black text-base">Ações</th>

              </tr>
            </thead>
            <tbody>
              {data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((t: Transaction) => {
                const fund = funds?.find((f: FundLite) => f.id === t.fund_id);
              return (
                <tr key={t.id} className={`border-t border-gray-200 text-sm`}>
                  <td className={`px-4 py-4 ${t.tx_type === 'RESGATE' ? 'line-through' : ''}`}>{formatDate(t.date)}</td>
                  <td className={`px-4 py-4 ${t.tx_type === 'RESGATE' ? 'text-red-600 line-through' : 'text-green-600'}`}>{t.tx_type}</td>
                  <td className={`px-4 py-4 ${t.tx_type === 'RESGATE' ? 'line-through' : ''}`}>{fund?.ticker ?? ''} - {fund?.name ?? ''}</td>
                  <td className={`px-4 py-4 ${t.tx_type === 'RESGATE' ? 'line-through' : ''}`}>{t?.share_qty ?? ''}</td>
                  <td className={`px-4 py-4 ${t.tx_type === 'RESGATE' ? 'line-through' : ''}`}>{Number(t.amount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>

                  <td className="px-4 py-4 gap-1 flex items-center">
                    {t.tx_type === 'APORTE' && (
                      <button onClick={() => handlefundId(t)} className="font-semibold rounded-md p-2 transition-colors duration-300 hover:bg-blue-600 hover:text-white cursor-pointer">Resgatar</button>
                    )}

                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
  );
}