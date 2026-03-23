# /modules — Expo Modules (Native Code)

## Responsibility

This directory is reserved for **Expo Modules** — custom native code written in Kotlin (Android) and Swift (iOS).

Potential modules:
- `wake-on-lan` — Native UDP broadcast for WOL magic packets
- `ble-advanced` — Low-level BLE operations not covered by JS libraries
- `ocr-engine` — On-device text recognition (MLKit / Vision)

## Structure (per module)

```
modules/
└── wake-on-lan/
    ├── expo-module.config.json
    ├── src/
    │   └── WakeOnLanModule.ts       # JS interface
    ├── android/
    │   └── src/main/java/...        # Kotlin implementation
    └── ios/
        └── WakeOnLanModule.swift     # Swift implementation
```

## How to Create

```bash
npx create-expo-module@latest modules/wake-on-lan
```

## Rules

1. Keep the JS interface in `src/` and native code in `android/` + `ios/`.
2. Always define TypeScript types for the module's API surface.
3. Services in `/src/services` should call these modules via their TS interface.
