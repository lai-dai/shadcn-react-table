"use client"

import { ChevronDown, type LucideIcon, Table } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible"
import { ScrollArea } from "~/components/ui/scroll-area"
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
import { useIsMobile } from "~/hooks/use-mobile"

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
      {
        title: "React Table 02",
        url: "/style-02",
      },
      {
        title: "React Table 03",
        url: "/style-03",
      },
      {
        title: "React Table 04",
        url: "/style-04",
      },
    ],
  },
]

export function AppSidebar() {
  const isMobile = useIsMobile()

  return (
    <Sidebar
      className={"fixed top-0 z-10 h-screen border-r"}
      collapsible={isMobile ? undefined : "none"}>
      <SidebarHeader className={"h-16 justify-center px-4"}>
        <h1>
          <Link
            className={"font-bold md:text-lg"}
            href={"https://ui.shadcn.com/"}
            referrerPolicy={"no-referrer"}>
            {"Shadcn"}
          </Link>{" "}

          <Link
            className={"text-sm text-muted-foreground"}
            href={"/"}>
            {"React Table"}
          </Link>
        </h1>
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {Menu.map((it, idx) => (
                  <Tree
                    key={idx}
                    {...it} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className={"h-16 justify-center px-4 md:h-24"} />
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
        asChild={true}
        isActive={activeDD}
        onClick={() => setOpenMobile(false)}
        title={props.title}
        tooltip={props.title}>
        <Link href={props.url ?? "#"}>
          {!isSubMenu && (props.icon ? <props.icon /> : null)}

          <span className={"grow truncate leading-5"}>{props.title}</span>
        </Link>
      </Comp>
    )
  }

  const Comp = isSubMenu ? SidebarMenuSubItem : SidebarMenuItem

  return (
    <Comp>
      <Collapsible
        className={"group/collapsible [&[data-state=open]>button>svg:last-child]:rotate-90"}
        defaultOpen={true}>
        <CollapsibleTrigger asChild={true}>
          <SidebarMenuButton title={props?.title}>
            {!isSubMenu && (props?.icon ? <props.icon /> : null)}

            <span className={"grow truncate leading-5"}>{props?.title}</span>

            <ChevronDown className={"ml-auto transition-transform duration-200"} />
          </SidebarMenuButton>
        </CollapsibleTrigger>

        {Array.isArray(props?.children) && (
          <CollapsibleContent>
            <SidebarMenuSub className={"mr-0 pr-0"}>
              {props?.children.map((child, idx) => (
                <Tree
                  isSubMenu={true}
                  key={idx}
                  {...child} />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        )}
      </Collapsible>
    </Comp>
  )
}
