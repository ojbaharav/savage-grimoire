import React from 'react';
import { Switch, FormControlLabel } from '@mui/material';

interface ThemeToggleProps {
  onToggle: () => void;
  isDarkMode: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ onToggle, isDarkMode }) => {
  return (
    <FormControlLabel
      control={<Switch checked={isDarkMode} onChange={onToggle} />}
      label="Dark Mode"
    />
  );
};

export default ThemeToggle;
