/**
 * Design System Tokens
 * Centralized configuration for consistent design values across components
 */

/**
 * BREAKPOINT STRATEGY
 *
 * Tailwind Default Breakpoints:
 * - sm: 640px   (small tablets, large phones)
 * - md: 768px   (tablets)
 * - lg: 1024px  (laptops, small desktops)
 * - xl: 1280px  (desktops)
 * - 2xl: 1536px (large desktops)
 *
 * Project Convention:
 * - Mobile: base styles (< 768px)
 * - Tablet: md: for padding/spacing adjustments only
 * - Desktop: lg: for layout changes (stack → side-by-side)
 * - Large: xl: for enhanced spacing/sizing
 *
 * Rationale:
 * With fixed content widths (482px) and large gaps (96px),
 * layouts need 1024px+ to work comfortably side-by-side.
 */

// Content widths
export const contentWidths = {
  // Fixed widths for content boxes
  contentBox: '422px',
  contentBoxLarge: '482px', // Unified component width
  card: '320px',

  // Max widths for containers
  maxWidthSm: '640px',
  maxWidthMd: '768px',
  maxWidthLg: '1024px',
  maxWidthXl: '1280px',
  maxWidth2Xl: '1536px',
  maxWidthContent: '896px', // For readable text content
} as const;

// Content positioning (DEPRECATED - use CSS utilities instead)
// Use .content-offset-left or .content-offset-right classes
export const contentMargins = {
  contentPushCenter: 'lg:px-24',  // Push content toward center
  contentOffsetLeft: 'lg:pl-24',   // Left positioning
  contentOffsetRight: 'lg:pr-24',  // Right positioning
} as const;

// Spacing scale
export const spacing = {
  // Section padding (vertical)
  sectionPaddingTight: 'py-12 md:py-16',      // 48px / 64px
  sectionPaddingNormal: 'py-16 md:py-24',     // 64px / 96px
  sectionPaddingLoose: 'py-24 md:py-32',      // 96px / 128px

  // Title spacing (margin-bottom)
  titleGapTight: 'mb-8',       // 32px
  titleGapNormal: 'mb-12',     // 48px
  titleGapLoose: 'mb-16',      // 64px
  titleGapXLoose: 'mb-20',     // 80px

  // Content spacing
  contentGap: 'mb-6',          // 24px
  paragraphGap: 'mb-4',        // 16px
} as const;

// Typography scale
export const typography = {
  // Heading sizes
  headingXXL: 'text-4xl md:text-6xl lg:text-7xl',  // Section titles (standalone)
  headingXL: 'text-3xl md:text-4xl lg:text-5xl',   // Section/feature titles
  headingLg: 'text-2xl md:text-3xl lg:text-4xl',   // Subsection titles
  headingMd: 'text-xl md:text-2xl',                 // Card titles
  headingSm: 'text-lg md:text-xl',                  // Small headings

  // Body text
  bodyLg: 'text-lg md:text-xl',
  bodyMd: 'text-base md:text-lg',
  bodySm: 'text-sm md:text-base',
  bodyXs: 'text-xs md:text-sm',

  // Font weights
  fontLight: 'font-light',
  fontNormal: 'font-normal',
  fontMedium: 'font-medium',
  fontBold: 'font-bold',

  // Letter spacing
  trackingTight: 'tracking-tight',
  trackingNormal: 'tracking-normal',
  trackingWide: 'tracking-wide',
  trackingWider: 'tracking-wider',
  trackingWidest: 'tracking-widest',
} as const;

// Border radius
export const borderRadius = {
  sm: 'rounded-lg',       // 8px
  md: 'rounded-xl',       // 12px
  lg: 'rounded-2xl',      // 16px
  xl: 'rounded-3xl',      // 24px
  full: 'rounded-full',
} as const;

// Shadows
export const shadows = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
  glow: 'shadow-[0_0_20px_rgba(20,184,166,0.3)]',
  glowLg: 'shadow-[0_0_40px_rgba(0,0,0,0.3)]',
} as const;

// Colors (semantic)
export const colors = {
  // Backgrounds
  bgDark: 'bg-black',
  bgDarkCard: 'bg-[#0a0a0a]',
  bgDarkGradient: 'bg-gradient-to-b from-[#050505] to-black',

  // Borders
  borderDark: 'border-[#333]',
  borderLight: 'border-white/10',
  borderAccent: 'border-teal-500/30',

  // Text
  textPrimary: 'text-white',
  textSecondary: 'text-gray-400',
  textTertiary: 'text-gray-500',
  textAccent: 'text-teal-400',
} as const;

// Effects
export const effects = {
  backdropBlur: 'backdrop-blur-xl',
  glassmorph: 'bg-black/30 backdrop-blur-xl border border-white/10',
} as const;

// Animation durations
export const animations = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  verySlow: 1.0,
  shimmerDuration: '2s', // Button shimmer/glisten effect
} as const;

/**
 * USAGE GUIDE
 *
 * 1. For inline styles (framer-motion, dynamic):
 *    style={{ maxWidth: contentWidths.contentBoxLarge }}
 *
 * 2. For Tailwind classes (static, JIT-compatible):
 *    className="content-box-large"
 *    OR
 *    className="max-w-[482px]"
 *
 * 3. DO NOT use template literals in className:
 *    WRONG: className={`w-[${contentWidths.contentBox}]`}
 *    Tailwind JIT cannot parse dynamic class names
 *
 * 4. Breakpoint Strategy:
 *    - Mobile-first: base styles for < 768px
 *    - lg: for side-by-side layouts (1024px+)
 *    - Use consistent breakpoints across related components
 */

// Deprecated helpers (kept for reference, do not use)
// Template literals in className don't work with Tailwind JIT
