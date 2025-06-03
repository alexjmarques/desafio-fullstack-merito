import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-zinc-800 text-white">
      <div className="mx-auto flex max-w-5xl items-center gap-6 p-4">
        <Link href="/" className="font-semibold">Dashboard</Link>
        <Link href="/funds">Fundos</Link>
        <Link href="/transactions">Movimentações</Link>
      </div>
    </nav>
  );
}