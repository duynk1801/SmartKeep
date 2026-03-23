import { useCallback, useState } from 'react';

import { MOCKUP_HOME_DEVICES } from '@/src/data/mockup';

import type { DeviceData } from './HomeControl.types';

export function useHomeControl() {
  const [devices, setDevices] = useState<DeviceData[]>(MOCKUP_HOME_DEVICES);

  const handleToggleDevice = useCallback((deviceId: string) => {
    setDevices((prev) =>
      prev.map((d) =>
        d.id === deviceId
          ? {
              ...d,
              isOn: !d.isOn,
              status: d.isOn ? 'standby' : 'active',
            }
          : d,
      ),
    );
  }, []);

  return { devices, handleToggleDevice } as const;
}
