import powers from '../data/powers.json';

export interface Power {
  id: number;
  name: string;
  rank: string;
  powerPoints: number;
  range: string;
  duration: string;
  trappings: string;
  description: string;
  arcane_background: string[];
  domain: string[];
}

export interface RawDataPower {
  'POWER': string;
  'RANK': string;
  'POWER POINTS': number;
  'RANGE': string;
  'DURATION': string;
  'SUMMARY': string;
  'Arcane Backgrounds': string;
  'Domain': string;
}

export const loadPowers = (): Promise<Power[]> => {
  return new Promise((resolve, reject) => {
    if (powers && powers.powers) {
      const formattedPowers: Power[] = (powers.powers as RawDataPower[]).map((p, index) => ({
        id: index,
        name: p.POWER,
        rank: p.RANK,
        powerPoints: p['POWER POINTS'],
        range: p.RANGE,
        duration: p.DURATION,
        description: p.SUMMARY,
        trappings: '', // Not in JSON data
        arcane_background: p['Arcane Backgrounds'].split(',').map(s => s.trim()),
        domain: p.Domain ? p.Domain.split(',').map(s => s.trim()) : [],
      }));
      resolve(formattedPowers);
    } else {
      reject('Failed to load powers data.');
    }
  });
};
