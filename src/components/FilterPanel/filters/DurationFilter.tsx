import React from 'react';
import {
  Box,
  Chip,
  MenuItem,
} from '@mui/material';
import { type SelectChangeEvent } from '@mui/material/Select';
import { type Filters } from '../../../types/filters';
import CustomSelect from '../../CustomSelect';

interface DurationFilterProps {
  filters: Filters;
  durations: string[];
  onFilterChange: (newFilters: Filters) => void;
}

const DurationFilter: React.FC<DurationFilterProps> = ({ filters, durations, onFilterChange }) => {
  const handleDurationChange = (event: SelectChangeEvent<string[]>) => {
    const { value } = event.target;
    const newValues = typeof value === 'string' ? value.split(',') : value;

    onFilterChange({ ...filters, duration: newValues });
  };


  return (
    <Box mt={2}>
      <CustomSelect
        labelId="duration-select-label"
        id="duration-select"
        multiple
        value={filters.duration?.length ? filters.duration : []}
        onChange={handleDurationChange}
        label="Duration"
        renderValue={selected => {
          if (selected.length === 0) {
            return undefined; // This makes the InputLabel act as a placeholder when nothing is selected
          }
          return (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map(value => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )
        }}
      >
        {durations.map(duration => (
          <MenuItem key={duration} value={duration}>
            {duration}
          </MenuItem>
        ))}
      </CustomSelect>
    </Box>
  );
};

export default DurationFilter;
