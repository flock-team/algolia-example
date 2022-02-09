import React from 'react';

const SearchResultItem = ({ hit }: any) => {
  return (
    <div className="py-2">
      <h2>{hit.name}</h2>
      <p className="text-sm text-gray-500">{hit.brand}</p>
    </div>
  );
};

export default SearchResultItem;
