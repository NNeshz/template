"use client";

import * as React from "react";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { Button } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";

const THEMES = ["light", "dark"] as const;
const ICONS = { light: IconSun, dark: IconMoon };
const LABELS = { light: "Claro", dark: "Oscuro" };

export function ChangeThemeSelector({ className }: { className?: string }) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => { setMounted(true) }, []);

  if (!mounted) return <div className={className} style={{ minHeight: 32 }} aria-hidden />;

  const current = theme === "dark" ? "dark" : "light";
  const next = THEMES[(THEMES.indexOf(current) + 1) % THEMES.length] ?? "light";
  const Icon = ICONS[current];

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn("justify-start rounded-xl", className)}
      onClick={() => setTheme(next)}
    >
      <Icon className="size-4" />
      <span>{LABELS[current]}</span>
    </Button>
  );
}
