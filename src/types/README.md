# /src/types — TypeScript Interfaces & Type Definitions

## Responsibility

Single source of truth for all **type contracts** across the app:
- Database schema types (mirrors Supabase tables)
- Auth-related types
- App state interfaces
- API request/response shapes

## Rules

1. **No runtime code.** Only `interface`, `type`, and `enum` declarations.
2. Database types should mirror Supabase schema exactly (use `supabase gen types` to regenerate).
3. Export everything through `index.ts` barrel file.
4. Prefix insert/update variants: `DeviceInsert`, `DeviceUpdate`.
