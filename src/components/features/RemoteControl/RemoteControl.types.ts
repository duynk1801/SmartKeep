export interface RemoteDevice {
  id: string;
  name: string;
  location: string;
}

export type ConnectionType = 'bluetooth' | 'wifi';
export type SignalStrength = 'strong' | 'medium' | 'weak' | 'none';
