# SmartKeep — Project Conventions & Code Rules

> **⚠️ MANDATORY:** Every AI assistant (Cursor, Claude, Copilot, Antigravity, Codex, or any other)
> MUST read and strictly follow ALL rules in this file before making ANY code changes.
> No exceptions. No shortcuts. Violations will cause technical debt.

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [SOLID Principles (Functional React Native)](#2-solid-principles-functional-react-native)
3. [Component Rules](#3-component-rules)
4. [File Size Rules — The 150/200 Line Rule](#4-file-size-rules--the-150200-line-rule)
5. [Hook vs Helper — Clear Boundary](#5-hook-vs-helper--clear-boundary)
6. [Naming Conventions](#6-naming-conventions)
7. [Performance Rules](#7-performance-rules)
8. [Styling Rules](#8-styling-rules)
9. [TypeScript Rules](#9-typescript-rules)
10. [Import & Export Rules](#10-import--export-rules)
11. [Folder Structure Reference](#11-folder-structure-reference)

---

## 1. Architecture Overview

This project follows **Clean Architecture** with strict layer separation:

```
app/          → Navigation only (Expo Router). NO business logic.
src/api/      → Supabase client + API service functions (Data Layer)
src/components/ → Passive UI components (Presentation Layer)
src/hooks/    → Business logic hooks (Application Layer)
src/services/ → Framework-agnostic domain logic (Domain Layer)
src/store/    → Zustand global state (State Layer)
src/types/    → TypeScript interfaces only (Contracts)
src/constants/→ Static values, enums, theme tokens (Shared)
src/utils/    → Pure helper functions (Shared)
```

### Dependency Rule (NEVER violate)

```
Screen (app/) → Components → Hooks → Services → API → Types
                                ↘ Store ↗
```

- **Inner layers MUST NOT import from outer layers.**
- Components NEVER call API directly.
- Services NEVER import React or hooks.
- Hooks orchestrate Services + API + Store.

---

## 2. SOLID Principles (Functional React Native)

### S — Single Responsibility

- **1 component = 1 purpose.** A `DeviceCard` renders a device. It does NOT fetch data or manage state.
- **1 hook = 1 concern.** `useAuth` handles auth. It does NOT manage devices.
- **1 service = 1 domain.** `WakeOnLanService` sends WOL packets. It does NOT handle Bluetooth.

### O — Open/Closed

- Extend behavior via **props and composition**, NOT by modifying existing components.
- Use `variant` props for visual variations (e.g., `<Button variant="primary" />`).
- Use `renderItem` / `renderHeader` function props for customizable sections.

```tsx
// ✅ GOOD — Open for extension via props
<Button variant="primary" />
<Button variant="outline" />

// ❌ BAD — Modifying the component for each use case
// Adding if/else inside Button for every new style
```

### L — Liskov Substitution

- Components sharing the same `Props` interface MUST be interchangeable.
- If `TextInput` and `SearchInput` both accept `InputProps`, swapping them must not break the parent.

### I — Interface Segregation

- Props interfaces should be **minimal**. Don't force components to accept unused props.
- Split large interfaces into smaller, focused ones.

```tsx
// ❌ BAD — Monolithic props
interface CardProps {
  device: Device;
  warranty: Warranty;
  bluetooth: BluetoothDevice;
  onEdit: () => void;
  onDelete: () => void;
  onScan: () => void;
}

// ✅ GOOD — Segregated
interface DeviceCardProps {
  device: Device;
  onPress: (device: Device) => void;
}
```

### D — Dependency Inversion

- Components depend on **interfaces (types)**, not concrete implementations.
- Hooks receive services via parameters or module imports, NOT by instantiating them.
- Services define clear interfaces so they can be swapped (e.g., JS → Native Expo Module).

---

## 3. Component Rules

### 3.1 — Functional Components ONLY

```tsx
// ✅ Always
function DeviceCard({ device }: DeviceCardProps) { ... }

// ❌ Never
class DeviceCard extends React.Component { ... }
```

### 3.2 — Every Component Has a Props Interface

```tsx
// ✅ Required
interface DeviceCardProps {
  device: Device;
  onPress: (device: Device) => void;
}

function DeviceCard({ device, onPress }: DeviceCardProps) { ... }

// ❌ Forbidden — inline types, any, or untyped props
function DeviceCard({ device, onPress }: any) { ... }
```

### 3.3 — Components Are Passive Views

- Components receive data via props and emit events via callbacks.
- NO API calls inside components.
- NO direct store access inside components (use hooks instead).
- Formatting/computation belongs in hooks or utils.

### 3.4 — Memoize List-Rendered Components

```tsx
// ✅ Any component rendered inside FlatList/FlashList MUST be memoized
export const DeviceCard = React.memo(DeviceCardComponent);
```

---

## 4. File Size Rules — The 150/200 Line Rule

### Threshold Table

| Lines  | Action Required                                              |
| ------ | ------------------------------------------------------------ |
| ≤ 150  | ✅ OK — Single file is fine                                  |
| 151–200 | ⚠️ SHOULD split — Evaluate if splitting improves readability |
| > 200  | 🚫 MUST split — Mandatory folder module pattern              |

### How to Split: Folder Module Pattern

When a component exceeds the threshold, convert it from a single file to a **folder module**:

```
# BEFORE (single file)
src/components/features/DeviceCard.tsx    ← 250 lines ❌

# AFTER (folder module)
src/components/features/DeviceCard/
├── index.tsx              ← Re-export (1-2 lines only)
├── DeviceCard.tsx         ← Pure UI: JSX + props destructuring
├── useDeviceCard.ts       ← Hook: all logic, state, callbacks
└── DeviceCard.styles.ts   ← StyleSheet.create({...})
```

### File Responsibilities After Split

| File                  | Contains                           | Does NOT contain         |
| --------------------- | ---------------------------------- | ------------------------ |
| `index.tsx`           | `export { DeviceCard } from './DeviceCard'` | Any logic or UI |
| `Component.tsx`       | JSX, props destructuring, hook call | useState, useEffect, StyleSheet |
| `useComponent.ts`     | useState, useEffect, useCallback, useMemo, API calls | JSX, StyleSheet |
| `Component.styles.ts` | `StyleSheet.create({...})`         | Logic, JSX               |

### Example After Split

**`DeviceCard/index.tsx`**
```tsx
export { DeviceCard } from './DeviceCard';
```

**`DeviceCard/DeviceCard.tsx`**
```tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDeviceCard } from './useDeviceCard';
import { styles } from './DeviceCard.styles';
import type { Device } from '@/src/types';

interface DeviceCardProps {
  device: Device;
  onPress: (device: Device) => void;
}

function DeviceCardComponent({ device, onPress }: DeviceCardProps) {
  const { statusColor, typeLabel, handlePress } = useDeviceCard({ device, onPress });

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.header}>
        <Text style={styles.name}>{device.name}</Text>
        <View style={[styles.dot, { backgroundColor: statusColor }]} />
      </View>
      <Text style={styles.type}>{typeLabel}</Text>
    </TouchableOpacity>
  );
}

export const DeviceCard = React.memo(DeviceCardComponent);
```

**`DeviceCard/useDeviceCard.ts`**
```tsx
import { useCallback, useMemo } from 'react';
import { Colors } from '@/src/constants';
import { DEVICE_TYPE_LABELS } from '@/src/constants/deviceTypes';
import type { Device } from '@/src/types';

interface UseDeviceCardParams {
  device: Device;
  onPress: (device: Device) => void;
}

export function useDeviceCard({ device, onPress }: UseDeviceCardParams) {
  const statusColor = useMemo(
    () => (device.is_online ? Colors.success : Colors.textSecondary),
    [device.is_online],
  );

  const typeLabel = useMemo(
    () => DEVICE_TYPE_LABELS[device.device_type] ?? device.device_type,
    [device.device_type],
  );

  const handlePress = useCallback(() => {
    onPress(device);
  }, [device, onPress]);

  return { statusColor, typeLabel, handlePress } as const;
}
```

**`DeviceCard/DeviceCard.styles.ts`**
```tsx
import { StyleSheet } from 'react-native';
import { Colors } from '@/src/constants';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.text,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  type: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 8,
  },
});
```

> **IMPORTANT:** The import path does NOT change for consumers:
> `import { DeviceCard } from '@/src/components/features/DeviceCard'` works for both single-file and folder-module.

---

## 5. Hook vs Helper — Clear Boundary

### Decision Table

| Question                                      | Yes → Hook (`hooks/`) | Yes → Util (`utils/`) |
| --------------------------------------------- | --------------------- | --------------------- |
| Does it use `useState`, `useEffect`, etc.?    | ✅                    |                       |
| Does it need React component lifecycle?       | ✅                    |                       |
| Is it a pure function with zero side effects? |                       | ✅                    |
| Can it be unit tested without rendering?      |                       | ✅                    |
| Does it manage subscriptions or listeners?    | ✅                    |                       |
| Is it just data transformation / formatting?  |                       | ✅                    |

### Examples

```tsx
// ✅ HOOK — uses React state + effects
function useDebounce<T>(value: T, delay: number): T { ... }
function useBluetooth() { ... }
function useAuth() { ... }

// ✅ UTIL — pure function, no React
function formatDate(dateString: string): string { ... }
function extractSerialNumber(text: string): string | null { ... }
function getDaysUntilExpiry(date: string): number { ... }
function isValidMacAddress(mac: string): boolean { ... }
```

### When to Create a Shared Hook

Create a hook in `/src/hooks/` when:
- **2+ screens** need the same stateful logic.
- The logic involves API calls + state management.
- It wraps a service with React lifecycle (e.g., `useBluetooth` wraps `BluetoothManager`).

**Do NOT** create a hook for single-use logic — keep it in the component's local `useComponentName.ts` file.

---

## 6. Naming Conventions

### Files & Folders

| Type             | Convention           | Example                     |
| ---------------- | -------------------- | --------------------------- |
| Component        | PascalCase           | `DeviceCard.tsx`            |
| Component folder | PascalCase           | `DeviceCard/`               |
| Hook             | camelCase, `use` prefix | `useAuth.ts`             |
| Service          | PascalCase + Service | `WakeOnLanService.ts`       |
| Store            | camelCase + Store    | `authStore.ts`              |
| Util/Helper      | camelCase            | `date.ts`, `regex.ts`       |
| Type file        | camelCase            | `database.ts`, `auth.ts`    |
| Constant file    | camelCase            | `colors.ts`, `configs.ts`   |
| Style file       | PascalCase + `.styles` | `DeviceCard.styles.ts`    |

### Code Identifiers

| Type             | Convention           | Example                     |
| ---------------- | -------------------- | --------------------------- |
| Component        | PascalCase           | `DeviceCard`                |
| Props interface  | PascalCase + `Props` | `DeviceCardProps`           |
| Hook             | camelCase, `use` prefix | `useAuth`, `useBluetooth` |
| Hook params      | PascalCase + `Params`| `UseDeviceCardParams`       |
| Service object   | PascalCase           | `WakeOnLanService`          |
| Zustand store    | `use` + PascalCase + `Store` | `useAuthStore`     |
| Enum             | PascalCase           | `DeviceType`                |
| Enum values      | UPPER_SNAKE_CASE     | `DeviceType.SMART_LIGHT`    |
| Constants        | UPPER_SNAKE_CASE     | `BLE_SCAN_TIMEOUT_MS`       |
| Type alias       | PascalCase           | `WarrantyStatus`            |
| Util function    | camelCase            | `formatDate`, `getDaysUntilExpiry` |
| Callback prop    | `on` + Verb          | `onPress`, `onDeviceSelect` |
| Boolean prop     | `is/has/should` prefix | `isLoading`, `hasError`   |
| Boolean variable | `is/has/should` prefix | `isConnected`, `hasPermission` |

### Folder Path Conventions

```tsx
// ✅ Always use path alias
import { Button } from '@/src/components';
import { useAuth } from '@/src/hooks';
import { Colors } from '@/src/constants';
import type { Device } from '@/src/types';

// ❌ Never use relative paths across layers
import { Button } from '../../../components/common/Button';
```

---

## 7. Performance Rules

### 7.1 — Prevent Unnecessary Re-renders

```tsx
// ✅ Stable callback reference
const handlePress = useCallback(() => {
  onDeviceSelect(device);
}, [device, onDeviceSelect]);

// ❌ Anonymous function in JSX — creates new reference every render
<TouchableOpacity onPress={() => onDeviceSelect(device)} />
```

### 7.2 — Memoize Derived Values

```tsx
// ✅ Computed only when dependencies change
const activeDevices = useMemo(
  () => devices.filter((d) => d.is_online),
  [devices],
);

// ❌ Recalculated every render
const activeDevices = devices.filter((d) => d.is_online);
```

### 7.3 — List Rendering

```tsx
// ✅ Always FlatList or FlashList for dynamic lists
<FlatList
  data={devices}
  renderItem={renderItem}
  keyExtractor={keyExtractor}
/>

// ❌ Never ScrollView + .map() for lists > 10 items
<ScrollView>
  {devices.map((d) => <DeviceCard key={d.id} device={d} />)}
</ScrollView>
```

### 7.4 — Stable keyExtractor

```tsx
// ✅ Defined outside component or with useCallback
const keyExtractor = useCallback((item: Device) => item.id, []);

// ❌ Inline function
keyExtractor={(item) => item.id}
```

### 7.5 — Memoize List Items

```tsx
// ✅ Components rendered in lists MUST use React.memo
export const DeviceCard = React.memo(DeviceCardComponent);
```

---

## 8. Styling Rules

### 8.1 — Always Use StyleSheet.create()

```tsx
// ✅ Optimized at native bridge level
const styles = StyleSheet.create({
  container: { flex: 1 },
});

// ❌ Never inline styles
<View style={{ flex: 1, padding: 16 }} />
```

### 8.2 — No Hardcoded Colors

```tsx
// ✅ Use theme tokens
import { Colors } from '@/src/constants';
color: Colors.primary

// ❌ Magic color strings
color: '#2563EB'
```

### 8.3 — Responsive Sizing

```tsx
import { Dimensions } from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;

// ✅ Responsive
width: SCREEN_WIDTH * 0.9

// ❌ Hardcoded
width: 350
```

### 8.4 — Use Theme Spacing

```tsx
import { Theme } from '@/src/constants';

// ✅ Consistent spacing
padding: Theme.spacing.md      // 16
marginBottom: Theme.spacing.sm  // 8

// ❌ Magic numbers
padding: 16
marginBottom: 8
```

---

## 9. TypeScript Rules

### 9.1 — Strict Mode (enforced in tsconfig.json)

- `strict: true` — No implicit any, no unchecked index access.
- **NEVER** use `any`. Use `unknown` if the type is truly unknown, then narrow it.
- **NEVER** use `@ts-ignore` or `@ts-expect-error` without a comment explaining why.

### 9.2 — Interface Over Type (for objects)

```tsx
// ✅ Use interface for object shapes (extendable)
interface DeviceCardProps {
  device: Device;
  onPress: (device: Device) => void;
}

// ✅ Use type for unions, intersections, or primitives
type WarrantyStatus = 'active' | 'expiring' | 'expired';
type DeviceInsert = Omit<Device, 'id' | 'created_at'>;
```

### 9.3 — API Response Typing

```tsx
// ✅ Every API function has typed return
async function getAll(): Promise<Device[]> { ... }

// ❌ Untyped
async function getAll() { ... }
```

### 9.4 — Enum Usage

```tsx
// ✅ String enums for readability
enum DeviceType {
  FAN = 'fan',
  AC = 'ac',
  PC = 'pc',
}

// ❌ Numeric enums (unreadable in logs/DB)
enum DeviceType {
  FAN,    // 0
  AC,     // 1
}
```

### 9.5 — Never Use Raw Strings as Type Identifiers

All categorical/discriminator values MUST use **string enums**, never raw string literals or union string types.

```tsx
// ✅ GOOD — Enum: single source of truth, refactorable, auto-completable
enum ProductType {
  HARDWARE = 'hardware',
  SMART_DEVICE = 'smart_device',
}

interface Product {
  product_type: ProductType;
}

if (product.product_type === ProductType.HARDWARE) { ... }

// ❌ BAD — String literal union: scattered, typo-prone, not refactorable
type ProductType = 'hardware' | 'smart_device';

if (product.product_type === 'hardware') { ... }
```

**Why:** Enums provide a single source of truth. When you rename a value, TypeScript catches every usage. String literals scatter across files and silently break on typos.

---

## 10. Import & Export Rules

### 10.1 — Barrel Exports

Every directory with 2+ files MUST have an `index.ts` barrel file:

```tsx
// src/hooks/index.ts
export { useAuth } from './useAuth';
export { useBluetooth } from './useBluetooth';
```

### 10.2 — Type-Only Imports

```tsx
// ✅ Use `import type` for types
import type { Device, Warranty } from '@/src/types';

// ❌ Regular import for types (may cause circular dep issues)
import { Device, Warranty } from '@/src/types';
```

### 10.3 — Import Order

Organize imports in this order (with blank lines between groups):

```tsx
// 1. React / React Native
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// 2. Third-party libraries
import { useRouter } from 'expo-router';
import BleManager from 'react-native-ble-manager';

// 3. Internal modules (@/ alias)
import { Button } from '@/src/components';
import { useAuth } from '@/src/hooks';
import { Colors } from '@/src/constants';

// 4. Relative imports (same module)
import { useDeviceCard } from './useDeviceCard';
import { styles } from './DeviceCard.styles';

// 5. Type imports (always last)
import type { Device } from '@/src/types';
```

---

## 11. Folder Structure Reference

```
SmartKeep/
├── app/                         # Expo Router — screens & navigation
│   ├── (auth)/                  #   Auth flow (login, register)
│   ├── (tabs)/                  #   Main tab screens
│   ├── (modals)/                #   Modal screens
│   ├── _layout.tsx              #   Root navigator
│   └── +not-found.tsx           #   404 screen
│
├── src/                         # Core domain
│   ├── api/                     #   Supabase client + API services
│   ├── components/
│   │   ├── common/              #   Reusable: Button, Input, etc.
│   │   └── features/            #   Domain: DeviceCard, WarrantyList, etc.
│   ├── constants/               #   Colors, Theme, Configs, DeviceTypes
│   ├── hooks/                   #   Shared hooks: useAuth, useBLE, etc.
│   ├── services/                #   Domain logic: WOL, BLE, OCR, Notifs
│   ├── store/                   #   Zustand: authStore, deviceStore
│   ├── types/                   #   TypeScript interfaces
│   └── utils/                   #   Pure helpers: date, warranty, regex
│
├── modules/                     # Expo Modules (future native Kotlin/Swift)
├── assets/                      # fonts, images, icons
├── CONVENTIONS.md               # ← THIS FILE (source of truth)
└── tsconfig.json
```

---

## Quick Reference Card

```
✅ DO                              ❌ DON'T
─────────────────────────────────────────────────────────
Functional components              Class components
React.memo for list items          Unmemoized list items
useCallback for handlers           Anonymous functions in JSX
useMemo for derived data           Recompute every render
FlatList for lists                  ScrollView + .map()
StyleSheet.create()                 Inline styles
Colors.primary                     '#2563EB'
import type { X }                  import { X } (for types)
Interface for props                 any / untyped props
Path alias @/src/...               Relative ../../..
Split at 200+ lines                God components
Hook for stateful logic            Util for stateful logic
Util for pure functions            Hook for pure functions
```

---

*Last updated: 2026-03-19*
*Maintained by the SmartKeep team. Update this file, not the AI-specific copies.*
