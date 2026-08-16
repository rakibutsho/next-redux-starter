import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalItem: number;
  limit: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination = ({
  currentPage,
  totalItem,
  limit,
  onPageChange,
  className,
}: PaginationProps) => {
  const totalPage = Math.ceil(totalItem / limit);
  const pageNumbers = [];

  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }

  // Don't render anything if there's only 1 page
  if (totalPage <= 1) return null;

  return (
    <div className={cn("flex justify-center items-center mt-8 mb-4 gap-2 text-sm", className)}>
      <button
        className="flex items-center gap-1 px-3 py-1.5 rounded-md transition-colors bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-100"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft size={16} />
        <span>Prev</span>
      </button>

      <div className="flex gap-1">
        {pageNumbers?.map((num) => (
          <button
            key={num}
            className={cn(
              "min-w-[32px] h-8 px-2 flex items-center justify-center rounded-md transition-colors border",
              currentPage === num
                ? "bg-[#A141FE] border-[#A141FE] text-white"
                : "border-gray-200 hover:border-[#A141FE] text-gray-700"
            )}
            onClick={() => onPageChange(num)}
          >
            {num}
          </button>
        ))}
      </div>

      <button
        className="flex items-center gap-1 px-3 py-1.5 rounded-md transition-colors bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-100"
        disabled={currentPage === totalPage}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <span>Next</span>
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
