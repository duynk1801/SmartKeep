# /src/constants — Shared Constants

## Responsibility

Single source of truth for all **static values** used across the application:
- Color palette and theme tokens
- App configuration (Supabase URLs, feature flags)
- Device type enums and labels

## Rules

1. All values are **readonly** — use `as const` assertions.
2. No runtime logic — only static declarations.
3. Colors should support both light and dark themes.
