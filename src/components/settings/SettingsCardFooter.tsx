"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { CardDescription, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { SettingsActionButton } from "./SettingsActionButton"
import type { SettingsCardClassNames } from "./SettingsCard"

export interface SettingsCardFooterProps {
  className?: string
  classNames?: SettingsCardClassNames
  actionLabel?: ReactNode
  disabled?: boolean
  instructions?: ReactNode
  isPending?: boolean
  isSubmitting?: boolean
  variant?: "default" | "destructive"
  action?: () => Promise<unknown> | unknown
}

export function SettingsCardFooter({
  className,
  classNames,
  actionLabel,
  disabled,
  instructions,
  isPending,
  isSubmitting,
  variant,
  action,
}: SettingsCardFooterProps) {
  return (
    <CardFooter
      className={cn(
        "flex flex-col justify-between gap-4 rounded-b-xl md:flex-row",
        (actionLabel || instructions) && "border-t !py-4",
        variant === "destructive"
          ? "border-destructive/30 bg-destructive/10"
          : "bg-muted dark:bg-transparent",
        className,
        classNames?.footer,
      )}
    >
      {isPending ? (
        <>
          {instructions && (
            <Skeleton
              className={cn(
                "my-0.5 h-3 w-48 max-w-full md:h-4 md:w-56",
                classNames?.skeleton,
              )}
            />
          )}

          {actionLabel && (
            <Skeleton className={cn("h-8 w-14 md:ms-auto", classNames?.skeleton)} />
          )}
        </>
      ) : (
        <>
          {instructions && (
            <CardDescription
              className={cn(
                "text-muted-foreground text-xs md:text-sm",
                classNames?.instructions,
              )}
            >
              {instructions}
            </CardDescription>
          )}

          {actionLabel && (
            <SettingsActionButton
              classNames={classNames}
              actionLabel={actionLabel}
              disabled={disabled}
              isSubmitting={isSubmitting}
              variant={variant}
              onClick={action}
            />
          )}
        </>
      )}
    </CardFooter>
  )
}
