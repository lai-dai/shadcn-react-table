"use client"

import { SidebarTrigger } from "~/components/ui/sidebar"
import { ThemeToggle } from "./theme-toggle"
import { useEffect, useState } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "~/components/ui/breadcrumb"
import { usePathname } from "next/navigation"
import { GithubLink } from "./github-link"

export function AppHeader() {
  const [title, setTitle] = useState("")

  const pathname = usePathname()

  useEffect(() => {
    setTitle(document.title)
  }, [pathname])

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
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-3">
        <GithubLink />
        <ThemeToggle />
      </div>
    </div>
  )
}
