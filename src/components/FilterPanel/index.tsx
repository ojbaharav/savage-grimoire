import React, { useState } from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  Divider,
  Chip,
  useMediaQuery,
  Button,
  Collapse,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface Filters {
  rank?: string[];
  powerPoints?: number[];
  arcane_background?: string[];
  domain?: string[];
}

interface FilterOptions {
  ranks: string[];
  powerPoints: number[];
  arcaneBackgrounds: string[];
  domains: string[];
}

interface FilterPanelProps {
  filters: Filters;
  onFilterChange: (newFilters: Filters) => void;
  filterOptions: FilterOptions;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange, filterOptions }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isExpanded, setIsExpanded] = useState(!isMobile);

  const { ranks, powerPoints, arcaneBackgrounds, domains } = filterOptions;

  const handleCheckboxChange = (group: keyof Filters, value: string | number) => {
    const newFilters = { ...filters };
    if (!newFilters[group]) {
      newFilters[group] = [];
    }

    if (newFilters[group]!.includes(value as never)) {
      newFilters[group] = newFilters[group]!.filter(item => item !== value);
    } else {
      newFilters[group]!.push(value as never);
    }

    onFilterChange(newFilters);
  };

  return (
    <Box>
      {isMobile && (
        <Button onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? 'Hide Filters' : 'Show Filters'}
        </Button>
      )}
      <Collapse in={isExpanded}>
        <Typography variant="h6">Filters</Typography>
        <Divider />
        <Box mt={2}>
          <Typography variant="subtitle1">Rank</Typography>
          {ranks.map(rank => (
            <FormControlLabel
              key={rank}
              control={
                <Checkbox
                  checked={filters.rank?.includes(rank) || false}
                  onChange={() => handleCheckboxChange('rank', rank)}
                />
              }
              label={rank}
            />
          ))}
        </Box>
        {/* <Box mt={2}>
          <Typography variant="subtitle1">Power Points</Typography>
          {powerPoints.map(pp => (
            <FormControlLabel
              key={pp}
              control={
                <Checkbox
                  checked={filters.powerPoints?.includes(pp) || false}
                  onChange={() => handleCheckboxChange('powerPoints', pp)}
                />
              }
              label={pp.toString()}
            />
          ))}
        </Box> */}
        <Box mt={2}>
          <Typography variant="subtitle1">Arcane Background</Typography>
          {arcaneBackgrounds.map(ab => (
            <FormControlLabel
              key={ab}
              control={
                <Checkbox
                  checked={filters.arcane_background?.includes(ab) || false}
                  onChange={() => handleCheckboxChange('arcane_background', ab)}
                />
              }
              label={ab}
            />
          ))}
        </Box>
        <Box mt={2}>
          <Typography variant="subtitle1">Domain</Typography>
          {domains.map(domain => (
            <FormControlLabel
              key={domain}
              control={
                <Checkbox
                  checked={filters.domain?.includes(domain) || false}
                  onChange={() => handleCheckboxChange('domain', domain)}
                />
              }
              label={domain}
            />
          ))}
        </Box>
      </Collapse>
    </Box>
  );
};

export default FilterPanel;
