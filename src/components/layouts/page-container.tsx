"use client"

import {
  type HTMLAttributes,
} from "react"

import {
  useSidebar,
} from "~/components/ui/sidebar"

import {
  cn,
} from "~/lib/utils"

export function PageContainer({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { open } = useSidebar()
  return (
    <div
      className={
        cn(
          "grow flex flex-col w-screen",
          open
            ? "md:w-[calc(100vw-var(--sidebar-width)-0.75rem)]"
            : "md:w-[calc(100vw-var(--sidebar-width-icon)-0.75rem)]",
          className
        )
      }
      {...props}
    />
  )
}
