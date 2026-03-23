# /app — Expo Router (File-Based Navigation)

## Responsibility

This directory is the **navigation shell** of the application.  
Expo Router maps each file/folder to a route automatically.

## Route Groups

| Group       | Purpose                                     |
| ----------- | ------------------------------------------- |
| `(tabs)`    | Bottom tab navigator — main app screens     |
| `(auth)`    | Authentication flow (Login, Register, etc.) |
| `(modals)`  | Modal screens (Add Device, Scan, etc.)      |

## Rules

1. **No business logic here.** Screens import hooks from `/src/hooks` and components from `/src/components`.
2. Files must use `.tsx` extension.
3. Layout files (`_layout.tsx`) define navigators and shared UI (headers, tab bars).
4. Use `+not-found.tsx` for 404 handling.
