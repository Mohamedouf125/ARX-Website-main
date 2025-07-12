'use client';

import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage = 2,
  totalPages = 15,
  onPageChange = () => { }
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="w-full flex justify-center items-center py-12 px-4">
      <div className="inline-flex items-center gap-1">
        <button
          onClick={() => handlePageChange(1)}
          className="h-10 px-3 flex items-center justify-center text-gray-600 hover:text-black"
        >
          <span className="mr-1">«</span>
          <span>First</span>
        </button>

        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-10 px-3 flex items-center justify-center text-gray-600 hover:text-black"
        >
          <span className="mr-1">‹</span>
          <span>Back</span>
        </button>

        {/* Show the first page */}
        <button
          onClick={() => handlePageChange(1)}
          className={`h-[clamp(25px,2.083vw,40px)] w-[clamp(25px,2.083vw,40px)] flex items-center justify-center rounded-md ${currentPage === 1 ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
        >
          1
        </button>

        {/* Current page and surrounding pages */}
        {currentPage > 3 && (
          <button className="h-[clamp(25px,2.083vw,40px)] w-[clamp(25px,2.083vw,40px)] flex items-center justify-center text-gray-600">
            ...
          </button>
        )}

        {currentPage > 2 && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="h-[clamp(25px,2.083vw,40px)] w-[clamp(25px,2.083vw,40px)] flex items-center justify-center rounded-md text-gray-600 hover:bg-gray-100"
          >
            {currentPage - 1}
          </button>
        )}

        {currentPage !== 1 && currentPage !== totalPages && (
          <button
            onClick={() => handlePageChange(currentPage)}
            className="h-[clamp(25px,2.083vw,40px)] w-[clamp(25px,2.083vw,40px)] flex items-center justify-center rounded-md bg-black text-white"
          >
            {currentPage}
          </button>
        )}

        {currentPage < totalPages - 1 && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="h-[clamp(25px,2.083vw,40px)] w-[clamp(25px,2.083vw,40px)] flex items-center justify-center rounded-md text-gray-600 hover:bg-gray-100"
          >
            {currentPage + 1}
          </button>
        )}

        {currentPage < totalPages - 2 && (
          <button className="h-[clamp(25px,2.083vw,40px)] w-[clamp(25px,2.083vw,40px)] flex items-center justify-center text-gray-600">
            ...
          </button>
        )}

        {/* Show the last page */}
        <button
          onClick={() => handlePageChange(totalPages)}
          className={`h-[clamp(25px,2.083vw,40px)] w-[clamp(25px,2.083vw,40px)] flex items-center justify-center rounded-md ${currentPage === totalPages ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
        >
          {totalPages}
        </button>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-10 px-3 flex items-center justify-center text-gray-600 hover:text-black"
        >
          <span>Next</span>
          <span className="ml-1">›</span>
        </button>
      </div>
    </div>
  );
};

export default Pagination;