import type { ReactNode } from "react"
import { Logo } from "@/components/logo"

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col justify-center">
      <div className="flex h-14 w-full items-center justify-center">
        <Logo />
      </div>
      <div className="flex flex-1 items-center">{children}</div>
      <div className="h-14 w-full"></div>
    </div>
  )
}
