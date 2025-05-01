import { Button } from "@/components/ui/button"
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
          <Button size="sm" variant="secondary" className="justify-start">
            hello
          </Button>
        </aside>

        <div className="flex h-screen flex-col overflow-hidden">
          <div className="h-16 w-full shrink-0 border-b"></div>

          <div className="no-scrollbar flex-1 overflow-y-auto px-6 py-4">{children}</div>
        </div>
      </div>
    </div>
  )
}
