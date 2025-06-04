'use client';
import Loading from '@/components/Loading';
import NotFoundItens from '@/components/NotFoundItens';
import Pagination from '@/components/Pagination';
import TransactionForm from '@/components/TransactionForm';
import TransactionsTableFilter from '@/components/TransactionsTableFilter';
import { fetcher } from '@/lib/api';
import { useEffect, useState } from 'react';
import { FundLite, Transaction } from '../../interfaces';


export default function TransactionsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [txs, setTxs] = useState<Transaction[]>([]);
  const [funds, setFunds] = useState<FundLite[]>([]);
  const [transactionsItem, setTransactionsItem] = useState<Transaction | null>(null);
  const [open, setOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = txs?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handlefundId = (tx: Transaction) => {
    setTransactionsItem(tx);
    setOpen(true);
  }

  useEffect(() => {
    fetcher(`/transactions`).then(setTxs).finally(() => setIsLoading(false));
    fetcher(`/funds`).then(setFunds).finally(() => setIsLoading(false));
    setIsLoading(false);
  }, [txs]);

  return (
    <>
    {isLoading ? (
      <Loading />
    ) : (

    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Movimentações</h1>
        <button onClick={() => setOpen(true)} className="font-semibold rounded-md p-2 px-4 transition-colors duration-300 hover:bg-gray-600 hover:text-white cursor-pointer">+ Nova movimentação</button>
      </div>

      {txs && txs.length > 0 ? (
        <>
        <TransactionsTableFilter data={currentItems as Transaction[]} funds={funds} handlefundId={handlefundId} />
        <Pagination itemsPerPage={itemsPerPage} totalItems={txs.length} currentPage={currentPage} paginate={paginate} />
      </>
      ) : (
       <NotFoundItens />
      )}

      {open && funds && (
        <TransactionForm isOpen={open} setIsOpen={setOpen} onSaved={() => fetcher('/transactions')} transactionsItem={transactionsItem} />
      )}
    </>
    )}
    </>
  );
}
