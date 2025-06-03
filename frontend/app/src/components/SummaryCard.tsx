export default function SummaryCard({ total }: { total: number }) {
    return (
      <div className="rounded-xl bg-white p-6 shadow">
        <p className="text-sm text-zinc-500">Saldo total da carteira</p>
        <p className="mt-1 text-3xl font-bold">R$ {total ? total.toFixed(2) : '0.00'}</p>
      </div>
    );
  }