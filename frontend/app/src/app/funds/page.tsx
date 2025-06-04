'use client';
import FundForm from '@/components/FundForm';
import Loading from '@/components/Loading';
import NotFoundItens from '@/components/NotFoundItens';
import Pagination from '@/components/Pagination';
import { deleteItem, fetcher } from '@/lib/api';
import { useEffect, useState } from 'react';
import { MdDelete, MdOutlineEdit } from 'react-icons/md';
import { Fund } from '../../interfaces';



export default function FundsPage() {
  const [funds, setFunds] = useState<Fund[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editFund, setEditFund] = useState<Fund | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = funds?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  async function handleDelete(id: number) {
    try {
      await deleteItem(`/funds/${id}`);
      const data = await fetcher('/funds');
      setFunds(data.sort((a: Fund, b: Fund) => (b.id ?? 0) - (a.id ?? 0)));

      const totalPages = Math.ceil(data.length / itemsPerPage);
      if (currentPage > totalPages) {
        setCurrentPage(totalPages);
      }

    } catch (error) {
      console.error("Erro ao deletar fundo:", error);
    }
  }

  function handleEdit(fund: Fund) {
    setEditFund(fund);
    setOpen(true);
  }

  useEffect(() => {
    fetcher(`/funds`).then((data: Fund[]) => {
      setFunds(data.sort((a: Fund, b: Fund) => (b.id ?? 0) - (a.id ?? 0)));
    }).finally(() => setIsLoading(false));
  }, []);

  return (
    <>
    {isLoading ? (
      <Loading />
    ) : (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Fundos cadastrados</h1>
        <button onClick={() => setOpen(true)} className="font-semibold rounded-md p-2 px-4 transition-colors duration-300 hover:bg-gray-600 hover:text-white cursor-pointer">+ Novo</button>
      </div>

      {funds && funds.length > 0 ? (
        <>
        <div className="overflow-hidden rounded-xl shadow bg-white">
          <table className="w-full text-left">
            <thead className="bg-[#F3F3F3] text-sm">
              <tr>
                <th className="px-4 py-3 font-semibold text-black text-base">Código</th>
                <th className="px-4 py-3 font-semibold text-black text-base">Nome</th>
                <th className="px-4 py-3 font-semibold text-black text-base">Tipo</th>
                <th className="px-4 py-3 font-semibold text-black text-base">Cota (R$)</th>
                <th className="px-4 py-3 font-semibold text-black text-base">Ações</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((f: Fund) => (
                <tr key={f.id} className="border-t border-gray-200 text-sm">
                  <td className="px-4 py-4">{f.ticker}</td>
                  <td className="px-4 py-4">{f.name}</td>
                  <td className="px-4 py-4">{f.fund_type}</td>
                  <td className="px-4 py-4">{Number(f.share_value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                  <td className="px-4 py-4 gap-1 flex items-center">
                    <button onClick={() => handleEdit(f)} className="font-semibold rounded-md p-2 transition-colors duration-300 hover:bg-blue-600 hover:text-white cursor-pointer"><MdOutlineEdit /></button>
                    <button onClick={() => handleDelete(f.id ?? 0)} className="font-semibold rounded-md p-2 transition-colors duration-300 hover:bg-red-600 hover:text-white cursor-pointer"><MdDelete /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
          <Pagination itemsPerPage={itemsPerPage} totalItems={funds.length} currentPage={currentPage} paginate={paginate} />
        </>
      ) : (
        <NotFoundItens />
      )}

      {open && (
        <FundForm
          onClose={() => {
            setOpen(false);
            setEditFund(null);
          }}
          onSaved={async () => {
            const data = await fetcher('/funds');
            setFunds(data.sort((a: Fund, b: Fund) => (b.id ?? 0) - (a.id ?? 0)));
            setCurrentPage(1);
          }}
          isOpen={open}
          setIsOpen={setOpen}
          fund={editFund}
        />
      )}
    </div>
    )}
    </>
  );
}
