import "~/styles/globals.css"

import { GeistSans } from "geist/font/sans"
import { type Viewport, type Metadata } from "next"
import { Providers } from "~/app/providers"
import { AppSidebar } from "~/components/layouts/app-sidebar"
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar"
import { SiteHeader } from "~/components/layouts/site-header"
import { META_THEME_COLORS } from "~/config/site"
import { SiteFooter } from "~/components/layouts/site-footer"

export const metadata: Metadata = {
  title: "Shadcn React Table",
  description: "Generated by create-t3-app",
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Radix UI",
    "Shadcn UI",
    "TanStack Table",
  ],
  authors: [
    {
      name: "laidai",
      url: "https://laidai.xyz",
    },
  ],
  creator: "laidai",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export const viewport: Viewport = {
  themeColor: META_THEME_COLORS.light,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="vi"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>
          <div className="container mx-auto border-x">
            <SidebarProvider defaultOpen={false} className="block">
              <AppSidebar />

              <SidebarInset className="md:pl-[--sidebar-width]">
                <SiteHeader />

                {children}
              </SidebarInset>

              <SiteFooter />
            </SidebarProvider>
          </div>
        </Providers>
      </body>
    </html>
  )
}
