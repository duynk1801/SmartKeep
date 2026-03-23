# SmartKeep — Claude Instructions

You are working on **SmartKeep**, a React Native Expo app for IoT device management and warranty tracking.

## MANDATORY

Before making ANY code changes, read and follow ALL rules in **`CONVENTIONS.md`** at the project root.

That file is the single source of truth for:
- Architecture layers and dependency rules
- The 150/200 line component splitting rule
- Hook vs Util boundaries
- Naming conventions
- Performance rules (React.memo, useCallback, useMemo, FlatList)
- TypeScript strict rules
- Styling rules (StyleSheet only, theme tokens)
- Import ordering and barrel exports

## Quick Reference

```
✅ DO                              ❌ DON'T
──────────────────────────────────────────────────────
Functional components              Class components
React.memo for list items          Unmemoized list items
useCallback for handlers           Anonymous functions in JSX
useMemo for derived data           Recompute every render
FlatList for lists                  ScrollView + .map()
StyleSheet.create()                 Inline styles
Colors.primary                     '#2563EB'
import type { X }                  import { X } (for types)
Interface for props                 any / untyped props
Path alias @/src/...               Relative ../../..
Split at 200+ lines                God components
Hook for stateful logic            Util for stateful logic
Util for pure functions            Hook for pure functions
```

## File Size Rule

- **≤ 150 lines** → Single file OK
- **151–200 lines** → Should split
- **> 200 lines** → Must split into folder module:
  ```
  Component/
  ├── index.tsx            # Re-export
  ├── Component.tsx        # Pure UI
  ├── useComponent.ts      # Hook (logic)
  └── Component.styles.ts  # StyleSheet
  ```
