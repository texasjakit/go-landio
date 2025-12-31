# LANDIO Architecture Documentation

## Overview

LANDIO is built using Next.js 16 with the App Router, TypeScript, Tailwind CSS v4, and Framer Motion. The architecture follows a flexible **Block System** that enables rapid content composition and easy maintenance.

## Core Architecture: Block System

### BlockRenderer Component

The heart of the system is `components/BlockRenderer.tsx`, which maps block type strings to React components.

```typescript
// Simplified BlockRenderer structure
const blockComponents = {
  Hero: Hero,
  ContentSection: ContentSection,
  Pricing: Pricing,
  SectionTitle: SectionTitle,
  CTA: CTA,
  Footer: Footer,
  // ... more blocks
};

export default function BlockRenderer({ block }: { block: BlockData }) {
  const Component = blockComponents[block.type];
  return Component ? <Component {...block.props} /> : null;
}
```

### Data Structure

Pages are defined as arrays of `BlockData` objects:

```typescript
interface BlockData {
  id: string;        // Unique identifier for React keys
  type: BlockType;   // Union type of all available blocks
  props: any;        // Props specific to each block component
}

interface PageData {
  title: string;
  description: string;
  blocks: BlockData[];
}
```

### Page Composition

Pages (like `app/page.tsx`) define content as configuration:

```typescript
const pageData: PageData = {
  title: "LANDIO",
  description: "Flat-fee property marketing",
  blocks: [
    { id: "hero-1", type: "Hero", props: { ... } },
    { id: "pricing-1", type: "Pricing", props: { ... } },
    // ... more blocks
  ]
};
```

This approach provides:
- **Separation of content and presentation**
- **Easy reordering** (just rearrange array)
- **CMS-ready** (blocks can come from API/database)
- **Type safety** (TypeScript enforces block types)

## Block Components

### 1. Hero (`components/blocks/Hero.tsx`)

Large introductory section with sequential entrance animations.

**Features:**
- Parallax background image
- Sequential entrance animations (title → subtitle → logo → description → CTA)
- Responsive logo sizing
- CTA button with hover effects

**Props:**
```typescript
interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
}
```

**Animation Timing:**
- Title: 0s delay
- Subtitle: 0.3s delay
- Logo: 0.6s delay
- Description: 1s delay
- CTA: 1.4s delay

All elements animate with `y: 30 → 0` for consistent upward motion.

### 2. ContentSection (`components/blocks/ContentSection.tsx`)

The most versatile block with two distinct variants.

#### Variant: Featured

Side-by-side layout with text and image.

**Features:**
- Left/right orientation
- Image hover effects (lift, shine, border glow)
- Configurable image positioning and brightness
- Optional image bleed for dynamic cropping

**Props:**
```typescript
interface ContentSectionProps {
  variant: "featured";
  title: string;
  description: string;
  imageUrl: string;
  imageAlt?: string;
  orientation?: "left" | "right";      // Default: "left"
  imageBleed?: number;                  // 0-20+ for crop extension
  imagePositionY?: string;             // "top", "center", "bottom", "30%"
  imageBrightness?: number;            // 0-100 (default: 80)
}
```

#### Variant: Parallax

Full-screen background image with overlaid content card.

**Features:**
- Parallax scrolling background
- Glassmorphism content card
- Dynamic background positioning
- Configurable darkness overlay

**Props:**
```typescript
interface ContentSectionProps {
  variant: "parallax";
  title: string;
  description: string;
  imageUrl: string;
  orientation?: "left" | "right";
  imageBleed?: number;                  // Default: 0 (scale: 1.0)
  imagePositionY?: string;
  imageBrightness?: number;             // Controls overlay darkness
}
```

**Image Control Parameters:**

- **imageBleed**: Extends image beyond container
  - `0` = no bleed (1.0 scale)
  - `10` = 10% bleed (1.2 scale)
  - `20` = 20% bleed (1.4 scale)

- **imagePositionY**: Vertical positioning
  - `"top"` = show top of image
  - `"center"` = center image (default)
  - `"bottom"` = show bottom
  - `"30%"` = 30% from top
  - `"-10%"` = nudge up 10%

- **imageBrightness**: Image darkness (0-100)
  - `100` = full brightness
  - `80` = slightly dimmed (default)
  - `50` = half brightness
  - `0` = completely dark

### 3. Pricing (`components/blocks/Pricing.tsx`)

Pricing cards with 3D tilt and spotlight effects.

**Features:**
- 3D card tilt on hover
- Mouse-following spotlight gradient
- Optional plan highlighting
- Fixed-width cards (320px) for consistent sizing
- Center card has extra height (540px vs 480px)

**Props:**
```typescript
interface PricingPlan {
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  highlight?: boolean;
}

interface PricingProps {
  title: string;
  subtitle?: string;
  plans: PricingPlan[];
}
```

### 4. SectionTitle (`components/blocks/SectionTitle.tsx`)

Standalone section headers.

**Props:**
```typescript
interface SectionTitleProps {
  title: string;
  align?: "left" | "center" | "right";
}
```

### 5. CTA (`components/blocks/CTA.tsx`)

Call-to-action sections with button.

**Props:**
```typescript
interface CTAProps {
  title: string;
  description?: string;
  buttonText: string;
  buttonLink: string;
}
```

### 6. Footer (`components/blocks/Footer.tsx`)

Site footer with branding and copyright.

**Props:**
```typescript
interface FooterProps {
  copyright: string;
}
```

## Supporting Components

### CursorLight (`components/CursorLight.tsx`)

Static ambient light effect positioned near the bottom center of the viewport.

**Features:**
- Fixed positioning (no mouse tracking)
- Mix-blend-screen for atmospheric glow
- 1200px diameter radial gradient
- Positioned at `left: 50%, bottom: 15%`

### SmoothScroll (`components/SmoothScroll.tsx`)

Lenis smooth scroll wrapper.

**Configuration:**
```typescript
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});
```

### BlockRenderer (`components/BlockRenderer.tsx`)

Central component that renders blocks based on type.

## Design System

Centralized in `lib/design-tokens.ts` and documented in `lib/DESIGN_SYSTEM.md`.

### Token Categories

- **contentWidths**: Max-width constraints
- **typography**: Font sizes, weights, line heights, tracking
- **spacing**: Gaps, padding, margins
- **colors**: Brand and UI colors
- **borderRadius**: Consistent border radii
- **animations**: Animation speeds (fast, normal, slow)
- **effects**: Glassmorphism, shadows, gradients

### Usage

```typescript
import { typography, spacing, contentWidths } from "@/lib/design-tokens";

<div className={cn(typography.headingXL, spacing.sectionPadding)}>
  <div style={{ maxWidth: contentWidths.contentBoxLarge }}>
    {/* content */}
  </div>
</div>
```

## Type System

Located in `types/index.ts`:

```typescript
// Block type union
export type BlockType =
  | "Hero"
  | "ContentSection"
  | "Pricing"
  | "SectionTitle"
  | "CTA"
  | "Footer"
  | "Content";  // Reserved for future use

export interface BlockData {
  id: string;
  type: BlockType;
  props: any;
}

export interface PageData {
  title: string;
  description: string;
  blocks: BlockData[];
}
```

## Performance Optimizations

### Cumulative Layout Shift (CLS)

- **Font Loading**: `display: swap` on Google Fonts
- **Image Containers**: Proper aspect ratios with `aspect-[...]`
- **Animations**: No layout-shifting transforms
- **Overflow**: `overflow-x-hidden` prevents horizontal scroll
- **Logo**: Fixed aspect ratio container prevents reflow

### Animation Strategy

- **Opacity + Y-transform only**: Prevents layout shifts
- **GPU acceleration**: `will-change-transform` on animated elements
- **RAF throttling**: Smooth scroll limited to 60fps
- **Sequential timing**: Staggered delays for elegant entrance

### Image Optimization

- **Next.js Image**: Automatic optimization and lazy loading
- **Priority loading**: Above-the-fold images use `priority`
- **Proper sizing**: `sizes` attribute for responsive images
- **Object-fit**: `object-cover` for consistent framing

## Adding New Blocks

1. **Create Component** in `components/blocks/YourBlock.tsx`
2. **Define Props Interface** with proper TypeScript types
3. **Import in BlockRenderer** (`components/BlockRenderer.tsx`)
4. **Add to blockComponents Map**:
   ```typescript
   const blockComponents = {
     YourBlock: YourBlock,
     // ... existing blocks
   };
   ```
5. **Update BlockType Union** in `types/index.ts`:
   ```typescript
   export type BlockType =
     | "YourBlock"
     | "Hero"
     // ... existing types
   ```
6. **Use in Page** by adding to blocks array

## Styling Philosophy

- **Utility-first**: Tailwind CSS for rapid development
- **Component-scoped**: Styles live with components
- **Token-based**: Use design tokens for consistency
- **Mobile-first**: Responsive with `md:` and `lg:` breakpoints
- **Dark theme**: Black background (#000) with accent colors
- **High contrast**: White text on dark backgrounds
- **Generous whitespace**: `py-24 lg:py-32` for breathing room

## Animation Principles

1. **Sequential entrance**: Elements animate in order
2. **Consistent direction**: All move upward (y: 30 → 0)
3. **Staggered timing**: 0.3-0.4s between elements
4. **No scaling**: Prevents layout shifts and CLS issues
5. **Ease-out**: Smooth deceleration (`easeOut`)
6. **Once only**: `viewport={{ once: true }}` prevents re-animation on scroll

## Future Enhancements

- **CMS Integration**: Fetch `blocks` from headless CMS
- **Dynamic routing**: Generate pages from CMS data
- **Block library**: Visual block picker UI
- **A/B testing**: Block-level experimentation
- **Analytics**: Track block performance
- **SEO**: Structured data for property listings
