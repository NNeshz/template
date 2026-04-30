"use client";

import * as React from "react";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";

import { Button } from "@template/ui/components/button";
import { cn } from "@template/ui/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@template/ui/components/tooltip";

const THEMES = ["light", "dark"] as const;
const THEME_ICONS = {
  light: IconSun,
  dark: IconMoon,
};
const THEME_LABELS = {
  light: "Claro",
  dark: "Oscuro",
};

export function ChangeThemeSelector({ className }: { className?: string }) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  const currentTheme = theme === "dark" ? "dark" : "light";
  const Icon = THEME_ICONS[currentTheme];

  const nextThemeIndex = (THEMES.indexOf(currentTheme) + 1) % THEMES.length;
  const nextThemeKey = THEMES[nextThemeIndex] as "light" | "dark";
  const nextThemeLabel = THEME_LABELS[nextThemeKey];

  const handleClick = () => {
    setTheme(THEMES[nextThemeIndex] ?? "light");
  };

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={className}
        style={{ minHeight: 32, minWidth: 100 }}
        aria-hidden
      />
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={cn("justify-start rounded-xl", className)}
            onClick={handleClick}
            aria-label={`Cambiar tema (actual: ${THEME_LABELS[currentTheme]})`}
          >
            <Icon className="size-4" />
            <span>{THEME_LABELS[currentTheme]}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Clic para cambiar a {nextThemeLabel}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}