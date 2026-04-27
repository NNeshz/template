# `@repo/ui`

Shared component library and design system. Built on shadcn/ui architecture with Base UI primitives, Tailwind CSS v4, and Tabler Icons.

## Structure

```text
packages/ui/
├─ global.css                  # Tailwind import + CSS variables (light/dark tokens)
└─ src/
   ├─ components/
   │  ├─ avatar.tsx
   │  ├─ button.tsx
   │  ├─ collapsible.tsx
   │  ├─ dropdown-menu.tsx
   │  ├─ input.tsx
   │  ├─ separator.tsx
   │  ├─ sheet.tsx
   │  ├─ sidebar.tsx
   │  ├─ skeleton.tsx
   │  ├─ sonner.tsx
   │  └─ tooltip.tsx
   ├─ hooks/
   │  └─ use-mobile.ts
   ├─ lib/
   │  └─ utils.ts              # cn() helper (clsx + tailwind-merge)
   └─ providers/
      └─ theme-provider.tsx    # next-themes wrapper
```

## Usage

```ts
import { Button } from "@repo/ui/components/button"
import { cn } from "@repo/ui/lib/utils"
import { ThemeProvider } from "@repo/ui/providers/theme-provider"
```

Import `global.css` once at the app root:

```ts
// apps/web/app/global.css
@import "@repo/ui/global.css";
```

## Adding a component

Use the shadcn CLI from the `packages/ui` directory:

```sh
cd packages/ui && bunx shadcn add <component>
```

Components are added under `src/components/`. Always use **Tabler Icons** (`@tabler/icons-react`) — not Lucide.

## Theming

CSS tokens are defined in `global.css` under `:root` (light) and `.dark`. The sidebar tokens use solid colors (no transparency) to avoid layering artifacts with the inset sidebar variant.

## Design conventions

- **Icons**: `@tabler/icons-react` only — all icons are prefixed `Icon*`
- **Border radius**: `0rem` globally — sharp corners by default
- **Glass utilities**: `glass`, `glass-sm`, `glass-lg` via `@utility` in `global.css`
