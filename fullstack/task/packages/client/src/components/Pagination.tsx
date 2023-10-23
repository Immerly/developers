import React from 'react';

type PaginationProps = {
    currentPage: number,
    onNext: () => void
    onPrev: () => void
    total: number
}

const Pagination = ({ currentPage, onNext, onPrev, total }: PaginationProps) => {
  return (
    <div className="flex items-center justify-center mt-4">
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className="px-4 py-2 mr-2 bg-blue-500 text-white rounded"
      >
        Prev
      </button>
      <span className="mx-2">Page {currentPage}</span>
      <button
        disabled={currentPage === total}
        onClick={onNext}
        className="px-4 py-2 ml-2 bg-blue-500 text-white rounded"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
