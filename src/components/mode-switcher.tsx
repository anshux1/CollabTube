"use client"

import * as React from "react"
import { LaptopMinimal, Moon, Sun, SunMedium } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenuCheckboxItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"

type ModeSwitcherProps = {
  variant?: "button" | "dropdown"
}

export const themeOptions = [
  { label: "System", value: "system", icon: LaptopMinimal },
  { label: "Light", value: "light", icon: Sun },
  { label: "Dark", value: "dark", icon: Moon },
]

export function ModeSwitcher({ variant = "button" }: ModeSwitcherProps) {
  const { setTheme, resolvedTheme, theme } = useTheme()

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }, [resolvedTheme, setTheme])

  if (variant === "button") {
    return (
      <Button
        size="icon"
        variant="ghost"
        className="group/toggle size-9 px-0"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        <Sun className="hidden size-5 [html.dark_&]:block" />
        <Moon className="hidden size-5 [html.light_&]:block" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="[&_svg:not([class*='text-'])]:text-muted-foreground data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
        <SunMedium className="mr-2" />
        Appearance
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          {themeOptions.map((option) => (
            <DropdownMenuCheckboxItem
              key={option.value}
              className="gap-3 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
              checked={option.value === theme}
              onClick={() => setTheme(option.value)}
            >
              <option.icon />
              {option.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
}
