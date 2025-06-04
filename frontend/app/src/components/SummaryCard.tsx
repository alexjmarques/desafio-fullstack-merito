export default function SummaryCard({ total, title, type }: { total: number, title: string, type: 'contribution' | 'redemption' }) {
    return (
      total > 0 && (
      <div className={`rounded-xl bg-white p-6 shadow border border-gray-200 w-full`}>
        <p className="text-sm text-zinc-500">{title}</p>
        <p className={`mt-1 text-3xl font-bold ${type === 'redemption' ? 'text-red-500' : ''}`}> {total ? total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'R$0.00'}</p>
      </div>
    )
  );
}