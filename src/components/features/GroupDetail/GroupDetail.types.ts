import { ConnectionType, InventoryEntryType, InventoryStatus, ProductType } from '@/src/constants/enums';

export interface InventoryDevice {
  id: string;
  type: InventoryEntryType.DEVICE;
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
  product_type?: ProductType;
}

export interface InventoryGroup {
  id: string;
  type: InventoryEntryType.GROUP;
  name: string;
  summary: string;
  status: InventoryStatus;
  items: InventoryDevice[];
  product_type?: ProductType;
}

export type InventoryEntry = InventoryDevice | InventoryGroup;
