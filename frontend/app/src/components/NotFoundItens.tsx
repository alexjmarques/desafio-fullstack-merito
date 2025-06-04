import { BsExclamationTriangle } from "react-icons/bs";

const NotFoundItens = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 p-8">
        <BsExclamationTriangle className="text-gray-500 text-5xl" />
        <p className="text-gray-500 text-lg">
          Não há movimentações disponíveis.
        </p>
       </div>
  );
};

export default NotFoundItens;