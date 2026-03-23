import { useCallback, useMemo, useState } from 'react';

import { MOCKUP_DASHBOARD_ROOMS, MOCKUP_DASHBOARD_STATS } from '@/src/data/mockup';

import type { RoomData } from './types';

/**
 * useDashboard — Orchestrates Dashboard data and interactions.
 *
 * In production, this will fetch from Supabase via useDevices + useRooms hooks.
 * Currently uses mock data for UI development.
 */
export function useDashboard() {
  const [masterSwitch, setMasterSwitch] = useState(true);
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);

  const rooms = MOCKUP_DASHBOARD_ROOMS;
  const stats = MOCKUP_DASHBOARD_STATS;

  const activeDeviceCount = useMemo(
    () => rooms.reduce((count: number, room: RoomData) => count + room.deviceCount, 0),
    [rooms],
  );

  const handleMasterToggle = useCallback((newValue: boolean) => {
    setMasterSwitch(newValue);
  }, []);

  const handleRoomPress = useCallback((room: RoomData) => {
    // TODO: Navigate to room detail — router.push(`/room/${room.id}`)
    console.log(`[Dashboard] Room pressed: ${room.name}`);
  }, []);

  const handleSelectRoom = useCallback((index: number) => {
    setSelectedRoomIndex(index);
  }, []);

  return {
    rooms,
    stats,
    masterSwitch,
    activeDeviceCount,
    selectedRoomIndex,
    handleMasterToggle,
    handleRoomPress,
    handleSelectRoom,
  } as const;
}
