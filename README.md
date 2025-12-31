# LANDIO

A modern Next.js marketing platform for land and property listings, built with a flexible block-based architecture.

## Overview

LANDIO is a high-performance marketing website designed for land, property, and real estate listings. The site features a clean, modern aesthetic with smooth animations and a flexible content management system based on reusable blocks.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Smooth Scrolling**: Lenis
- **Image Optimization**: Next.js Image component

## Features

- 🎨 **Block-Based Architecture**: Flexible content composition with reusable components
- ⚡ **Performance Optimized**: CLS-optimized, fast loading, smooth animations
- 📱 **Responsive Design**: Mobile-first approach with adaptive layouts
- 🎭 **Smooth Animations**: Sequential entrance animations with Framer Motion
- 🖱️ **Smooth Scrolling**: Lenis integration for buttery-smooth scroll experience
- 🎯 **Design System**: Centralized design tokens for consistency
- 🌈 **Dynamic Visuals**: Customizable image positioning, brightness, and bleed controls

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
go-landio/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Main landing page (block configuration)
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── blocks/             # Block components (Hero, ContentSection, etc.)
│   ├── BlockRenderer.tsx   # Central block renderer
│   ├── CursorLight.tsx     # Ambient light effect
│   └── SmoothScroll.tsx    # Lenis scroll wrapper
├── lib/                     # Utility functions
│   ├── design-tokens.ts    # Centralized design system
│   └── utils.ts            # Helper functions
├── types/                   # TypeScript type definitions
│   └── index.ts            # Block types and interfaces
└── public/                  # Static assets
    └── images/             # Image assets
```

## Block Architecture

The core of LANDIO is its block-based content system. Pages are composed of reusable block components that can be configured through simple data objects.

### Available Blocks

- **Hero**: Large introductory section with title, subtitle, logo, and CTA
- **ContentSection**: Versatile content block with two variants:
  - `featured`: Side-by-side text and image layout
  - `parallax`: Full-screen background image with overlaid content
- **Pricing**: Pricing cards with optional highlighting
- **SectionTitle**: Standalone section headers
- **CTA**: Call-to-action sections
- **Footer**: Site footer

### Adding Content

Edit `app/page.tsx` to add or modify blocks:

```typescript
const pageData: PageData = {
  blocks: [
    {
      id: "hero-1",
      type: "Hero",
      props: {
        title: "Your Title",
        subtitle: "Subtitle",
        ctaText: "Get Started",
        ctaLink: "/signup"
      }
    },
    // Add more blocks...
  ]
};
```

### ContentSection Options

The `ContentSection` block supports extensive customization:

```typescript
{
  type: "ContentSection",
  props: {
    variant: "featured",        // or "parallax"
    title: "Section Title",
    description: "Description text",
    imageUrl: "/images/photo.jpg",
    orientation: "left",         // or "right"
    imageBleed: 10,             // 0-20+ for image crop extension
    imagePositionY: "center",   // "top", "bottom", "30%", etc.
    imageBrightness: 80,        // 0-100 for darkness/brightness
  }
}
```

## Design System

Design tokens are centralized in `lib/design-tokens.ts`:

```typescript
import { contentWidths, typography, spacing } from "@/lib/design-tokens";
```

Available token categories:
- Content widths
- Typography (sizes, weights, line heights)
- Spacing (gaps, padding, margins)
- Colors
- Border radius
- Animations
- Effects (glassmorphism, etc.)

## Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)**: Detailed architecture documentation
- **[CLAUDE.md](./CLAUDE.md)**: Development guidelines for AI assistants
- **[lib/DESIGN_SYSTEM.md](./lib/DESIGN_SYSTEM.md)**: Design system documentation

## Performance

- **Font Loading**: Optimized with `display: swap`
- **Images**: Next.js Image component with proper sizing
- **Animations**: GPU-accelerated with will-change
- **CLS**: Cumulative Layout Shift optimized (< 0.1)
- **Smooth Scroll**: RAF-throttled at 60fps

## License

Private

## Built With

This project was bootstrapped with [Create Next App](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
