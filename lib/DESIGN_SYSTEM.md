# Design System Usage Guide

## Overview

The design system provides centralized configuration for consistent design values across all components. All tokens are defined in `lib/design-tokens.ts`.

## How to Use

### 1. Import the tokens you need:

```typescript
import { contentWidths, typography, spacing, borderRadius, effects } from "@/lib/design-tokens";
```

### 2. Use tokens in your className strings:

```typescript
// Instead of hardcoding:
<div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">

// Use design tokens:
<div className={cn(typography.headingXL, typography.fontBold, spacing.contentGap)}>
```

## Token Categories

### Content Widths

**Use for:** Consistent sizing of content boxes, cards, and containers

```typescript
contentWidths.contentBox    // '422px' - Standard content box width
contentWidths.card          // '320px' - Pricing/feature card width
contentWidths.maxWidthXl    // '1280px' - Container max width
```

**Example:**
```typescript
<div className={`w-full md:w-[${contentWidths.contentBox}]`}>
```

### Spacing

**Use for:** Consistent padding and margins

```typescript
// Section padding (vertical)
spacing.sectionPaddingTight   // 'py-12 md:py-16' (48px / 64px)
spacing.sectionPaddingNormal  // 'py-16 md:py-24' (64px / 96px)
spacing.sectionPaddingLoose   // 'py-24 md:py-32' (96px / 128px)

// Title gaps
spacing.titleGapTight         // 'mb-8' (32px)
spacing.titleGapNormal        // 'mb-12' (48px)
spacing.titleGapLoose         // 'mb-16' (64px)
```

**Example:**
```typescript
<section className={cn("relative overflow-hidden", spacing.sectionPaddingNormal)}>
```

### Typography

**Use for:** Consistent text sizing and styling

```typescript
// Heading sizes
typography.headingXXL      // Section titles (standalone) - text-4xl md:text-6xl lg:text-7xl
typography.headingXL       // Section/feature titles - text-3xl md:text-4xl lg:text-5xl
typography.headingLg       // Subsection titles
typography.headingMd       // Card titles

// Font weights
typography.fontBold
typography.fontMedium
typography.fontLight

// Tracking
typography.trackingTight
typography.trackingWide
```

**Example:**
```typescript
<h2 className={cn(typography.headingXL, typography.fontBold, typography.trackingTight)}>
```

### Effects

**Use for:** Common visual effects

```typescript
effects.backdropBlur       // 'backdrop-blur-xl'
effects.glassmorph        // 'bg-black/30 backdrop-blur-xl border border-white/10'
```

### Border Radius

```typescript
borderRadius.sm    // 'rounded-lg' (8px)
borderRadius.md    // 'rounded-xl' (12px)
borderRadius.lg    // 'rounded-2xl' (16px)
borderRadius.xl    // 'rounded-3xl' (24px)
borderRadius.full  // 'rounded-full'
```

### Colors

```typescript
colors.bgDark           // 'bg-black'
colors.textPrimary      // 'text-white'
colors.textSecondary    // 'text-gray-400'
colors.borderDark       // 'border-[#333]'
colors.borderAccent     // 'border-teal-500/30'
```

### Animations

**Use for:** Framer Motion animation durations

```typescript
animations.fast       // 0.3s
animations.normal     // 0.5s
animations.slow       // 0.8s
animations.verySlow   // 1.0s
```

**Example:**
```typescript
<motion.div
  transition={{ duration: animations.slow }}
>
```

## Real-World Example

### Before (hardcoded values):

```typescript
<motion.div
  transition={{ duration: 0.8 }}
  className="w-full md:w-1/2 lg:w-5/12 p-8 md:p-12 rounded-3xl bg-black/30 backdrop-blur-xl border border-white/10"
>
  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
    {title}
  </h2>
</motion.div>
```

### After (using design tokens):

```typescript
import { contentWidths, typography, spacing, borderRadius, effects, animations } from "@/lib/design-tokens";

<motion.div
  transition={{ duration: animations.slow }}
  className={cn(
    `w-full md:w-[${contentWidths.contentBox}]`,
    "p-8 md:p-12",
    borderRadius.xl,
    effects.glassmorph
  )}
>
  <h2 className={cn(
    typography.headingXL,
    typography.fontBold,
    spacing.contentGap,
    typography.trackingTight
  )}>
    {title}
  </h2>
</motion.div>
```

## Benefits

1. **Consistency**: All components use the same values
2. **Maintainability**: Change values in one place, affects all components
3. **Readability**: Semantic names make intent clear
4. **Scalability**: Easy to add new tokens as needed
5. **Type Safety**: TypeScript provides autocomplete and validation

## Migration Guide

To migrate existing components:

1. Import the relevant tokens
2. Replace hardcoded values with token references
3. Use `cn()` utility to combine multiple classes
4. Test the component to ensure visual appearance is unchanged

## Adding New Tokens

To add new design tokens:

1. Open `lib/design-tokens.ts`
2. Add to the appropriate category or create a new one
3. Export the constant using `as const` for type safety
4. Document the new token in this guide
