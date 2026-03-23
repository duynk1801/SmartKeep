# /src/hooks — Application Layer (Custom Hooks)

## Responsibility

Contains all **business logic hooks** that bridge UI with services/API:
- `useAuth` — Authentication state & actions
- `useBluetooth` — BLE scanning & device connection
- `useWiFi` — WiFi network discovery
- `useWarranty` — Warranty CRUD + expiry calculations

## Rules

1. Hooks orchestrate calls to `/src/api` and `/src/services`.
2. Use `useCallback` for all returned functions to prevent re-renders.
3. Use `useMemo` for derived/computed values.
4. Never import React Native UI components here.
5. Each hook should have a single responsibility.
