# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
# Install dependencies
npm install

# Start development server (port 5174)
npm run dev

# Alternative dev ports
npm run dev:5173
npm run dev:5174

# Production build (runs TypeScript check first)
npm run build

# Preview production build
npm run preview
```

## Technology Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **React Router v6** for routing

## Architecture

This is a single-page React application focused on presenting the AEIOS component system through animated, responsive UI.

### Key Structure

- `src/main.tsx` - App entry point
- `src/App.tsx` - Root component with routing and ProgressProvider context wrapper
- `src/components/Vision.tsx` - Main application component (~1200 lines) containing:
  - Animated reveal sequence with sphere navigation
  - Story navigation system with 5 sections (Vision, Mastery, Adaptation, Growth, Incentives)
  - Bar loader transitions
  - Responsive breakpoint handling
- `src/context/ProgressContext.tsx` - Step unlocking state management using React Context

### Responsive Breakpoints

The application uses these viewport breakpoints:
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Laptop: 1024px - 1439px
- Desktop: 1440px+

### Styling Approach

- Mobile-first responsive design using CSS `clamp()` for fluid typography and spacing
- Tailwind utility classes combined with inline styles for animations
- Custom CSS in `src/index.css` for base responsive styles and touch optimization
