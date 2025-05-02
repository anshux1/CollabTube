"use client"

import type { ComponentProps, ReactNode } from "react"
import { Loader2 } from "lucide-react"
import { useFormState } from "react-hook-form"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { SettingsCardClassNames } from "./SettingsCard"

interface SettingsActionButtonProps extends ComponentProps<typeof Button> {
  classNames?: SettingsCardClassNames
  actionLabel: ReactNode
  disabled?: boolean
  isSubmitting?: boolean
}

export function SettingsActionButton({
  classNames,
  actionLabel,
  disabled,
  isSubmitting,
  variant,
  onClick,
  ...props
}: SettingsActionButtonProps) {
  const formState = useFormState()

  const loading = onClick ? isSubmitting : formState.isSubmitting
  return (
    <Button
      className={cn(
        "md:ms-auto",
        classNames?.button,
        variant === "default" && classNames?.primaryButton,
        variant === "destructive" && classNames?.destructiveButton,
      )}
      disabled={loading || disabled}
      size="sm"
      type={onClick ? "button" : "submit"}
      variant={variant}
      onClick={onClick}
      {...props}
    >
      {isSubmitting && <Loader2 className="animate-spin" />}
      {actionLabel}
    </Button>
  )
}
