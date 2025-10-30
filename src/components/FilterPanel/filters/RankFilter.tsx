import React from 'react';
import {
  Box,
  MenuItem,
  Chip,
} from '@mui/material';
import { type SelectChangeEvent } from '@mui/material/Select';
import { type Filters } from '../../../types/filters';
import CustomSelect from '../../CustomSelect';

interface RankFilterProps {
  filters: Filters;
  ranks: string[];
  onFilterChange: (newFilters: Filters) => void;
}

const getDisplayRank = (fullRank: string): string => {
  const match = fullRank.match(/\(.*?\)\s*(.*)/);
  return match ? match[1] : fullRank;
};

const RankFilter: React.FC<RankFilterProps> = ({ filters, ranks, onFilterChange }) => {
  const handleRankChange = (event: SelectChangeEvent<string[]>) => {
    const { value } = event.target;
    const newValues = typeof value === 'string' ? value.split(',') : value;
    
    const uniqueValues = Array.from(new Set(newValues.filter(v => v !== '')));

    onFilterChange({ ...filters, rank: uniqueValues });
  };

  return (
    <Box mt={2}>
      <CustomSelect
        labelId="rank-select-label"
        id="rank-select"
        multiple
        value={filters.rank || []}
        onChange={handleRankChange}
        label="Rank"
        renderValue={selected => {
          if (selected.length === 0) {
            return undefined; // This makes the InputLabel act as a placeholder when nothing is selected
          }
          return (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map(value => (
                <Chip key={value} label={getDisplayRank(value)} />
              ))}
            </Box>
          );
        }}
      >
        {ranks.map(rank => (
          <MenuItem key={rank} value={rank}>
            {getDisplayRank(rank)}
          </MenuItem>
        ))}
      </CustomSelect>
    </Box>
  );
};

export default RankFilter;
