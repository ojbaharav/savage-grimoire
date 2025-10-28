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

// Define the structure of the arcane_background filter
interface ArcaneBackgroundFilter {
  [key: string]: string | boolean;
}

interface Filters {
  rank?: string[];
  powerPoints?: number[];
  arcane_background?: ArcaneBackgroundFilter;
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

  // --- Start of new logic for Arcane Backgrounds ---

  // State for sub-filters
  const [elementalistSubType, setElementalistSubType] = useState('Any');
  const [summonerSubType, setSummonerSubType] = useState('Any');

  // Process arcane backgrounds to group them
  const mainBackgrounds = [...new Set(arcaneBackgrounds.map(bg => {
    if (bg.startsWith('ELEMENTALIST')) return 'ELEMENTALIST';
    if (bg.startsWith('SUMMONER')) return 'SUMMONER';
    return bg;
  }))].sort();

  const elementalistSubTypes = ['Any', ...new Set(arcaneBackgrounds
    .filter(bg => bg.startsWith('ELEMENTALIST ('))
    .map(bg => bg.match(/\((.*)\)/)?.[1] || '')
    .filter(Boolean))].sort();

  const summonerSubTypes = ['Any', ...new Set(arcaneBackgrounds
    .filter(bg => bg.startsWith('SUMMONER ('))
    .map(bg => bg.match(/\((.*)\)/)?.[1] || '')
    .filter(Boolean))].sort();

  const handleArcaneBgChange = (background: string) => {
    const newArcaneFilters = { ...(filters.arcane_background || {}) };

    if (newArcaneFilters[background]) {
      delete newArcaneFilters[background];
      // Reset sub-type when unchecked
      if (background === 'ELEMENTALIST') setElementalistSubType('Any');
      if (background === 'SUMMONER') setSummonerSubType('Any');
    } else {
      if (background === 'ELEMENTALIST') {
        newArcaneFilters[background] = elementalistSubType;
      } else if (background === 'SUMMONER') {
        newArcaneFilters[background] = summonerSubType;
      } else {
        newArcaneFilters[background] = true;
      }
    }
    onFilterChange({ ...filters, arcane_background: newArcaneFilters });
  };

  const handleSubtypeChange = (background: 'ELEMENTALIST' | 'SUMMONER', subType: string) => {
    if (background === 'ELEMENTALIST') {
      setElementalistSubType(subType);
    } else if (background === 'SUMMONER') {
      setSummonerSubType(subType);
    }

    // Update the main filter state if the parent checkbox is active
    if (filters.arcane_background?.[background]) {
      const newArcaneFilters = { ...filters.arcane_background, [background]: subType };
      onFilterChange({ ...filters, arcane_background: newArcaneFilters });
    }
  };

  // --- End of new logic for Arcane Backgrounds ---

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
        <Box mt={2}>
          <Typography variant="subtitle1">Arcane Background</Typography>
          {mainBackgrounds.map(ab => (
            <React.Fragment key={ab}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!filters.arcane_background?.[ab]}
                  onChange={() => handleArcaneBgChange(ab)}
                />
              }
              label={ab}
            />
            {ab === 'ELEMENTALIST' && filters.arcane_background?.ELEMENTALIST && (
              <Box pl={3} my={1}>
                <FormControl fullWidth size="small">
                  <InputLabel>Sub-type</InputLabel>
                  <Select
                    value={elementalistSubType}
                    label="Sub-type"
                    onChange={(e) => handleSubtypeChange('ELEMENTALIST', e.target.value as string)}
                  >
                    {elementalistSubTypes.map(sub => <MenuItem key={sub} value={sub}>{sub}</MenuItem>)}
                  </Select>
                </FormControl>
              </Box>
            )}
            {ab === 'SUMMONER' && filters.arcane_background?.SUMMONER && (
              <Box pl={3} my={1}>
                <FormControl fullWidth size="small">
                  <InputLabel>Sub-type</InputLabel>
                  <Select
                    value={summonerSubType}
                    label="Sub-type"
                    onChange={(e) => handleSubtypeChange('SUMMONER', e.target.value as string)}
                  >
                    {summonerSubTypes.map(sub => <MenuItem key={sub} value={sub}>{sub}</MenuItem>)}
                  </Select>
                </FormControl>
              </Box>
            )}
            </React.Fragment>
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
