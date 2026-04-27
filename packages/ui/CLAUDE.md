# UI Package — Claude Context

Shared component library for the monorepo. Built on shadcn/ui + Base UI primitives + Tailwind CSS v4.

## Key facts

- Components: `src/components/` — shadcn/ui style, built on `radix-ui`
- Theme: `global.css` — Tailwind v4 `@import`, CSS variable tokens, dark mode via `.dark` class
- Icons: **always use `@tabler/icons-react`** — all icons are prefixed `Icon*` (e.g. `IconHome`, not `Home`)
- Utility: `src/lib/utils.ts` exports `cn()` (clsx + tailwind-merge)
- Providers: `src/providers/theme-provider.tsx` — next-themes wrapper (no `"use client"` needed on wrapper)

## Import patterns

```ts
import { Button, buttonVariants } from "@repo/ui/components/button"
import { cn } from "@repo/ui/lib/utils"
import { ThemeProvider } from "@repo/ui/providers/theme-provider"
```

```css
/* In consuming app's global CSS */
@import "@repo/ui/global.css";
```

## Adding a component

```sh
cd packages/ui && bunx shadcn add <component>
```

After adding: replace any Lucide imports with the Tabler equivalent.

## Icon convention

```ts
// Correct
import { IconSettings, IconLogout } from "@tabler/icons-react"

// Wrong — Lucide names, will not resolve
import { Settings, LogOut } from "@tabler/icons-react"
```

## Theming

- Sidebar tokens use **solid colors** (no alpha transparency) to prevent visual layering artifacts with the inset sidebar variant
- Border radius is `0rem` globally — change `--radius` in `global.css` to adjust
- Glass utilities available: `glass`, `glass-sm`, `glass-lg`

## What NOT to do

- Do not import from `@repo/api`, `@repo/auth`, or `@repo/database` — this package has no backend deps
- Do not use Lucide icons — this project standardized on Tabler
- Do not add `"use client"` to `theme-provider.tsx` wrapper — next-themes handles its own client boundary
