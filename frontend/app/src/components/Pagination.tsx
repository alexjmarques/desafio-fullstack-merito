import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-end items-center p-4 border-t border-gray-200 gap-1">
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-2 py-1 rounded ${
          currentPage === 1
            ? "opacity-40 cursor-not-allowed"
            : "hover:bg-gray-700"
        }`}
      >
        <AiOutlineLeft
          className={`h-5 w-5 ${
            currentPage === 1 ? "text-gray-400" : "text-black hover:fill-white"
          }`}
        />
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`px-3 py-1 rounded text-sm font-medium cursor-pointer ${
            number === currentPage
              ? "bg-black text-white"
              : "bg-white text-black hover:bg-gray-100"
          }`}
        >
          {number}
        </button>
      ))}

      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-2 py-1 rounded ${
          currentPage === totalPages
            ? "opacity-40 cursor-not-allowed"
            : "hover:bg-gray-700"
        }`}
      >
        <AiOutlineRight
          className={`h-5 w-5 ${
            currentPage === totalPages
              ? "text-gray-400"
              : "text-black hover:fill-white"
          }`}
        />
      </button>
    </div>
  );
};

export default Pagination;
