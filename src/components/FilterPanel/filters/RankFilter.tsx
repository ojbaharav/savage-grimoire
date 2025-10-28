import React from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@mui/material';
import { type Filters } from '../../../types/filters';

interface RankFilterProps {
  filters: Filters;
  ranks: string[];
  onFilterChange: (newFilters: Filters) => void;
}

const RankFilter: React.FC<RankFilterProps> = ({ filters, ranks, onFilterChange }) => {
  const handleCheckboxChange = (rank: string) => {
    const currentRanks = filters.rank || [];
    let newRanks: string[];

    if (currentRanks.includes(rank)) {
      newRanks = currentRanks.filter(item => item !== rank);
    } else {
      newRanks = [...currentRanks, rank];
    }

    onFilterChange({ ...filters, rank: newRanks });
  };

  return (
    <Box mt={2}>
      <Typography variant="subtitle1">Rank</Typography>
      {ranks.map(rank => (
        <FormControlLabel
          key={rank}
          control={
            <Checkbox
              checked={filters.rank?.includes(rank) || false}
              onChange={() => handleCheckboxChange(rank)}
            />
          }
          label={rank}
        />
      ))}
    </Box>
  );
};

export default RankFilter;
