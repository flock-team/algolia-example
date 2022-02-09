import React from 'react';
import { connectPagination } from 'react-instantsearch-dom';

const Pagination = ({
  currentRefinement,
  nbPages,
  refine,
}: {
  currentRefinement: number;
  nbPages: number;
  refine: (value: number) => void;
}) => {
  return (
    <div className="flex justify-between">
      {currentRefinement > 1 && (
        <button
          onClick={() => refine(currentRefinement - 1)}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          前へ
        </button>
      )}
      {nbPages > currentRefinement && (
        <button
          onClick={() => refine(currentRefinement + 1)}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          次へ
        </button>
      )}
    </div>
  );
};

const CustomPagination = connectPagination(Pagination);

export default CustomPagination;
