"use client";

import * as React from "react";
import { ThemeProvider } from "next-themes";

interface ProvidersProps {
  children?: React.ReactNode;
}
export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      {children}
    </ThemeProvider>
  );
}
