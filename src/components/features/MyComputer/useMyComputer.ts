import { useCallback, useMemo, useState } from 'react';

import { useInventoryStore } from '@/src/store';

export function useMyComputer() {
  const entries = useInventoryStore((s) => s.entries);
  const [expandedEntryIds, setExpandedEntryIds] = useState<Record<string, boolean>>({
    'group-1': true,
  });
  const [expandedDeviceIds, setExpandedDeviceIds] = useState<Record<string, boolean>>({
    'group-1-item-1': true,
  });

  const standaloneDevices = useMemo(() => entries.filter((entry) => entry.type === 'device'), [entries]);

  const groupedDevices = useMemo(() => entries.filter((entry) => entry.type === 'group'), [entries]);

  const handleToggleEntry = useCallback((entryId: string) => {
    setExpandedEntryIds((prev) => ({
      ...prev,
      [entryId]: !prev[entryId],
    }));
  }, []);

  const handleToggleDeviceDetails = useCallback((deviceId: string) => {
    setExpandedDeviceIds((prev) => ({
      ...prev,
      [deviceId]: !prev[deviceId],
    }));
  }, []);

  return {
    standaloneDevices,
    groupedDevices,
    expandedEntryIds,
    expandedDeviceIds,
    handleToggleEntry,
    handleToggleDeviceDetails,
  } as const;
}
