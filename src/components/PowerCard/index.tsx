
import React from 'react';
import type { Power } from '../../utils/dataLoader';
import { Paper, Typography, Box } from '@mui/material';

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
    <Paper elevation={3} className="power-card">
      <Box className="power-card-header">
        <Typography variant="h6" className="power-card-name">{power.name}</Typography>
        <Box className="power-card-rank-badge">
            <Typography variant="h6" className="power-card-rank">{getRankInitial(power.rank)}</Typography>
        </Box>
      </Box>
      <Box className="power-card-stats">
        <Box className="power-card-stat">
          <Typography variant="caption" display="block" className="stat-label">PP</Typography>
          <Typography variant="body2" className="stat-value">{power.powerPoints}</Typography>
        </Box>
        <Box className="power-card-stat">
          <Typography variant="caption" display="block" className="stat-label">Range</Typography>
          <Typography variant="body2" className="stat-value">{power.range}</Typography>
        </Box>
        <Box className="power-card-stat">
          <Typography variant="caption" display="block" className="stat-label">Duration</Typography>
          <Typography variant="body2" className="stat-value">{power.duration}</Typography>
        </Box>
      </Box>
      <Typography variant="body2" className="power-card-description">{power.description}</Typography>
    </Paper>
  );
};

export default PowerCard;
