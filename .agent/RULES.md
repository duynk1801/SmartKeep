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

**For complete rules, read: `CONVENTIONS.md`**
