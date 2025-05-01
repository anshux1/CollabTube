"use client"

import Link from "next/link"
import * as Icons from "lucide-react"
import { settingsRoutes, workspaceSettingsRoutes } from "@/lib/auth/routes"
import { useSession } from "@/hooks/auth/useSession"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

export function NavSettings({ slug }: { slug: string }) {
  const { data: session } = useSession()
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild className="mb-5 h-10">
          <Link href={`/${slug}/dashboard`}>
            <Icons.ArrowLeft />
            <span className="font-medium">Back to dashboard</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <p className="text-muted-foreground mb-1 px-2 text-xs font-semibold">
        {session?.user.email}
      </p>
      {settingsRoutes.map((item) => (
        <SidebarMenuItem key={item.name}>
          <SidebarMenuButton asChild>
            <Link href={item.path}>
              <span>{item.name}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
      <p className="text-muted-foreground mt-7 mb-1 px-2 text-xs font-semibold">
        Workspace settings
      </p>
      {workspaceSettingsRoutes.map((item) => (
        <SidebarMenuItem key={item.name}>
          <SidebarMenuButton asChild>
            <Link href={item.path}>
              <span>{item.name}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
