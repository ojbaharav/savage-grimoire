import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container, Box, Typography } from '@mui/material';
import { usePowers } from './hooks/usePowers.ts';
import { useFilters } from './hooks/useFilters.ts';
import { useSorting } from './hooks/useSorting.ts';
import PowerTable from './components/PowerTable/index.tsx';
import FilterPanel from './components/FilterPanel/index.tsx';
import ThemeToggle from './components/ThemeToggle/index.tsx';
import SearchBar from './components/SearchBar/index.tsx';
import { getUniqueValues } from './utils/getUniqueValues.ts';
import './styles/main.scss';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { powers, loading, error } = usePowers();
  const { filters, handleFilterChange, searchQuery, handleSearchChange, filteredPowers } = useFilters(powers);
  const { sortedPowers, requestSort, sortConfig } = useSorting(filteredPowers);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const filterOptions = {
    ranks: getUniqueValues(powers, 'rank'),
    powerPoints: getUniqueValues(powers, 'powerPoints'),
    arcaneBackgrounds: getUniqueValues(powers, 'arcane_background'),
    domains: getUniqueValues(powers, 'domain'),
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Box my={4}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" component="h1">
              SWADE Powers
            </Typography>
            <ThemeToggle onToggle={() => setIsDarkMode(!isDarkMode)} isDarkMode={isDarkMode} />
          </Box>
          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} sx={{ gap: 3, mt: 3 }}>
            <Box sx={{ width: { xs: '100%', md: '25%' } }}>
              <FilterPanel filters={filters} onFilterChange={handleFilterChange} filterOptions={filterOptions} />
            </Box>
            <Box sx={{ width: { xs: '100%', md: '75%' } }}>
              <SearchBar onSearchChange={handleSearchChange} searchQuery={searchQuery} />
              <PowerTable powers={sortedPowers} requestSort={requestSort} sortConfig={sortConfig} />
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;
