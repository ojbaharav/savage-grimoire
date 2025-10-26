import { useState, useEffect } from 'react';
import { loadPowers, type Power } from '../utils/dataLoader.ts';

export const usePowers = () => {
  const [powers, setPowers] = useState<Power[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPowers()
      .then((data: Power[]) => {
        setPowers(data);
        setLoading(false);
      })
      .catch((error: string) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return { powers, loading, error };
};
