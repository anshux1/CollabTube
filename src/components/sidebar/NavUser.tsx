"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BadgeCheck, Bell, CreditCard, LogOut, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { useSession } from "@/hooks/auth/useSession"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ModeSwitcher } from "../mode-switcher"

export function UserAvatar({
  name,
  image,
  className,
}: {
  name: string
  image?: string
  className?: string
}) {
  return (
    <Avatar className={cn("size-8 rounded-lg", className)}>
      <AvatarImage src={image || ""} alt={name} />
      <AvatarFallback className="rounded-lg">{name.charAt(0)}</AvatarFallback>
    </Avatar>
  )
}

export function UserDetails({ name, email }: { name: string; email: string }) {
  return (
    <div className="grid flex-1 text-left text-sm leading-tight">
      <span className="truncate font-semibold">{name}</span>
      <span className="truncate text-xs">{email}</span>
    </div>
  )
}

export function NavUser({ slug }: { slug: string }) {
  const { data: session, isPending } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!isPending && !session) {
    }
  }, [isPending, session, router])

  if (isPending) {
    return <div className="bg-secondary h-11 w-full animate-pulse rounded-md" />
  }

  if (!session?.user) return null
  const { user } = session

  const accountMenuItems = [
    { icon: <BadgeCheck />, label: "Account" },
    { icon: <CreditCard />, label: "Billing" },
    { icon: <Bell />, label: "Notifications" },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:bg-accent hover:text-accent-foreground flex gap-2 rounded-md p-2 transition-colors duration-200 ease-in-out">
        <UserAvatar name={user.name} image={user.image || ""} />
        <UserDetails name={user.name} email={user.email} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-2 font-normal">
          <p className="text-muted-foreground mb-2 text-xs font-semibold">{user.email}</p>
          <div className="flex items-center gap-2 text-left text-sm">
            <UserAvatar name={user.name} image={user.image || ""} />
            <UserDetails name={user.name} email={"Tier"} />
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Sparkles />
            Upgrade to Pro
          </DropdownMenuItem>
          <ModeSwitcher variant="dropdown" />
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {accountMenuItems.map((item) => (
            <DropdownMenuItem key={item.label} asChild>
              <Link href={`/${slug}/settings/${item.label.toLowerCase()}`}>
                {item.icon}
                {item.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
