import SummaryCard from '@/components/SummaryCard';
import TransactionsTable from '@/components/TransactionsTable';

async function getSummary() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wallet/summary`, { cache: 'no-store' });
  return res.json();
}

export default async function Dashboard() {
  const summary = await getSummary();
  console.log(summary);
  return (
    <>
      <SummaryCard total={summary.total_balance} />
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Últimas movimentações</h2>
        <TransactionsTable initialData={summary.funds} />
      </section>
    </>
  );
}
