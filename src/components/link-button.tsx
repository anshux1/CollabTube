import React from "react"
import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export const LinkButton = ({
  href,
  icon: Icon,
  text,
  children,
  ...props
}: React.ComponentProps<typeof Link> &
  React.ComponentProps<typeof Button> & {
    text?: string
    icon?: LucideIcon
  }) => {
  return (
    <Button asChild {...props}>
      <Link href={href}>
        {Icon && <Icon />}
        {text}
        {children}
      </Link>
    </Button>
  )
}
