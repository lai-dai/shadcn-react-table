"use client"

import { ChevronDown, type LucideIcon, Table } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
  SidebarSeparator,
  SidebarGroupLabel,
  SidebarFooter,
} from "~/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible"
import { useIsMobile } from "~/hooks/use-mobile"
import { ScrollArea } from "~/components/ui/scroll-area"
import { PortfolioLink } from "./portfolio-link"

interface MenuItem {
  children?: MenuItem[]
  icon?: LucideIcon
  title?: string
  url?: string
  separator?: boolean
  label?: string
}

const Menu: MenuItem[] = [
  {
    title: "React Table",
    icon: Table,
    url: "/",
    children: [
      {
        label: "Original",
      },
      {
        title: "React Table",
        url: "/",
      },
      {
        title: "Shadcn Table",
        url: "/shadcn-table",
      },
      {
        label: "Styles",
      },
      {
        title: "React Table 01",
        url: "/style-01",
      },
    ],
  },
]

export function AppSidebar() {
  const isMobile = useIsMobile()

  return (
    <Sidebar
      collapsible={isMobile ? undefined : "none"}
      className="fixed top-0 z-10 h-screen border-r">
      <SidebarHeader className="h-16 justify-center px-4">
        <h1>
          <Link
            href={"https://ui.shadcn.com/"}
            referrerPolicy="no-referrer"
            className="font-bold md:text-lg">
            Shadcn
          </Link>{" "}
          <Link href={"/"} className="text-sm text-muted-foreground">
            React Table
          </Link>
        </h1>
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {Menu.map((it, idx) => (
                  <Tree key={idx} {...it} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="h-16 justify-center px-4">
        <div>
          <PortfolioLink />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

function Tree({ isSubMenu, ...props }: MenuItem & { isSubMenu?: boolean }) {
  const pathname = usePathname()
  const { setOpenMobile } = useSidebar()

  if (props.separator) {
    return <SidebarSeparator />
  }

  if (props.label) {
    return <SidebarGroupLabel>{props.label}</SidebarGroupLabel>
  }

  const handleActive = (url?: string) => {
    if (url === "/") {
      return pathname === url
    }
    if (url) {
      return pathname.startsWith(url)
    }
  }

  if (!props?.children?.length) {
    const Comp = isSubMenu ? SidebarMenuSubButton : SidebarMenuButton
    const activeDD = handleActive(props.url)
    return (
      <Comp
        onClick={() => setOpenMobile(false)}
        isActive={activeDD}
        asChild
        tooltip={props.title}
        title={props.title}>
        <Link href={props.url ?? "#"}>
          {!isSubMenu && (props.icon ? <props.icon /> : null)}

          <span className="grow truncate leading-5">{props.title}</span>
        </Link>
      </Comp>
    )
  }

  const Comp = isSubMenu ? SidebarMenuSubItem : SidebarMenuItem

  return (
    <Comp>
      <Collapsible
        defaultOpen
        className="group/collapsible [&[data-state=open]>button>svg:last-child]:rotate-90">
        <CollapsibleTrigger asChild>
          <SidebarMenuButton title={props?.title}>
            {!isSubMenu && (props?.icon ? <props.icon /> : null)}

            <span className="grow truncate leading-5">{props?.title}</span>

            <ChevronDown className="ml-auto transition-transform duration-200" />
          </SidebarMenuButton>
        </CollapsibleTrigger>

        {Array.isArray(props?.children) && (
          <CollapsibleContent>
            <SidebarMenuSub className="mr-0 pr-0">
              {props?.children.map((child, idx) => (
                <Tree key={idx} isSubMenu {...child} />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        )}
      </Collapsible>
    </Comp>
  )
}
