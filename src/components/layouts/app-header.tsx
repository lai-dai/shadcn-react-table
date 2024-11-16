import { ThemeToggle } from "./theme-toggle"

export function AppHeader() {
  return (
    <div className="flex h-16 items-center justify-between">
      <h1>Shadcn React Table</h1>
      <ThemeToggle />
    </div>
  )
}
