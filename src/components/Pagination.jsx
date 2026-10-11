import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  // Generate page numbers array
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav
      aria-label="التنقل بين الصفحات"
      className="flex flex-wrap items-center justify-center gap-2 mt-12 py-4"
    >
      {/* Previous Button (In RTL, Next icon ChevronRight points to the right which is previous in Arabic) */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 font-medium text-sm flex items-center gap-1 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer"
      >
        <ChevronRight className="w-4 h-4" />
        <span>السابق</span>
      </button>

      {/* Number Buttons */}
      <div className="flex items-center gap-1.5">
        {pages.map((page) => {
          const isActive = page === currentPage;
          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              aria-current={isActive ? 'page' : undefined}
              className={`w-10 h-10 rounded-xl text-sm font-bold transition-all shadow-xs cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/25 scale-105'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-300'
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 font-medium text-sm flex items-center gap-1 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer"
      >
        <span>التالي</span>
        <ChevronLeft className="w-4 h-4" />
      </button>
    </nav>
  );
}
