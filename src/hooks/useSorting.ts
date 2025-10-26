import { useState } from 'react';
import { type Power } from '../utils/dataLoader.ts';

interface SortConfig {
  key: keyof Power;
  direction: 'ascending' | 'descending';
}

export const useSorting = (initialPowers: Power[]) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'name', direction: 'ascending' });

  const sortedPowers = [...initialPowers].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    let compare = 0;
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      compare = aValue.localeCompare(bValue);
    } else if (typeof aValue === 'number' && typeof bValue === 'number') {
      compare = aValue - bValue;
    }

    return sortConfig.direction === 'ascending' ? compare : -compare;
  });

  const requestSort = (key: keyof Power) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { sortedPowers, requestSort, sortConfig };
};
