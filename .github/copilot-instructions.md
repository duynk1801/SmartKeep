# SmartKeep — Copilot Instructions

You are working on **SmartKeep**, a React Native Expo app for IoT device management and warranty tracking.

## MANDATORY

Before making ANY code changes, read and follow ALL rules in **`CONVENTIONS.md`** at the project root.

## Critical Rules

1. **Clean Architecture**: app/ → components → hooks → services → api → types. Never skip layers.
2. **150/200 Line Rule**: Components > 150 lines SHOULD split. > 200 MUST split into folder module (Component.tsx + useComponent.ts + Component.styles.ts + index.tsx).
3. **Hook ≠ Helper**: Hooks use React state/effects (`src/hooks/`). Utils are pure functions (`src/utils/`).
4. **Performance**: `React.memo` for list items, `useCallback` for handlers, `useMemo` for computed values, `FlatList` over `ScrollView`.
5. **TypeScript Strict**: No `any`. Interface for props. `import type` for types.
6. **Styling**: Always `StyleSheet.create()`. Use `Colors` and `Theme` constants. No inline styles.
7. **Naming**: PascalCase components, `useXxx` hooks, `XxxService` services, `UPPER_SNAKE` constants.
8. **Imports**: Use `@/` alias. Never relative paths across layers. Barrel exports required.
