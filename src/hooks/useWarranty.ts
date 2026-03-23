import { useState, useCallback, useEffect, useMemo } from 'react';

import { warrantyApi } from '@/src/api';
import { getWarrantyStatus, getDaysUntilExpiry } from '@/src/utils/warranty';
import type { Warranty, WarrantyInsert, WarrantyUpdate } from '@/src/types';

/**
 * useWarranty — Warranty CRUD + expiry tracking.
 *
 * Provides computed warranty status and upcoming expirations.
 */
export function useWarranty() {
  const [warranties, setWarranties] = useState<Warranty[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWarranties = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await warrantyApi.getAll();
      setWarranties(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch warranties');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWarranties();
  }, [fetchWarranties]);

  const addWarranty = useCallback(
    async (warranty: WarrantyInsert) => {
      const created = await warrantyApi.create(warranty);
      setWarranties((prev) => [created, ...prev]);
      return created;
    },
    [],
  );

  const updateWarranty = useCallback(
    async (id: string, updates: WarrantyUpdate) => {
      const updated = await warrantyApi.update(id, updates);
      setWarranties((prev) => prev.map((w) => (w.id === id ? updated : w)));
      return updated;
    },
    [],
  );

  const removeWarranty = useCallback(
    async (id: string) => {
      await warrantyApi.remove(id);
      setWarranties((prev) => prev.filter((w) => w.id !== id));
    },
    [],
  );

  const expiringWarranties = useMemo(
    () =>
      warranties.filter((w) => {
        const days = getDaysUntilExpiry(w.expiry_date);
        return days >= 0 && days <= 30;
      }),
    [warranties],
  );

  const expiredWarranties = useMemo(
    () => warranties.filter((w) => getWarrantyStatus(w.expiry_date) === 'expired'),
    [warranties],
  );

  return {
    warranties,
    expiringWarranties,
    expiredWarranties,
    isLoading,
    error,
    fetchWarranties,
    addWarranty,
    updateWarranty,
    removeWarranty,
  } as const;
}
