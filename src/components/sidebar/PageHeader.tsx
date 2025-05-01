"use client"

import { usePathname } from "next/navigation"
import { Separator } from "@radix-ui/react-separator"
import { workspaceRoutes } from "@/lib/auth/routes"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "../ui/breadcrumb"
import { SidebarTrigger } from "../ui/sidebar"

export function PageHeader() {
  const pathname = usePathname()

  const currentRoute = workspaceRoutes.find((route) => {
    const pattern = route.path.replace(":workspaceId", "[^/]+")
    const regex = new RegExp(`^${pattern}$`)
    return regex.test(pathname)
  })

  return (
    <header className="flex h-14 shrink-0 items-center gap-2">
      <div className="flex flex-1 items-center gap-2 px-3">
        <SidebarTrigger />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="line-clamp-1">
                {currentRoute?.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
}
