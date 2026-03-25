# SmartKeep — AI Agent Rules

> **You MUST read and follow `CONVENTIONS.md` at the project root before making ANY changes.**
> Run: `cat CONVENTIONS.md` or read the file directly.

## Critical Rules Summary

1. **Clean Architecture** — Screens (app/) → Components → Hooks → Services → API → Types. Never skip layers.
2. **150/200 Line Rule** — Components > 150 lines SHOULD be split. > 200 lines MUST be split into folder module (Component.tsx + useComponent.ts + Component.styles.ts + index.tsx).
3. **Hook ≠ Helper** — Hooks use React state/effects. Utils are pure functions. Never mix them.
4. **Performance** — React.memo for list items, useCallback for handlers, useMemo for derived data, FlatList over ScrollView.
5. **TypeScript Strict** — No `any`. Interface for props. `import type` for type-only imports.
6. **No inline styles** — Always `StyleSheet.create()`. Use `Colors` and `Theme` tokens.
7. **Naming** — PascalCase components, camelCase hooks (useXxx), PascalCase services (XxxService).

8. **Communication Protocol** — Before implementing ANY request:
   - **Ask First**: Always ask clarifying questions to fully understand the scope, expected behavior, and edge cases before writing any code. Do NOT assume.
   - **Explain During**: When implementing, describe in detail WHAT you are doing and WHY at each step. Each code change must be preceded by a clear explanation of the intent and impact.
   - **Confirm Ambiguity**: If a request is ambiguous or has multiple valid approaches, list the options and let the user choose before proceeding.

**For complete rules, read: `CONVENTIONS.md`**
