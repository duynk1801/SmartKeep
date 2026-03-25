/**
 * Centralized enums for SmartKeep.
 * Rule 9.5: Never use raw strings as type identifiers — always use enums.
 */

/** Discriminator for product/device type */
export enum ProductType {
  HARDWARE = 'hardware',
  SMART_DEVICE = 'smart_device',
}

/** Status of an inventory entry */
export enum InventoryStatus {
  ACTIVE = 'active',
  STANDBY = 'standby',
  OFF = 'off',
}

/** Connection type for devices */
export enum ConnectionType {
  BLUETOOTH = 'bluetooth',
  WIFI = 'wifi',
}

/** Entry type discriminator for inventory list */
export enum InventoryEntryType {
  DEVICE = 'device',
  GROUP = 'group',
}

/** Screen names for navigation */
export enum ScreenName {
  HOME = 'home',
  ADD_DEVICES = 'add-devices',
  SETTINGS = 'settings',
}
