"use client"

import { SidebarTrigger } from "~/components/ui/sidebar"
import { ThemeToggle } from "./theme-toggle"
import { useEffect, useState } from "react"

export function AppHeader() {
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
    <div
      data-sticky={isSticky}
      className={
        "sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-3 data-[sticky=true]:shadow-md"
      }>
      <div>
        <SidebarTrigger className="md:hidden" />
      </div>

      <ThemeToggle />
    </div>
  )
}
