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

The centerpiece is a **wheel-controlled infinite scroll animation** for the homepage gallery:

1. **ScrollProgressProvider** ([components/scroll-canvas.tsx](components/scroll-canvas.tsx)) wraps the gallery and provides scroll progress context
2. **useWheelProgress** hook ([hooks/use-wheel-progress.ts](hooks/use-wheel-progress.ts)) converts mouse wheel events into smooth progress values (0 to maxProgress) with velocity tracking, damping, and inertia
3. **ColumnGrid** ([components/column-grid.tsx](components/column-grid.tsx)) renders 4 columns of project tiles that translate vertically based on scroll progress - alternating columns move in opposite directions
4. Projects are distributed across columns in round-robin fashion and repeated 3x per column to create infinite scroll effect

Key parameters in [app/page.tsx](app/page.tsx):
- `sensitivity={0.002}` - How much wheel input affects scroll progress
- `maxProgress={3}` - Maximum scroll range (projects repeat to fill this)

### File Structure

```
app/
  ├── page.tsx              - Homepage with ColumnGrid gallery
  ├── layout.tsx            - Root layout with fonts and analytics
  ├── work/[slug]/page.tsx  - Dynamic project detail pages
  ├── about/page.tsx        - About page
  └── contact/page.tsx      - Contact page

components/
  ├── scroll-canvas.tsx     - ScrollProgressProvider context
  ├── column-grid.tsx       - Main gallery grid with columns
  ├── project-tile.tsx      - Individual project tile component
  ├── project-detail.tsx    - Project detail page layout
  ├── navigation.tsx        - Site navigation (fixed header)
  ├── custom-cursor.tsx     - Custom cursor effect
  └── ui/                   - shadcn/ui components

hooks/
  ├── use-wheel-progress.ts - Core wheel scroll hook
  ├── use-scroll-progress.ts
  ├── use-reduced-motion.ts - Respects prefers-reduced-motion
  └── use-mobile.ts         - Mobile detection
```

### Path Aliases

TypeScript paths configured in [tsconfig.json](tsconfig.json):
- `@/*` resolves to project root (e.g., `@/components`, `@/hooks`, `@/lib`)

### Styling

- **Tailwind CSS v4** with PostCSS
- **Dark theme** enforced in root layout (`<html className="dark">`)
- Global styles in [app/globals.css](app/globals.css)
- Uses **Geist Sans** and **Geist Mono** fonts from `geist` package
- shadcn/ui components configured with "new-york" style ([components.json](components.json))

### Data

Project data is hardcoded in:
- Gallery tiles: [components/column-grid.tsx](components/column-grid.tsx) (~line 9)
- Detail pages: [app/work/[slug]/page.tsx](app/work/[slug]/page.tsx) (~line 8)

To add/modify projects, update both locations. In a real app this would come from a CMS/API.

## Key Dependencies

- **next**: 14.2.16 (App Router)
- **framer-motion**: Animation library for smooth transitions
- **@radix-ui/react-***: Accessible UI primitives (accordion, dialog, etc.)
- **lucide-react**: Icon library
- **react-hook-form** + **zod**: Form handling and validation
- **next-themes**: Theme management (currently forced to dark)

## Important Notes

- The wheel scroll system prevents default scroll behavior - users navigate via mouse wheel with custom physics
- All animations respect `prefers-reduced-motion` via [hooks/use-reduced-motion.ts](hooks/use-reduced-motion.ts)
- Project detail pages use static generation via `generateStaticParams()`
- Custom cursor ([components/custom-cursor.tsx](components/custom-cursor.tsx)) hides default cursor on desktop