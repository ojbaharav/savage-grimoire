import React from 'react';
import {
  Box,
  MenuItem,
  Chip,
  Typography,
} from '@mui/material';
import { type SelectChangeEvent } from '@mui/material/Select';
import { type Filters } from '../../../types/filters';
import CustomSelect from '../../CustomSelect';
import { getDisplayRank } from '../../../utils/ranks';

interface RankFilterProps {
  filters: Filters;
  ranks: string[];
  onFilterChange: (newFilters: Filters) => void;
}

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
              {selected.map(value => {
                const [rankDisplay] = getDisplayRank(value);
                return <Chip key={value} label={rankDisplay} />
              })}
            </Box>
          );
        }}
      >
        {ranks.map(rank => {
          const [rankDisplay, initial] = getDisplayRank(rank);
          return (
            <MenuItem key={rank} value={rank}>
              <Box aria-hidden='true' sx={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '0.875rem',
                mr: 1.5
              }}>
                {initial}
              </Box>
              <Typography>{rankDisplay}</Typography>
            </MenuItem>
          )
        })}
      </CustomSelect>
    </Box>
  );
};

export default RankFilter;
