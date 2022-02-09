import React from 'react';
import { BasicDoc, HitsProvided } from 'react-instantsearch-core';
import { connectHits } from 'react-instantsearch-dom';

const Hits = ({ hits }: HitsProvided<BasicDoc>) => {
  if (!hits?.length) {
    return (
      <p className="text-sm text-gray-500">検索結果が見つかりませんでした</p>
    );
  }

  return (
    <ul className="space-y-2">
      {hits.map((hit) => (
        <li
          key={hit.objectID}
          className="p-4 rounded-md shadow bg-white flex gap-4 relative"
        >
          <div className="absolute top-2 right-2 text-sm text-gray-400">
            {hit.__position}
          </div>
          <div className="text-4xl">{hit.gender === 'male' ? '👨🏻' : '👩🏻'}</div>
          <div className="flex-1">
            <h3>{hit.name}</h3>
            <p className="text-sm text-gray-500">{hit.brand}</p>
            <p className="text-sm text-gray-500">{hit.objectID}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

const CustomHits = connectHits(Hits);

export default CustomHits;
