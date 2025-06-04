"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className=" bg-gray-300 text-black justify-center items-center">
      <div className="mx-auto flex max-w-5xl items-center gap-3 p-3 justify-center">
        <Link href="/"className={`font-semibold rounded-md p-4 px-6 transition-colors duration-300 ${pathname === '/' ? 'bg-gray-600 text-white' : 'bg-white'}`}>
          <span className="text-sm">Dashboard</span>
        </Link>
        <Link href="/funds" className={`font-semibold rounded-md p-4 px-6 transition-colors duration-300 ${pathname === '/funds' ? 'bg-gray-600 text-white' : 'bg-white'}`}>
          <span className="text-sm">Fundos</span>
        </Link>
        <Link href="/transactions" className={`font-semibold rounded-md p-4 px-6 transition-colors duration-300 ${pathname === '/transactions' ? 'bg-gray-600 text-white' : 'bg-white'}`}>
          <span className="text-sm">Movimentações</span>
        </Link>
      </div>
    </nav>
  );
}