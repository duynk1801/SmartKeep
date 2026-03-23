# /src — Application Source Code

## Responsibility

This is the **core domain** of the application, organized by Clean Architecture layers.  
Every module inside `/src` is framework-agnostic and testable in isolation.

## Layer Dependency Rule

```
UI (components) → Hooks → Services → API → Types
       ↑                                    ↑
       └────────── Constants ───────────────┘
```

**Inner layers MUST NOT depend on outer layers.**

## Directory Map

| Directory      | Layer          | Purpose                                      |
| -------------- | -------------- | -------------------------------------------- |
| `api/`         | Data           | Supabase client & API service functions       |
| `components/`  | Presentation   | Reusable UI components (common + features)    |
| `constants/`   | Shared         | Colors, themes, configs, device type enums    |
| `hooks/`       | Application    | Business logic hooks (BLE, WiFi, Auth, etc.)  |
| `services/`    | Domain         | Core logic (WOL, BLE Manager, OCR, Notifs)    |
| `store/`       | State          | Zustand stores for global state               |
| `types/`       | Shared         | TypeScript interfaces & type definitions      |
| `utils/`       | Shared         | Pure helper functions (date, regex, calc)      |
