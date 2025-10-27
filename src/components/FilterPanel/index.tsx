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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { type SelectChangeEvent } from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';

interface Filters {
  rank?: string[];
  powerPoints?: number[];
  arcane_background?: string[];
  domain?: string[];
  duration?: string[];
}

interface FilterOptions {
  ranks: string[];
  powerPoints: number[];
  arcaneBackgrounds: string[];
  domains: string[];
  durations: string[];
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

  const { ranks, powerPoints, arcaneBackgrounds, domains, durations } = filterOptions;

  const handleCheckboxChange = <K extends keyof Filters>(group: K, value: NonNullable<Filters[K]>[number]) => {
    const currentGroup = filters[group] as (typeof value)[] | undefined;
    let newGroup: (typeof value)[];

    if (currentGroup?.includes(value)) {
      newGroup = currentGroup.filter(item => item !== value);
    } else {
      newGroup = [...(currentGroup || []), value];
    }

    onFilterChange({ ...filters, [group]: newGroup });
  };

  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    const { value } = event.target;
    onFilterChange({ ...filters, duration: typeof value === 'string' ? value.split(',') : value });
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
        <Box mt={2}>
          <FormControl fullWidth>
            <InputLabel>Duration</InputLabel>
            <Select
              multiple
              value={filters.duration || []}
              onChange={handleSelectChange}
              renderValue={selected => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map(value => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {durations.map(duration => (
                <MenuItem key={duration} value={duration}>
                  {duration}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
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