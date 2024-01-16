import { useCallback, useState } from 'react';

interface Pagination {
  currentPage: number;
  nextPage: () => void;
  prevPage: () => void;
  totalPages: number;
  updateTotalPages: (totalItems: number) => void;
}

const usePagination = (initialPage: number = 1, itemsPerPage: number = 10): Pagination => {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number>(1);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const updateTotalPages = useCallback((totalItems: number) => {
    setTotalPages(Math.ceil(totalItems / itemsPerPage));
  }, [itemsPerPage]);

  return {
    nextPage,
    prevPage,
    totalPages,
    currentPage,
    updateTotalPages
  };
};

export default usePagination;
