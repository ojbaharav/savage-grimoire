import React from 'react';
import type { Power } from '../../utils/dataLoader';
import PowerCard from '../PowerCard';
import { Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

interface PowerCardListProps {
  powers: Power[];
}

const PowerCardList: React.FC<PowerCardListProps> = ({ powers }) => {
  return (
    <Box className="power-card-list" mt={1}>
      <AnimatePresence>
        {powers.map(power => (
          <motion.div
            key={power.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PowerCard power={power}  />
          </motion.div>
        ))}
      </AnimatePresence>
    </Box>
  );
};

export default PowerCardList;
