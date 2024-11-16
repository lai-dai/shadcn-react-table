import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "~/components/ui/sidebar"

export function AppSidebar() {
  return (
    <Sidebar collapsible="none">
      <SidebarHeader />

      <SidebarContent>
        <SidebarGroup />

        <SidebarGroup />
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  )
}
