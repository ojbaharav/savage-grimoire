import React from 'react';
import type { Power } from '../../utils/dataLoader';
import { Card, Typography, Box, Divider } from '@mui/material';

interface PowerCardProps {
  power: Power;
}

const getRankInitial = (fullRank: string): string => {
    // Extracts the first letter of the rank name (e.g., "(1) Novice" -> "N")
    const rankName = fullRank.replace(/\(\d+\)\s*/, '').trim();
    return rankName.charAt(0).toUpperCase();
};

const PowerCard: React.FC<PowerCardProps> = ({ power }) => {
  return (
    <Card 
      elevation={0} 
      variant="outlined" 
      square={true} 
      className="power-card" 
      sx={{ 
        borderColor: 'secondary.main',
        backgroundColor: 'card.body'
      }}
    >
      <Box 
        className="power-card-header" 
        sx={{ 
          backgroundColor: 'card.header'
        }}
      >
        <Typography component="h2" className="power-card-name" >{power.name}</Typography>
        <Box className="power-card-rank-badge">
            <Typography className="power-card-rank">{getRankInitial(power.rank)}</Typography>
        </Box>
      </Box>
      
      <Divider />

      <Box className="power-card-stats">
        <Box className="power-card-stat">
          <Typography display="block" className="stat-label">PP</Typography>
          <Typography className="stat-value">{power.powerPoints}</Typography>
        </Box>
        <Box className="power-card-stat">
          <Typography display="block" className="stat-label">Range</Typography>
          <Typography className="stat-value">{power.range}</Typography>
        </Box>
        <Box className="power-card-stat">
          <Typography display="block" className="stat-label">Duration</Typography>
          <Typography className="stat-value">{power.duration}</Typography>
        </Box>
      </Box>

      <Divider />

      <Typography className="power-card-description">{power.description}</Typography>
    </Card>
  );
};

export default PowerCard;
