export type InventoryStatus = 'active' | 'standby' | 'off';
export type ConnectionType = 'bluetooth' | 'wifi';

export interface InventoryDevice {
  id: string;
  type: 'device';
  name: string;
  category: string;
  status: InventoryStatus;
  serial: string;
  location: string;
  connection: ConnectionType;
  health: string;
  lastChecked: string;
  hasWarrantyWarning: boolean;
  warrantyExpiry?: string;
}

export interface InventoryGroup {
  id: string;
  type: 'group';
  name: string;
  summary: string;
  status: InventoryStatus;
  items: InventoryDevice[];
}

export type InventoryEntry = InventoryDevice | InventoryGroup;
