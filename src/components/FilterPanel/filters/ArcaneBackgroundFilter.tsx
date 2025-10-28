import React, { useState } from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { type Filters } from '../../../types/filters';

interface ArcaneBackgroundFilterProps {
  filters: Filters;
  arcaneBackgrounds: string[];
  onFilterChange: (newFilters: Filters) => void;
}

const ArcaneBackgroundFilter: React.FC<ArcaneBackgroundFilterProps> = ({ filters, arcaneBackgrounds, onFilterChange }) => {
  const [elementalistSubType, setElementalistSubType] = useState('Any');
  const [summonerSubType, setSummonerSubType] = useState('Any');

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

    if (filters.arcane_background?.[background]) {
      const newArcaneFilters = { ...filters.arcane_background, [background]: subType };
      onFilterChange({ ...filters, arcane_background: newArcaneFilters });
    }
  };

  return (
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
  );
};

export default ArcaneBackgroundFilter;
