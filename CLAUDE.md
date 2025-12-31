# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LANDIO is a Next.js 16 application built with TypeScript, Tailwind CSS v4, and Framer Motion. It's a marketing platform for land/property listings using a flexible block-based architecture.

## Common Commands

```bash
# Build the project
npm run build

# Production start
npm start

# Lint
npm run lint
```

## Block Architecture

The core of this system is a **Block Renderer** pattern that allows flexible page composition:

1. **BlockRenderer** (`components/BlockRenderer.tsx`): Central component that maps block types to React components
2. **Block Types** (`types/index.ts`): Defines available block types as a union type
3. **Page Composition** (`app/page.tsx`): Pages are defined as arrays of `BlockData` objects

### Available Block Types

- `Hero`: Large introductory section with title, subtitle, CTA
- `SectionTitle`: Standalone section titles with alignment options
- `FeatureRows`: Full-width feature sections with image and text
- `ParallaxContent`: Parallax sections with left/right orientation
- `Pricing`: Pricing cards with optional highlight
- `CTA`: Call-to-action sections
- `Footer`: Footer component
- `Content`: Placeholder type (renders nothing)

### Adding a New Block Type

1. Create component in `components/blocks/`
2. Import in `components/BlockRenderer.tsx` and add to `blockComponents` map
3. Add type to `BlockType` union in `types/index.ts`
4. Use in `app/page.tsx` by adding to `blocks` array

## Key Technical Details

### Path Aliases
- `@/*` maps to project root (configured in `tsconfig.json`)

### Utilities
- `lib/utils.ts` exports `cn()` helper for merging Tailwind classes with clsx and tailwind-merge
- `lib/design-tokens.ts` provides centralized design system tokens (widths, spacing, typography, colors, etc.)
  - See `lib/DESIGN_SYSTEM.md` for usage guide
  - Import tokens like: `import { contentWidths, typography, spacing } from "@/lib/design-tokens"`
  - Use tokens for consistency instead of hardcoding values

### Smooth Scrolling
- Lenis smooth scroll is implemented via `components/SmoothScroll.tsx`
- Client-side only component wrapper

### Styling Philosophy
- Clean, high-end aesthetic with generous whitespace
- Black background with accent colors
- Minimal animations via Framer Motion

### Image Configuration
- Remote patterns configured for `images.unsplash.com` in `next.config.ts`

## Architecture Notes

See `ARCHITECTURE.md` for detailed architectural documentation on the block system, data structures, and component organization.
