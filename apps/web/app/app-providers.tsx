"use client";

import type React from "react";
import type { ReactNode } from "react";
import { ThemeProvider } from "@template/ui/src/providers/theme-provider";
import { Toaster } from "@template/ui/src/components/sonner";

export const AppProviders = ({ children }: { children?: ReactNode }) => {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        themes={["light", "dark", "system"]}
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster />
      </ThemeProvider>
    </>
  );
};
