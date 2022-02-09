import React from 'react';
import { RefinementListProvided } from 'react-instantsearch-core';
import { connectRefinementList } from 'react-instantsearch-dom';

const RefinementList = ({ items, refine }: RefinementListProvided) => {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.label} className="flex items-center">
          <input
            checked={item.isRefined}
            type="checkbox"
            id={item.label}
            onChange={(e) => {
              refine(item.value);
            }}
            className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor={item.label} className="ml-3 text-sm text-gray-500">
            {item.label === 'male' ? '男性' : '女性'}({item.count})
          </label>
        </li>
      ))}
    </ul>
  );
};

const CustomRefinementList = connectRefinementList(RefinementList);

export default CustomRefinementList;
