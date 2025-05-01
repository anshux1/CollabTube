"use client"

import * as React from "react"
import { QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { Toaster } from "sonner"
import { getQueryClient } from "@/lib/getQueryClient"

export function Provider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableColorScheme
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster richColors position="bottom-right" />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
