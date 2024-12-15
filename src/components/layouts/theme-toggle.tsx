"use client"


import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import * as React from "react"

import { Button } from "~/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild={true}>
          <Button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            size={"icon"}
            variant={"ghost"}>
            <MoonIcon className={"rotate-90 scale-0 transition-transform duration-500 ease-in-out dark:rotate-0 dark:scale-100"} />

            <SunIcon className={"scale-100 absolute rotate-0 transition-transform duration-500 ease-in-out dark:-rotate-90 dark:scale-0"} />

            <span className={"sr-only"}>{"Switch Theme"}</span>
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          <p>{theme === "dark" ? "Dark" : "Light"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
