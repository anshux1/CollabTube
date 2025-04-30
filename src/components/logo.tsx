import React from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

export const Logo = ({ onlyImage = false }: { onlyImage?: boolean }) => {
  return (
    <Link href="/" className={cn("flex items-center gap-2")}>
      <Image
        src="/Logo.svg"
        className="text-red-800 dark:invert"
        alt="Logo"
        width={40}
        height={40}
      />
      {!onlyImage && <h1 className="text-2xl font-bold tracking-tight">CollabTube</h1>}
    </Link>
  )
}
