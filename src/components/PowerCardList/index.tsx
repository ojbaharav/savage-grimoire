import React from 'react';
import type { Power } from '../../utils/dataLoader';
import PowerCard from '../PowerCard';
import { Box } from '@mui/material';

interface PowerCardListProps {
  powers: Power[];
}

const PowerCardList: React.FC<PowerCardListProps> = ({ powers }) => {
  return (
    <Box className="power-card-list" mt={1}>
      {powers.map(power => (
        <PowerCard key={power.id} power={power} />
      ))}
    </Box>
  );
};

export default PowerCardList;
