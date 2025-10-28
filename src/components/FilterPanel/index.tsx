import React, { useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  useMediaQuery,
  Button,
  Collapse,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { type Filters, type FilterOptions } from '../../types/filters';
import RankFilter from './filters/RankFilter';
import DomainFilter from './filters/DomainFilter';
import DurationFilter from './filters/DurationFilter';
import ArcaneBackgroundFilter from './filters/ArcaneBackgroundFilter';

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
        <RankFilter filters={filters} ranks={ranks} onFilterChange={onFilterChange} />
        <DurationFilter filters={filters} durations={durations} onFilterChange={onFilterChange} />
        <ArcaneBackgroundFilter filters={filters} arcaneBackgrounds={arcaneBackgrounds} onFilterChange={onFilterChange} />
        <DomainFilter filters={filters} domains={domains} onFilterChange={onFilterChange} />
      </Collapse>
    </Box>
  );
};

export default FilterPanel;
