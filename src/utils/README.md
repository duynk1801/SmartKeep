# /src/utils — Pure Helper Functions

## Responsibility

Contains **pure, stateless utility functions** with zero side effects:
- `date.ts` — Date formatting and parsing
- `warranty.ts` — Warranty status calculation and days-until-expiry
- `regex.ts` — Serial number extraction patterns

## Rules

1. **Pure functions only** — no state, no side effects, no imports from React or services.
2. Every function must be unit-testable in isolation.
3. All functions must have typed parameters and return values.
4. Use `as const` for any returned constant objects.
