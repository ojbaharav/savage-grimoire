import { type Power } from '../utils/dataLoader';

export interface SortConfig {
  key: keyof Power;
  direction: 'asc' | 'desc';
}
