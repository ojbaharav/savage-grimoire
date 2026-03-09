import React, { useState } from 'react';
import { createTheme, ThemeProvider, type Palette } from '@mui/material/styles';
import { CssBaseline, Container, Box, Typography, Paper, GlobalStyles, Drawer, IconButton } from '@mui/material';
import { Menu, Close } from '@mui/icons-material';
import { usePowers } from './hooks/usePowers.ts';
import { useFilters } from './hooks/useFilters.ts';
import { useSorting } from './hooks/useSorting.ts';
import PowerCardList from './components/PowerCardList/index.tsx';
import FilterPanel from './components/FilterPanel/index.tsx';
import ThemeToggle from './components/ThemeToggle/index.tsx';
import SearchBar from './components/SearchBar/index.tsx';
import { getUniqueValues } from './utils/getUniqueValues.ts';
import { getThemeOptions } from './theme.ts';
import './styles/main.scss';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { powers, loading, error } = usePowers();
  const { filters, handleFilterChange, searchQuery, handleSearchChange, filteredPowers } = useFilters(powers);
  const { sortedPowers, requestSort, sortConfig, setSortDirection } = useSorting(filteredPowers);

  const theme = React.useMemo(() => createTheme(getThemeOptions(isDarkMode ? 'dark' : 'light')), [isDarkMode]);

  const generateCssVariables = (palette: Palette): { [key: string]: string } => {
    const variables: { [key: string]: string } = {};
    for (const color of Object.keys(palette)) {
      const value = palette[color as keyof Palette];
      if (typeof value === 'string') {
        variables[`--mui-palette-${color}`] = value;
      } else if (typeof value === 'object' && value !== null) {
        for (const key of Object.keys(value)) {
          const nestedValue = (value as Record<string, unknown>)[key];
          if (typeof nestedValue === 'string') {
            variables[`--mui-palette-${color}-${key}`] = nestedValue;
          }
        }
      }
    }
    return variables;
  };

  const cssVariables = generateCssVariables(theme.palette);


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
    durations: getUniqueValues(powers, 'duration'),
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={{ ':root': cssVariables }} />
      <Container>
        <header >
          <Paper square={true} sx={{ boxShadow: { xs: 0, md: 2 }, paddingInlineStart: { xs: '0', md: '2rem' }, position: 'relative', backgroundImage: 'none', backgroundColor: { xs: 'initial', md: 'background.paper' } }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" paddingBlock={2}>
              <div>
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '1.875rem',

                    fontWeight: '700'
                  }}
                >
                  Savage Grimoire
                </Typography>
                <Typography variant="subtitle1"
                  sx={{
                    fontSize: '1rem',
                    letterSpacing: '0.05em'
                  }}
                >Arcane Background Powers Made Easy
                </Typography>
              </div>

              <IconButton
                sx={{ display: { md: 'none' }, backgroundColor: 'secondary.main', borderRadius: 0 }}
                onClick={() => setIsDrawerOpen(true)}
              >
                <Menu />
              </IconButton>
            </Box>
          </Paper>
        </header>
        <Box display="flex" flexDirection={'row'} sx={{ gap: 3 }}>
          <Paper elevation={2} sx={{
            width: { xs: '100%', md: '25%' },
            padding: '1.5rem',
            backgroundColor: 'primary.light',
            backgroundImage: 'none',
            display: { xs: 'none', md: 'block' },
          }}>
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              filterOptions={filterOptions}
              requestSort={requestSort}
              sortConfig={sortConfig}
              setSortDirection={setSortDirection}
              isDarkMode={isDarkMode}
              onToggle={() => setIsDarkMode(!isDarkMode)}
            />
          </Paper>
          <Box sx={{ width: { xs: '100%', md: '75%' }, pt: { xs: 0, md: 3 } }}>
            <SearchBar onSearchChange={handleSearchChange} searchQuery={searchQuery} />
            <PowerCardList powers={sortedPowers} />
          </Box>
        </Box>


      </Container>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        <Box sx={{ width: 250, p: 2 }}>
          <IconButton onClick={() => setIsDrawerOpen(false)} sx={{ mb: 2 }}>
            <Close />
          </IconButton>
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            filterOptions={filterOptions}
            requestSort={requestSort}
            sortConfig={sortConfig}
            setSortDirection={setSortDirection}
            isDarkMode={isDarkMode}
            onToggle={() => setIsDarkMode(!isDarkMode)}
          />
        </Box>
      </Drawer>
    </ThemeProvider>
  );
};

export default App;
