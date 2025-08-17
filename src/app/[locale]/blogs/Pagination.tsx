"use client";
import React from "react";
import { Link } from "@/i18n/routing";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  baseUrl,
}) => {

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages around current page
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, currentPage + 2);

      // Adjust if we're near the beginning
      if (currentPage <= 3) {
        end = Math.min(totalPages, maxVisiblePages);
      }

      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        start = Math.max(1, totalPages - maxVisiblePages + 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  // Always show pagination, even for single page


  return (
    <div className="flex justify-center items-center space-x-2 mt-10">
      {/* Previous button */}
      {currentPage > 1 ? (
        <Link href={`${baseUrl}?page=${currentPage - 1}`}>
          <Button size="icon" variant="outline" className="w-10 h-10">
            <FaArrowLeft className="text-gray-500 w-5 h-5" />
          </Button>
        </Link>
      ) : (
        <Button size="icon" variant="outline" className="w-10 h-10" disabled>
          <FaArrowLeft className="text-gray-300 w-5 h-5" />
        </Button>
      )}

      {/* First page */}
      {pageNumbers[0] > 1 && (
        <>
          <Link
            href={`${baseUrl}?page=1`}
            className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 transition-colors duration-200"
          >
            1
          </Link>
          {pageNumbers[0] > 2 && (
            <span className="px-2 py-2 text-gray-500">...</span>
          )}
        </>
      )}

      {/* Page numbers */}
      {pageNumbers.map((page) =>
        page === currentPage ? (
          <span
            key={page}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-[#DBA426] text-white border border-[#DBA426] cursor-default"
          >
            {page}
          </span>
        ) : (
          <Link
            key={page}
            href={`${baseUrl}?page=${page}`}
            className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 transition-colors duration-200"
          >
            {page}
          </Link>
        )
      )}

      {/* Last page */}
      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
            <span className="px-2 py-2 text-gray-500">...</span>
          )}
          <Link
            href={`${baseUrl}?page=${totalPages}`}
            className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 transition-colors duration-200"
          >
            {totalPages}
          </Link>
        </>
      )}

      {/* Next button */}
      {currentPage < totalPages ? (
        <Link href={`${baseUrl}?page=${currentPage + 1}`}>
          <Button size="icon" variant="outline" className="w-10 h-10">
            <FaArrowRight className="text-gray-500 w-5 h-5" />
          </Button>
        </Link>
      ) : (
        <Button size="icon" variant="outline" className="w-10 h-10" disabled>
          <FaArrowRight className="text-gray-300 w-5 h-5" />
        </Button>
      )}
    </div>
  );
};

export default Pagination;
