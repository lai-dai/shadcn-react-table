"use client"

import { ThemeProvider } from "next-themes"
import * as React from "react"

interface ProvidersProps {
  children?: React.ReactNode
}
export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute={"class"}
      defaultTheme={"dark"}
      disableTransitionOnChange={false}
      enableSystem={false}>
      {children}
    </ThemeProvider>
  )
}
