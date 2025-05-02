import { Cog } from "lucide-react"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { LinkButton } from "@/components/link-button"
import { CollapsibleDemo } from "@/components/sidebar/co"
import { NavUser } from "@/components/sidebar/NavUser"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-wrapper h-screen overflow-hidden lg:border-x">
      <div className="container h-full flex-1 items-start overflow-hidden lg:grid lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="fixed z-30 hidden h-screen w-full shrink-0 flex-col p-2.5 md:sticky lg:flex lg:border-r">
          <NavUser slug="s" />
          <div className="no-scrollbar my-4 flex-1 overflow-y-auto">
            <LinkButton
              href="/"
              size="sm"
              variant="ghost"
              className="w-full justify-start"
            >
              Uploads
            </LinkButton>
            <CollapsibleDemo />
            an
          </div>
          {/* Sidebar content */}
          <LinkButton href="/settings/profile" variant="ghost" className="justify-start">
            <Cog />
            Settings
          </LinkButton>
        </aside>

        <div className="flex h-screen flex-col overflow-hidden">
          <div className="flex h-14 w-full shrink-0 items-center border-b px-3 lg:px-6">
            <Breadcrumbs />
          </div>

          <div className="no-scrollbar flex-1 overflow-y-auto p-3 lg:px-6 lg:py-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
