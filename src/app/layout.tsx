import "~/styles/globals.css"

import { GeistSans } from "geist/font/sans"
import { type Metadata } from "next"
import { Providers } from "~/app/providers"
import { AppSidebar } from "~/components/layouts/app-sidebar"
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar"
import { AppHeader } from "~/components/layouts/app-header"

export const metadata: Metadata = {
  title: "Shadcn React Table",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="vi"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning>
      <body>
        <Providers>
          <div className="container mx-auto border-x">
            <SidebarProvider className="block">
              <AppSidebar />

              <SidebarInset className="md:pl-[--sidebar-width]">
                <AppHeader />

                {children}
              </SidebarInset>
            </SidebarProvider>
          </div>
        </Providers>
      </body>
    </html>
  )
}
