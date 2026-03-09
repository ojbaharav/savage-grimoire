import type { ThemeOptions } from '@mui/material/styles';

const greyPalette = {
  100: '#f8f9fa',
  200: '#e9ecef',
  300: '#dee2e6',
  400: '#ced4da',
  500: '#adb5bd',
  600: '#6c757d',
  700: '#495057',
  800: '#343a40',
  900: '#212529',
};

export const getThemeOptions = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    grey: greyPalette,
    ...(mode === 'light'
      ? {
          primary: { main: '#b8860b', light: '#F7F4EF',  },
          secondary: { main: '#F2ECDD' },
          background: { default: '#F8F7F5', paper: '#ffffff' },
          text: { primary: '#343a40', secondary: '#6c757d' },
          card: { border: '#b8860b', header: '#FFFFFF', body: '#FCFBF9', rankBorder: '#e5e7eb', rankBg: '#f3f4f6' },
          divider: greyPalette[300],
          search: {primary: '#6b7280', border: '#9ca3af'}
        }
      : {
          primary: { main: '#b8860b', light: '#262626' },
          secondary: { main: '#2D2D2D' },
          background: { default: '#121212', paper: '#1F1F1F' },
          text: { primary: '#f8f9fa', secondary: '#ced4da' },
          card: { border: '#374151', header: '#252525', body: '#2D2D2D', rankBorder: '#4b5563', rankBg: '#1f2937' },
          divider: greyPalette[700],
          search: {primary: '#6b7280', border: '#4b5563'}
        }),
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});
