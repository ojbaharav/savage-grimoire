import React from 'react';
import {
  Box,
  Chip,
  MenuItem,
  Typography,
} from '@mui/material';
import { type SelectChangeEvent } from '@mui/material/Select';
import { type Filters } from '../../../types/filters';
import CustomSelect from '../../CustomSelect';

interface DomainFilterProps {
  filters: Filters;
  domains: string[];
  onFilterChange: (newFilters: Filters) => void;
}

const DomainFilter: React.FC<DomainFilterProps> = ({ filters, domains, onFilterChange }) => {
  const handleDomainChange = (event: SelectChangeEvent<string[]>) => {
    const { value } = event.target;
    const newValues = typeof value === 'string' ? value.split(',') : value;

    onFilterChange({ ...filters, domain: newValues });
  };

  return (
    <Box mt={2}>
      <CustomSelect
        labelId="domain-select-label"
        id="domain-select"
        multiple
        value={filters.domain?.length ? filters.domain : []}
        onChange={handleDomainChange}
        label="Domain"
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
        {domains.map(domain => (
          <MenuItem key={domain} value={domain}>
            {domain}
          </MenuItem>
        ))}
      </CustomSelect>
    </Box>
  );
};

export default DomainFilter;
