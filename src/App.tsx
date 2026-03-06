import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container, Box, Typography, Paper } from '@mui/material';
import { usePowers } from './hooks/usePowers.ts';
import { useFilters } from './hooks/useFilters.ts';
import { useSorting } from './hooks/useSorting.ts';
import PowerCardList from './components/PowerCardList/index.tsx';
import FilterPanel from './components/FilterPanel/index.tsx';
import ThemeToggle from './components/ThemeToggle/index.tsx';
import SearchBar from './components/SearchBar/index.tsx';
import { getUniqueValues } from './utils/getUniqueValues.ts';
import './styles/main.scss';

declare module '@mui/material/styles' {
  interface TypeBackground {
    filterPanel?: string;
  }
  interface Palette {
    card: {
      header: string;
      body: string;
    };
  }
  interface PaletteOptions {
    card?: {
      header?: string;
      body?: string;
    };
  }
}

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { powers, loading, error } = usePowers();
  const { filters, handleFilterChange, searchQuery, handleSearchChange, filteredPowers } = useFilters(powers);
  const { sortedPowers, requestSort, sortConfig, setSortDirection } = useSorting(filteredPowers);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#4a90e2',
      },
      secondary: {
        main: '#f5a623',
      },
      background: {
        default: isDarkMode ? '#212529' : '#F0F0F0',
        paper: isDarkMode ? '#343a40' : '#ffffff',
        filterPanel: isDarkMode ? '#343a40' : '#F4F4F4', // Filter panel background
      },
      text: {
        primary: isDarkMode ? '#f8f9fa' : '#343a40',
        secondary: isDarkMode ? '#ced4da' : '#6c757d',
      },
      card: {
        header: isDarkMode ? '#252525' : '#FFFFFF',
        body: isDarkMode ? '#2D2D2D' : '#FCFBF9',
      },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    }
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
    durations: getUniqueValues(powers, 'duration'),
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Box >
          <Paper elevation={2} square={true} sx={{paddingInlineStart: '2rem', position: 'relative'}}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography 
                variant="h4" 
                component="h1"
                sx={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.875rem',
                  lineHeight: '2.25',
                  fontWeight: '700'
                }}
              >
                VTT Minimalist Powers
              </Typography>
              <ThemeToggle onToggle={() => setIsDarkMode(!isDarkMode)} isDarkMode={isDarkMode} />
            </Box>
          </Paper>
          {/* <Paper elevation={0} sx={{ mt: 0 }}> </Paper> */}
          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} sx={{ gap: 3 }}>
            <Paper elevation={2} sx={{ width: { xs: '100%', md: '25%' }, padding: '1.5rem', backgroundColor: 'background.filterPanel' }}>
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                filterOptions={filterOptions}
                requestSort={requestSort}
                sortConfig={sortConfig}
                setSortDirection={setSortDirection}
              />
            </Paper>
            <Box sx={{ width: { xs: '100%', md: '75%' }, pt: 3 }}>
              <SearchBar onSearchChange={handleSearchChange} searchQuery={searchQuery} />
              <PowerCardList powers={sortedPowers} />
            </Box>
          </Box>
         
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;
