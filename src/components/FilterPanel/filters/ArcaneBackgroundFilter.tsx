import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { type Filters } from '../../../types/filters';
import { type SelectChangeEvent } from '@mui/material/Select';

interface ArcaneBackgroundFilterProps {
  filters: Filters;
  arcaneBackgrounds: string[];
  onFilterChange: (newFilters: Filters) => void;
}

const ArcaneBackgroundFilter: React.FC<ArcaneBackgroundFilterProps> = ({
  filters,
  arcaneBackgrounds,
  onFilterChange,
}) => {
  const [elementalistSubType, setElementalistSubType] = useState('None');
  const [summonerSubType, setSummonerSubType] = useState('None');

  const mainBackgrounds = [
    ...new Set(
      arcaneBackgrounds.map((bg) => {
        if (bg.startsWith('ELEMENTALIST')) return 'ELEMENTALIST';
        if (bg.startsWith('SUMMONER')) return 'SUMMONER';
        return bg;
      })
    ),
  ].sort();

  const elementalistSubTypes = ['None', 'Any', ...new Set(arcaneBackgrounds
    .filter(bg => bg.startsWith('ELEMENTALIST ('))
    .map(bg => bg.match(/\((.*)\)/)?.[1] || '')
    .filter(Boolean))].sort();

  const summonerSubTypes = ['None', 'Any', ...new Set(arcaneBackgrounds
    .filter(bg => bg.startsWith('SUMMONER ('))
    .map(bg => bg.match(/\((.*)\)/)?.[1] || '')
    .filter(Boolean))].sort();

  useEffect(() => {
    const elementalistFilter = filters.arcane_background?.ELEMENTALIST;
    if (elementalistFilter === true) {
      setElementalistSubType('None');
    } else if (typeof elementalistFilter === 'string') {
      setElementalistSubType(elementalistFilter);
    } else {
      setElementalistSubType('None');
    }
    
    const summonerFilter = filters.arcane_background?.SUMMONER;
    if (summonerFilter === true) {
      setSummonerSubType('None');
    } else if (typeof summonerFilter === 'string') {
      setSummonerSubType(summonerFilter);
    } else {
      setSummonerSubType('None');
    }
  }, [filters.arcane_background]);

  const handleArcaneBgChange = (
    event: SelectChangeEvent<string>
  ) => {
    const selectedBackground = event.target.value;
    const newArcaneFilters: { [key: string]: any } = {};

    if (selectedBackground) { 
        if (selectedBackground === 'ELEMENTALIST') {
          newArcaneFilters[selectedBackground] = elementalistSubType === 'None' ? true : elementalistSubType;
        } else if (selectedBackground === 'SUMMONER') {
          newArcaneFilters[selectedBackground] = summonerSubType === 'None' ? true : summonerSubType;
        } else {
          newArcaneFilters[selectedBackground] = true;
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

    if (filters.arcane_background?.[background]) {
      const newSubTypeValue = subType === 'None' ? true : subType;
      const newArcaneFilters = { ...filters.arcane_background, [background]: newSubTypeValue };
      onFilterChange({ ...filters, arcane_background: newArcaneFilters });
    }
  };

  const selected = Object.keys(filters.arcane_background || {})[0] || '';

  return (
    <Box mt={2}>
      <FormControl fullWidth>
        <InputLabel>Arcane Background</InputLabel>
        <Select
          value={selected}
          onChange={handleArcaneBgChange}
          label="Arcane Background"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {mainBackgrounds.map((background) => (
            <MenuItem key={background} value={background}>
              {background}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selected === 'ELEMENTALIST' && (
         <Box pl={1} my={1}>
          <FormControl fullWidth size="small">
            <InputLabel>Elementalist Sub-type</InputLabel>
            <Select
              value={elementalistSubType}
              label="Elementalist Sub-type"
              onChange={(e) => handleSubtypeChange('ELEMENTALIST', e.target.value as string)}
            >
              {elementalistSubTypes.map(sub => <MenuItem key={sub} value={sub}>{sub}</MenuItem>)}
            </Select>
          </FormControl>
        </Box>
      )}

      {selected === 'SUMMONER' && (
        <Box pl={1} my={1}>
          <FormControl fullWidth size="small">
            <InputLabel>Summoner Sub-type</InputLabel>
            <Select
              value={summonerSubType}
              label="Summoner Sub-type"
              onChange={(e) => handleSubtypeChange('SUMMONER', e.target.value as string)}
            >
              {summonerSubTypes.map(sub => <MenuItem key={sub} value={sub}>{sub}</MenuItem>)}
            </Select>
          </FormControl>
        </Box>
      )}
    </Box>
  );
};

export default ArcaneBackgroundFilter;