import { useState } from 'react';
import { type Power } from '../utils/dataLoader.ts';

interface Filters {
  rank?: string[];
  powerPoints?: number[];
  arcane_background?: string[];
  domain?: string[];
  duration?: string[];
}

export const useFilters = (initialPowers: Power[]) => {
  const [filters, setFilters] = useState<Filters>({});
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const filteredPowers = initialPowers.filter(power => {
    if (filters.rank && filters.rank.length > 0 && !filters.rank.includes(power.rank)) {
      return false;
    }

    if (filters.powerPoints && filters.powerPoints.length > 0 && !filters.powerPoints.includes(power.powerPoints)) {
      return false;
    }

    if (filters.arcane_background && filters.arcane_background.length > 0) {
      if (!filters.arcane_background.some(bg => power.arcane_background.includes(bg))) {
        return false;
      }
    }

    if (filters.domain && filters.domain.length > 0) {
      if (!filters.domain.some(dom => power.domain.includes(dom))) {
        return false;
      }
    }

    if (filters.duration && filters.duration.length > 0 && !filters.duration.includes(power.duration)) {
      return false;
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const powerName = power.name.toLowerCase();
      const description = power.description.toLowerCase();
      if (!powerName.includes(query) && !description.includes(query)) {
        return false;
      }
    }

    return true;
  });

  return { filters, handleFilterChange, searchQuery, handleSearchChange, filteredPowers };
};
