# /src/components — Presentation Layer

## Responsibility

All **reusable UI components**, organized by scope:

| Folder     | Scope                                          |
| ---------- | ---------------------------------------------- |
| `common/`  | Generic, app-wide components (Button, Input)   |
| `features/`| Domain-specific components (DeviceCard, etc.)  |

## Rules

1. Components are **passive views** — they receive data via props and emit events via callbacks.
2. **No business logic.** Use hooks from `/src/hooks` for stateful behavior.
3. Every component must have a typed `Props` interface.
4. Use `React.memo()` for list-rendered components to prevent unnecessary re-renders.
5. Use `SCREEN_WIDTH` scaling pattern — no hardcoded pixel values.
