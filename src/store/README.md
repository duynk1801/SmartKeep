# /src/store — State Management (Zustand)

## Responsibility

Global state management using **Zustand** stores:
- `authStore` — Authentication state (user, session, loading)
- `deviceStore` — Device list state and selected device

## Rules

1. Each store is a **single file** with a focused concern.
2. Use the `create` function from Zustand with typed state + actions.
3. Stores expose **atomic actions** — no complex business logic here.
4. Business logic belongs in `/src/hooks` which consume these stores.
5. Use `immer` middleware only if deeply nested state updates become unmanageable.
