import React from 'react';
import { TextField } from '@mui/material';

interface SearchBarProps {
  onSearchChange: (query: string) => void;
  searchQuery: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchChange, searchQuery }) => {
  return (
    <TextField
      sx={{marginBottom: '2rem',
        backgroundColor: 'background.paper',        
        '& .MuiOutlinedInput-notchedOutline': {
          borderRadius: 0,
          borderColor: 'search.primary',
        },
        '& .MuiInputLabel-root': {
        color: 'search.primary',
      },
      }} 
      label="Search Powers..."
      variant="outlined"
 
      fullWidth
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
};

export default SearchBar;
