import React from 'react';
import {
  Box,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { type Filters, type FilterOptions } from '../../types/filters';
import RankFilter from './filters/RankFilter';
import DomainFilter from './filters/DomainFilter';
import DurationFilter from './filters/DurationFilter';
import ArcaneBackgroundFilter from './filters/ArcaneBackgroundFilter';
import type { Power } from '../../utils/dataLoader.ts';
import { type SortConfig } from '../../types/sorting.ts';
import ThemeToggle from '../ThemeToggle/index.tsx';

interface FilterPanelProps {
  filters: Filters;
  onFilterChange: (newFilters: Filters) => void;
  filterOptions: FilterOptions;
  requestSort: (key: keyof Power) => void;
  sortConfig: SortConfig;
  setSortDirection: (direction: 'asc' | 'desc') => void;
  isDarkMode: boolean;
  onToggle: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  filterOptions,
  requestSort,
  sortConfig,
  setSortDirection,
  isDarkMode,
  onToggle,
}) => {
  const { ranks, arcaneBackgrounds, domains, durations } = filterOptions;

  return (
    <Box>
      <Typography variant="h6">Filters</Typography>
      <Divider />
      <RankFilter filters={filters} ranks={ranks} onFilterChange={onFilterChange} />
      <DurationFilter filters={filters} durations={durations} onFilterChange={onFilterChange} />
      <ArcaneBackgroundFilter
        filters={filters}
        arcaneBackgrounds={arcaneBackgrounds}
        onFilterChange={onFilterChange}
      />
      <DomainFilter filters={filters} domains={domains} onFilterChange={onFilterChange} />
      <Typography variant="h6" sx={{ mt: 2 }}>
        Sort by
      </Typography>
      <Divider />
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>Field</InputLabel>
        <Select
          value={sortConfig.key}
          label="Field"
          onChange={(e) => requestSort(e.target.value as keyof Power)}
        >
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="rank">Rank</MenuItem>
          <MenuItem value="powerPoints">PP</MenuItem>
          <MenuItem value="range">Range</MenuItem>
          <MenuItem value="duration">Duration</MenuItem>
        </Select>
      </FormControl>
      <FormControl component="fieldset" sx={{ mt: 1 }}>
        <RadioGroup
          row
          aria-label="direction"
          name="direction"
          value={sortConfig.direction}
          onChange={(e) => setSortDirection(e.target.value as 'asc' | 'desc')}
        >
          <FormControlLabel value="asc" control={<Radio />} label="Ascending" />
          <FormControlLabel value="desc" control={<Radio />} label="Descending" />
        </RadioGroup>
      </FormControl>
      <Divider sx={{ marginTop: '15px' }} />
      <Box sx={{ mt: 2 }}>
        <ThemeToggle onToggle={onToggle} isDarkMode={isDarkMode} />
      </Box>
    </Box>
  );
};

export default FilterPanel;
