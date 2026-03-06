import { useState } from 'react';
import { type Power } from '../utils/dataLoader.ts';
import { type SortConfig } from '../types/sorting.ts';

export const useSorting = (initialPowers: Power[]) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'name', direction: 'asc' });

  const sortedPowers = [...initialPowers].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    let compare = 0;
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      compare = aValue.localeCompare(bValue);
    } else if (typeof aValue === 'number' && typeof bValue === 'number') {
      compare = aValue - bValue;
    }

    return sortConfig.direction === 'asc' ? compare : -compare;
  });

  const requestSort = (key: keyof Power) => {
    setSortConfig((prevConfig) => ({
      ...prevConfig,
      key,
    }));
  };

  const setSortDirection = (direction: 'asc' | 'desc') => {
    setSortConfig((prevConfig) => ({
      ...prevConfig,
      direction,
    }));
  };

  return { sortedPowers, requestSort, sortConfig, setSortDirection };
};
