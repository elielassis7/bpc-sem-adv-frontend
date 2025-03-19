import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationButtonsProps {
  orderPrevious: number;
  orderNext: number;
  maxOrder: number;
  navigate: (path: string) => void;
}

export function NavigationButtons({
  orderPrevious,
  orderNext,
  maxOrder,
  navigate,
}: NavigationButtonsProps) {

  // const canProceed = stepProgress?.completed

  return (
    <div className="flex flex-row items-center justify-center mt-10 mb-5 gap-6">
      {orderPrevious === 0 ? (
        <button
          type="button"
          className="flex items-center bg-gray-500 px-4 py-2 gap-1 rounded cursor-not-allowed text-white"
        >
          <ChevronLeft />
          Anterior
        </button>
      ) : (
        <button
          type="button"
          tabIndex={13}
          onClick={() => navigate(`/step/${orderPrevious}`)}
          className="flex items-center group px-4 py-2 gap-1 rounded cursor-pointer text-white active:scale-95 bg-green-600 hover:bg-green-500 focus:outline-none focus:border-2 focus:border-yellow-400"
        >
          <ChevronLeft className="group-hover:-translate-x-2 duration-300" />
          Anterior
        </button>
      )}

      {orderNext > maxOrder ? (
        <button
          type="button"
          className="flex items-center bg-gray-500 px-4 py-2 gap-1 rounded cursor-not-allowed text-white"
        >
          Próximo
          <ChevronRight />
        </button>
      ) : (
        <button
          type="button"
          tabIndex={14}
          // disabled={!canProceed}
          onClick={() => navigate(`/step/${orderNext}`)}
          className="flex items-center group px-4 py-2 gap-1 rounded cursor-pointer text-white active:scale-95 bg-green-600 hover:bg-green-500 focus:outline-none focus:border-2 focus:border-yellow-400"
        >
          Próximo
          <ChevronRight className="group-hover:translate-x-2 duration-300" />
        </button>
      )}
    </div>
  );
}
