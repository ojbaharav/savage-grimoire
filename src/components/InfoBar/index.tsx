import React from 'react';
import { Box, Button, Typography } from '@mui/material';

interface InfoBarProps {
  count: number;
  isFiltered: boolean;
  onReset: () => void;
}

const InfoBar: React.FC<InfoBarProps> = ({ count, isFiltered, onReset }) => {
  if (!isFiltered) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 16px',
        backgroundColor: 'secondary.main',
        borderRadius: '4px',
        marginBottom: 3
      }}
    >
      <Typography variant="body1">
        Powers found: {count}
      </Typography>
      <Button variant="outlined" onClick={onReset}>
        Reset
      </Button>
    </Box>
  );
};

export default InfoBar;
