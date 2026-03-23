# /src/services — Domain Logic Layer

## Responsibility

Contains **core business logic** that is framework-independent:
- `WakeOnLanService` — Send WOL magic packets to wake devices
- `BluetoothManager` — Higher-level BLE operations (pair, command, etc.)
- `OCRProcessor` — Text extraction from warranty photos
- `NotificationService` — Local notification scheduling for warranty expiry

## Rules

1. Services are **pure logic modules** — no React, no hooks, no UI.
2. Each service is a singleton object or class.
3. Services can call `/src/api` but NEVER import from `/src/hooks` or `/src/components`.
4. All public methods must have typed parameters and return values.
5. Services are designed to be easily replaceable with Expo Modules (native Kotlin/Swift) in the future.
