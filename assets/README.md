# /assets — Static Resources

## Structure

```
assets/
├── fonts/        # Custom font files (.ttf, .otf)
├── images/       # App icons, splash, illustrations
└── icons/        # SVG or PNG icon assets
```

## Rules

1. Use descriptive filenames: `icon-bluetooth.png`, not `ic_1.png`.
2. Images should be provided in @1x, @2x, @3x for proper scaling.
3. Icons should be consistent in style and size (24x24, 32x32).
4. Reference via `require()` or `expo-image` for optimized loading.
