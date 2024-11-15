"use client"

import * as React from "react"

import {
  MoonIcon, SunIcon,
} from "lucide-react"
import {
  useTheme,
} from "next-themes"

import {
  Button,
} from "~/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip"

export function ThemeToggle() {
  const {
    setTheme, theme,
  } = useTheme()

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <MoonIcon className="rotate-90 scale-0 transition-transform duration-500 ease-in-out dark:rotate-0 dark:scale-100" />

            <SunIcon className="scale-1000 absolute rotate-0 transition-transform duration-500 ease-in-out dark:-rotate-90 dark:scale-0" />

            <span className="sr-only">Switch Theme</span>
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          <p>{theme === "dark" ? "Dark" : "Light"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
