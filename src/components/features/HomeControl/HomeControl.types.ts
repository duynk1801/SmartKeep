export interface DeviceData {
  id: string;
  name: string;
  type: 'fan' | 'ac' | 'light' | 'tv';
  isOn: boolean;
  status: 'active' | 'standby' | 'off';
}
