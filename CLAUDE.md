# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A React-based live quiz application built with TypeScript, Vite, and modern React 19. The project uses shadcn/ui components with Tailwind CSS v4 for styling.

## Development Commands

- `npm run dev` - Start development server with HMR
- `npm run build` - Type-check with TypeScript and build for production
- `npm run lint` - Run ESLint on all files
- `npm run preview` - Preview production build locally

## Technology Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7 with @vitejs/plugin-react
- **Styling**: Tailwind CSS v4 with @tailwindcss/vite plugin
- **UI Components**: shadcn/ui (New York style) with Radix UI primitives
- **Icons**: Lucide React
- **Path Aliases**: `@/` maps to `./src/`

## Project Structure

```
src/
├── components/
│   └── ui/          # shadcn/ui components
├── lib/
│   └── utils.ts     # Utility functions (cn, etc.)
├── App.tsx          # Main app component
├── main.tsx         # Application entry point
└── index.css        # Tailwind CSS imports and global styles
```

## Code Conventions

- **Component Exports**: Use named exports with arrow functions
  ```tsx
  export const MyComponent = () => { ... }
  ```
  NOT: `export default function MyComponent() { ... }`

- **Keys in Lists**: Never use array indices as keys in React lists

- **shadcn/ui**: Components are configured to be added to `src/components/ui/`
  - Add new components: `npx shadcn@latest add [component-name]`
  - Configuration in `components.json`

## TypeScript Configuration

- Composite TypeScript setup with separate configs:
  - `tsconfig.json` - Root config with path aliases
  - `tsconfig.app.json` - Application code config
  - `tsconfig.node.json` - Node/Vite config files
- Path alias `@/*` resolves to `src/*`

## Styling Architecture

- Tailwind CSS v4 with CSS variables for theming
- Base color: Slate
- Utilities: `clsx`, `tailwind-merge` combined in `cn()` utility
- Animation support via `tw-animate-css`

## ESLint Setup

- Uses flat config format (`eslint.config.js`)
- Enabled plugins:
  - TypeScript ESLint with recommended rules
  - React Hooks with latest recommended rules
  - React Refresh for Vite HMR
- Global ignores: `dist/`
