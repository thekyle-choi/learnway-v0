# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Learnway is a Next.js 14 portfolio website built with React 18, TypeScript, and Tailwind CSS. It features a creative, interactive design with custom scroll animations and a bold minimal aesthetic. The project uses the App Router architecture with client-side interactivity powered by Framer Motion.

## Development Commands

- **Dev server**: `pnpm dev` or `npm run dev` - Starts Next.js development server on port 3000
- **Build**: `pnpm build` or `npm run build` - Creates production build
- **Start production**: `pnpm start` or `npm run start` - Runs production server
- **Lint**: `pnpm lint` or `npm run lint` - Runs ESLint checks

Package manager: This project uses `pnpm` (see pnpm-lock.yaml), but `npm` also works.

## Architecture

### Core Animation System

The homepage features a **wheel-controlled infinite scroll animation** for the gallery:

1. **AngGrid** ([components/ang-grid.tsx](components/ang-grid.tsx)) - Main homepage gallery component that uses Framer Motion's `useMotionValue` and `useTransform` for smooth infinite scrolling
2. Wheel events are captured with velocity and damping for natural scroll physics (0.92 damping factor, 0.18 velocity multiplier)
3. **4 columns** of project tiles that translate vertically - alternating columns move in opposite directions (even columns up, odd columns down)
4. Each column renders 3 repetitions of projects for seamless infinite scroll effect
5. Column speed: 0.6x multiplier on scroll progress

Alternative implementation exists:
- **ScrollProgressProvider** ([components/features/gallery/scroll-canvas.tsx](components/features/gallery/scroll-canvas.tsx)) provides scroll progress context
- **useWheelProgress** hook ([hooks/use-wheel-progress.ts](hooks/use-wheel-progress.ts)) converts wheel events to smooth progress values with configurable sensitivity, damping, and inertia
- **ColumnGrid** ([components/features/gallery/column-grid.tsx](components/features/gallery/column-grid.tsx)) - 5-column implementation using centralized data

### Data Architecture

**Centralized data layer** introduced in refactored structure:

- **[data/projects.ts](data/projects.ts)** - Single source of truth for all project data
  - `projects[]` - Gallery tile data (15 projects with id, title, type, images, colors, aspect ratios)
  - `projectDetails{}` - Project detail page content (5 detailed projects with descriptions, services, galleries)
- **[data/constants.ts](data/constants.ts)** - Application constants
  - `ANIMATION` - Animation configuration (easing curves, speeds, sensitivities)
  - `NAV_ITEMS` - Navigation menu structure
  - `GRID` - Grid layout parameters (columns, repetitions)
- **[types/index.ts](types/index.ts)** - TypeScript type definitions
  - `Project`, `ProjectDetail`, `ProjectDataMap` interfaces

To add/modify projects: Update `data/projects.ts` in both `projects` array (for gallery) and `projectDetails` object (for detail pages).

### Component Organization

Feature-based structure following Next.js best practices:

```
components/
  ├── features/                    # Feature-specific components
  │   ├── gallery/                 # Gallery/homepage components
  │   │   ├── column-grid.tsx      # 5-column grid with centralized data
  │   │   ├── scroll-canvas.tsx    # ScrollProgressProvider context
  │   │   └── project-tile.tsx     # Individual project tile
  │   ├── navigation/              # Navigation components
  │   │   └── navigation.tsx       # Main site navigation with mobile menu
  │   └── project/                 # Project detail components
  │       ├── project-detail.tsx   # Project detail page layout
  │       ├── project-card.tsx     # Project card component
  │       └── project-navigation.tsx # Project navigation
  ├── shared/                      # Shared reusable components
  │   ├── custom-cursor.tsx        # Custom cursor effect (desktop only)
  │   ├── page-transition.tsx      # Page transition wrapper
  │   ├── animated-text.tsx        # Text animation with stagger effect
  │   ├── stagger-container.tsx    # Stagger animation container
  │   └── stagger-item.tsx         # Individual stagger item
  └── ui/                          # shadcn/ui primitives only
```

**Note**: `components/ang-grid.tsx` is the **active homepage gallery** component. The `features/gallery/` components are an alternative implementation.

### Path Aliases

TypeScript paths configured in [tsconfig.json](tsconfig.json):
- `@/*` resolves to project root (e.g., `@/components`, `@/data`, `@/types`)

### Styling

- **Tailwind CSS v4** with PostCSS
- **Dark theme** enforced in root layout (`<html className="dark">`)
- Global styles in [app/globals.css](app/globals.css) - single source for all styles
- Uses **Geist Sans** and **Geist Mono** fonts from `geist` package
- shadcn/ui components configured with "new-york" style ([components.json](components.json))
- Custom CSS classes: `.masonry-item`, `.tile-hover`, `.stagger-item`, `.magnetic-hover`

### Hooks

Custom hooks organized in [hooks/](hooks/):
- `use-wheel-progress.ts` - Configurable wheel scroll hook with velocity tracking
- `use-scroll-progress.ts` - Scroll position tracking
- `use-reduced-motion.ts` - Respects `prefers-reduced-motion` accessibility setting
- `use-mobile.ts` - Mobile device detection
- `use-mobile-shadcn.ts`, `use-toast-shadcn.ts` - shadcn/ui hooks (moved from components/ui)

## Key Dependencies

- **next**: 14.2.16 (App Router)
- **framer-motion**: Animation library for smooth transitions and motion values
- **@radix-ui/react-***: Accessible UI primitives (accordion, dialog, etc.)
- **lucide-react**: Icon library
- **react-hook-form** + **zod**: Form handling and validation
- **next-themes**: Theme management (currently forced to dark)
- **Tailwind CSS v4** with `@tailwindcss/postcss`

## Important Notes

- The wheel scroll system prevents default scroll behavior - users navigate via mouse wheel with custom physics
- All animations respect `prefers-reduced-motion` via [hooks/use-reduced-motion.ts](hooks/use-reduced-motion.ts)
- Project detail pages use static generation via `generateStaticParams()` (5 projects: neon-identity, mobile-app, editorial-layout, web-interface, product-shots)
- Custom cursor ([components/shared/custom-cursor.tsx](components/shared/custom-cursor.tsx)) hides default cursor on desktop
- Images use `unoptimized: true` in [next.config.mjs](next.config.mjs)
- TypeScript and ESLint errors are ignored during builds (see next.config.mjs)
- Remote images from `images.unsplash.com` are allowed
- Navigation header uses `mix-blend-mode: difference` for visual effect over content

## Configuration

- Next.js config: [next.config.mjs](next.config.mjs) - Disables image optimization, allows Unsplash images
- TypeScript config: [tsconfig.json](tsconfig.json) - Strict mode enabled, uses ES6 target
- Package manager: `pnpm@9.12.1` (specified in package.json)