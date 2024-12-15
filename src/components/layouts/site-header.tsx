"use client"

import { useEffect, useState } from "react"
import { GithubLink } from "./github-link"
import { ThemeToggle } from "./theme-toggle"
import { SidebarTrigger } from "~/components/ui/sidebar"

export function SiteHeader() {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true)
      } else {
        setIsSticky(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={
        "sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur data-[sticky=true]:shadow-md supports-[backdrop-filter]:bg-background/60 dark:border-border"
      }
      data-sticky={isSticky}>
      <div className={"h-16 flex items-center justify-between px-3"}>
        <div>
          <SidebarTrigger className={"md:hidden"} />
        </div>

        <div className={"flex items-center gap-3"}>
          <GithubLink />

          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
