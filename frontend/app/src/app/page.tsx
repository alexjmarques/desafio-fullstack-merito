"use client";

import Loading from '@/components/Loading';
import SummaryCard from '@/components/SummaryCard';
import TransactionsTable from '@/components/TransactionsTable';
import { fetcher } from '@/lib/api';
import { useEffect, useState } from 'react';
import { WalletSummary } from '../interfaces';


export default function Dashboard() {
  const [summary, setSummary] = useState<WalletSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetcher(`/wallet/summary`).then(setSummary).finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col h-full justify-items-start items-start">
        <div className="w-full flex flex-row items-center justify-start gap-4 mt-4">

          <SummaryCard total={summary?.total_contributions ?? 0} title="Investimento total" type="contribution" />
          <SummaryCard total={summary?.total_balance ?? 0} title="Aportes" type="contribution" />
          <SummaryCard total={summary?.total_redemptions ?? 0} title="Resgates" type="redemption" />
        </div>
          <div className="w-full flex flex-col items-start justify-start mt-4">
            <h2 className="mb-4 text-xl font-semibold">Últimas movimentações</h2>
            {summary?.funds && <TransactionsTable />}
          </div>
        </div>
      )}
    </>
  );
}
