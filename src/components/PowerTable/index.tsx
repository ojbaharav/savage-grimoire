import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
} from '@mui/material';
import type { Power } from '../../utils/dataLoader.ts';

interface SortConfig {
  key: keyof Power;
  direction: 'asc' | 'desc';
}

interface PowerTableProps {
  powers: Power[];
  requestSort: (key: keyof Power) => void;
  sortConfig: SortConfig;
}

const PowerTable: React.FC<PowerTableProps> = ({ powers, requestSort, sortConfig }) => {
  const headers: { key: keyof Power; label: string }[] = [
    { key: 'name', label: 'Power' },
    { key: 'rank', label: 'Rank' },
    { key: 'powerPoints', label: 'PP' },
    { key: 'range', label: 'Range' },
    { key: 'duration', label: 'Duration' },
    { key: 'description', label: 'Summary' },
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map(header => (
              <TableCell key={header.key}>
                <TableSortLabel
                  active={sortConfig.key === header.key}
                  direction={sortConfig.key === header.key ? sortConfig.direction : 'asc'}
                  onClick={() => requestSort(header.key)}
                >
                  {header.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {powers.map(power => (
            <TableRow key={power.id}>
              <TableCell>{power.name}</TableCell>
              <TableCell>{power.rank}</TableCell>
              <TableCell>{power.powerPoints}</TableCell>
              <TableCell>{power.range}</TableCell>
              <TableCell>{power.duration}</TableCell>
              <TableCell>{power.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PowerTable;
