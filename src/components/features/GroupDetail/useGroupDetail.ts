import { useCallback, useMemo, useState } from 'react';

import { useInventoryStore } from '@/src/store';
import { InventoryEntryType } from '@/src/constants/enums';

import type { InventoryGroup } from './GroupDetail.types';

export function useGroupDetail(groupId: string) {
  const entries = useInventoryStore((s) => s.entries);
  
  // Find the specific group
  const group = useMemo(() => {
    return entries.find(
      (entry) => entry.id === groupId && entry.type === InventoryEntryType.GROUP
    ) as InventoryGroup | undefined;
  }, [entries, groupId]);

  const [expandedDeviceIds, setExpandedDeviceIds] = useState<Record<string, boolean>>({});

  const handleToggleDeviceDetails = useCallback((deviceId: string) => {
    setExpandedDeviceIds((prev) => ({
      ...prev,
      [deviceId]: !prev[deviceId],
    }));
  }, []);

  return {
    group,
    expandedDeviceIds,
    handleToggleDeviceDetails,
  } as const;
}
