import React from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@mui/material';
import { type Filters } from '../../../types/filters';

interface DomainFilterProps {
  filters: Filters;
  domains: string[];
  onFilterChange: (newFilters: Filters) => void;
}

const DomainFilter: React.FC<DomainFilterProps> = ({ filters, domains, onFilterChange }) => {
  const handleCheckboxChange = (domain: string) => {
    const currentDomains = filters.domain || [];
    let newDomains: string[];

    if (currentDomains.includes(domain)) {
      newDomains = currentDomains.filter(item => item !== domain);
    } else {
      newDomains = [...currentDomains, domain];
    }

    onFilterChange({ ...filters, domain: newDomains });
  };

  return (
    <Box mt={2}>
      <Typography variant="subtitle1">Domain</Typography>
      {domains.map(domain => (
        <FormControlLabel
          key={domain}
          control={
            <Checkbox
              checked={filters.domain?.includes(domain) || false}
              onChange={() => handleCheckboxChange(domain)}
            />
          }
          label={domain}
        />
      ))}
    </Box>
  );
};

export default DomainFilter;
