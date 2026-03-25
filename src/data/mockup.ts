import { ConnectionType, InventoryEntryType, InventoryStatus, ProductType } from '@/src/constants/enums';

import type { RoomData, StatData } from '@/src/components/features/Dashboard/types';
import type { DeviceData } from '@/src/components/features/HomeControl/HomeControl.types';
import type {
  InventoryDevice,
  InventoryEntry,
  InventoryGroup,
} from '@/src/components/features/GroupDetail';
import type { RemoteDevice } from '@/src/components/features/RemoteControl/RemoteControl.types';

const inventoryDevice = (data: Omit<InventoryDevice, 'type'>): InventoryDevice => ({
  type: InventoryEntryType.DEVICE,
  ...data,
});

const inventoryGroup = (data: Omit<InventoryGroup, 'type'>): InventoryGroup => ({
  type: InventoryEntryType.GROUP,
  ...data,
});

export const MOCKUP_DASHBOARD_ROOMS: RoomData[] = [
  { id: '1', name: 'Living Room', deviceCount: 5, imageEmoji: '🛋️' },
  { id: '2', name: 'Kitchen', deviceCount: 3, imageEmoji: '🍳' },
  { id: '3', name: 'Bedroom', deviceCount: 4, imageEmoji: '🛏️' },
  { id: '4', name: 'Office', deviceCount: 2, imageEmoji: '💻' },
];

export const MOCKUP_DASHBOARD_STATS: StatData[] = [
  { icon: '🔥', value: '68', unit: '°F', label: 'Temperature' },
  { icon: '💧', value: '69', unit: '%', label: 'Humidity' },
];

export const MOCKUP_HOME_DEVICES: DeviceData[] = [
  { id: '1', name: 'Fan', type: 'fan', isOn: false, status: 'standby' },
  { id: '2', name: 'Air Conditioner', type: 'ac', isOn: false, status: 'standby' },
];

export const MOCKUP_REMOTE_DEVICES: RemoteDevice[] = [
  { id: '1', name: 'Living Room TV', location: 'Living Room' },
  { id: '2', name: 'Bedroom AC', location: 'Bedroom' },
  { id: '3', name: 'Office PC', location: 'Office' },
];

export const MOCKUP_INVENTORY: InventoryEntry[] = [
  inventoryDevice({
    id: 'device-1',
    name: 'Laptop Pro 14',
    category: 'Laptop',
    status: InventoryStatus.ACTIVE,
    serial: 'LP14-SK-2981',
    location: 'Office desk',
    connection: ConnectionType.WIFI,
    health: '95%',
    lastChecked: '2026-03-18 14:30',
    hasWarrantyWarning: false,
    product_type: ProductType.HARDWARE,
  }),
  inventoryDevice({
    id: 'device-2',
    name: 'UltraWide Display',
    category: 'Monitor',
    status: InventoryStatus.STANDBY,
    serial: 'UW34-SK-8820',
    location: 'Workspace A',
    connection: ConnectionType.WIFI,
    health: '88%',
    lastChecked: '2026-03-17 09:45',
    hasWarrantyWarning: true,
    warrantyExpiry: '2026-04-15',
    product_type: ProductType.HARDWARE,
  }),
  inventoryGroup({
    id: 'group-1',
    name: 'My Computer',
    summary: 'Desktop combo with core parts and accessories',
    status: InventoryStatus.ACTIVE,
    product_type: ProductType.HARDWARE,
    items: [
      inventoryDevice({
        id: 'group-1-item-1',
        name: 'RTX 4090',
        category: 'VGA',
        status: InventoryStatus.ACTIVE,
        serial: 'GPU-4090-SK',
        location: 'Case slot 1',
        connection: ConnectionType.WIFI,
        health: '92%',
        lastChecked: '2026-03-18 21:10',
        hasWarrantyWarning: true,
        warrantyExpiry: '2026-04-10',
        product_type: ProductType.HARDWARE,
      }),
      inventoryDevice({
        id: 'group-1-item-2',
        name: 'Intel i9-14900K',
        category: 'CPU',
        status: InventoryStatus.ACTIVE,
        serial: 'CPU-I9-14900K',
        location: 'Mainboard socket',
        connection: ConnectionType.WIFI,
        health: '97%',
        lastChecked: '2026-03-18 21:10',
        hasWarrantyWarning: false,
        product_type: ProductType.HARDWARE,
      }),
      inventoryDevice({
        id: 'group-1-item-3',
        name: 'SSD 2TB NVMe',
        category: 'Storage',
        status: InventoryStatus.ACTIVE,
        serial: 'SSD-2TB-SK',
        location: 'M.2 slot',
        connection: ConnectionType.WIFI,
        health: '90%',
        lastChecked: '2026-03-18 21:10',
        hasWarrantyWarning: false,
        product_type: ProductType.HARDWARE,
      }),
    ],
  }),
  inventoryGroup({
    id: 'group-2',
    name: 'Streaming Setup',
    summary: 'PC, capture chain and creator gear',
    status: InventoryStatus.STANDBY,
    product_type: ProductType.HARDWARE,
    items: [
      inventoryDevice({
        id: 'group-2-item-1',
        name: 'Mini PC',
        category: 'Computer',
        status: InventoryStatus.STANDBY,
        serial: 'MPC-SK-0001',
        location: 'Studio rack',
        connection: ConnectionType.WIFI,
        health: '91%',
        lastChecked: '2026-03-16 18:12',
        hasWarrantyWarning: false,
        product_type: ProductType.HARDWARE,
      }),
      inventoryDevice({
        id: 'group-2-item-2',
        name: 'Capture Card',
        category: 'Accessory',
        status: InventoryStatus.OFF,
        serial: 'CAP-SK-8712',
        location: 'Desk tray',
        connection: ConnectionType.BLUETOOTH,
        health: '84%',
        lastChecked: '2026-03-15 11:00',
        hasWarrantyWarning: false,
        product_type: ProductType.HARDWARE,
      }),
    ],
  }),
];
