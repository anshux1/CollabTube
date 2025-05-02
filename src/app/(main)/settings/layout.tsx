"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { User } from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const settingsTabLinks = [
  {
    label: "Profile",
    href: "/settings/profile",
  },
  {
    label: "Security",
    href: "/settings/security",
  },
  {
    label: "Notifications",
    href: "/settings/notifications",
  },
  {
    label: "Billing",
    href: "/settings/billing",
  },
  {
    label: "Workspaces",
    href: "/settings/workspaces",
  },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="w-full space-y-3 md:w-fit">
      <nav className="flex w-full max-w-full justify-between border-b lg:w-fit">
        <ScrollArea className="w-full">
          <div className="no-scrollbar flex h-11 space-x-2">
            {settingsTabLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                prefetch
                className={cn(
                  "hover:bg-secondary inline-flex items-center gap-2 rounded-t-sm px-4 text-sm leading-5 font-medium text-nowrap transition-colors duration-150 ease-in-out focus:outline-none [&_svg:not([class*='size-'])]:size-5",
                  {
                    "border-primary text-primary border-b-2": link.href === pathname,
                    "text-muted-foreground": link.href !== pathname,
                  },
                )}
              >
                <User />
                {link.label}
              </Link>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </nav>
      {children}
    </div>
  )
}
