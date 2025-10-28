import React from 'react';
import {
  Box,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { type SelectChangeEvent } from '@mui/material/Select';
import { type Filters } from '../../../types/filters';

interface DurationFilterProps {
  filters: Filters;
  durations: string[];
  onFilterChange: (newFilters: Filters) => void;
}

const DurationFilter: React.FC<DurationFilterProps> = ({ filters, durations, onFilterChange }) => {
  const handleDurationChange = (event: SelectChangeEvent<string[]>) => {
    const { value } = event.target;
    const newValues = typeof value === 'string' ? value.split(',') : value;

    if (newValues.includes('Any')) {
      const lastSelectedItem = newValues[newValues.length - 1];
      
      if (lastSelectedItem === 'Any') {
        onFilterChange({ ...filters, duration: [] });
      } else {
        onFilterChange({ ...filters, duration: newValues.filter(v => v !== 'Any') });
      }
    } else {
      onFilterChange({ ...filters, duration: newValues });
    }
  };

  const durationOptions = ['Any', ...durations];

  return (
    <Box mt={2}>
      <FormControl fullWidth>
        <InputLabel>Duration</InputLabel>
        <Select
          multiple
          value={filters.duration?.length ? filters.duration : ['Any']}
          onChange={handleDurationChange}
          renderValue={selected => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {(selected.length === 0 || (selected.length === 1 && selected[0] === 'Any')) 
                ? <Chip key="any" label="Any" /> 
                : selected.filter(val => val !== 'Any').map(value => (
                    <Chip key={value} label={value} />
                  ))
              }
            </Box>
          )}
        >
          {durationOptions.map(duration => (
            <MenuItem key={duration} value={duration}>
              {duration}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DurationFilter;
