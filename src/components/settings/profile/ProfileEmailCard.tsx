"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { changeEmailRequest } from "@/action/auth/account"
import { changeEmailRequestSchema } from "@/action/auth/account/schema"
import { InputTypeChangeEmailRequest } from "@/action/auth/account/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { authClient } from "@/lib/auth/client"
import { cn } from "@/lib/utils"
import { useSession } from "@/hooks/auth/useSession"
import { useAction } from "@/hooks/useAction"
import { CardContent } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { InputField } from "../../form-fields"
import { Skeleton } from "../../ui/skeleton"
import { SettingsCard, type SettingsCardClassNames } from "../SettingsCard"

export interface ChangeEmailCardProps {
  className?: string
  classNames?: SettingsCardClassNames
  isPending?: boolean
}

export function ProfileEmailCard({
  className,
  classNames,
  isPending,
}: ChangeEmailCardProps) {
  const pathname = usePathname()
  const { data: sessionData, isPending: sessionPending, refetch } = useSession()
  const [resendDisabled, setResendDisabled] = useState(false)
  const form = useForm<InputTypeChangeEmailRequest>({
    resolver: zodResolver(changeEmailRequestSchema),
    values: {
      email: sessionData?.user.email || "",
      pathname,
    },
  })

  const resendForm = useForm()

  const { execute, isLoading } = useAction(changeEmailRequest, {
    onSuccess: (data) => {
      refetch()
      toast(data)
    },
  })

  const changeEmail = async (values: InputTypeChangeEmailRequest) => {
    if (values.email === sessionData?.user.email) {
      await new Promise((resolve) => setTimeout(resolve))
      return
    }
    execute(values)
  }

  const resendVerification = async () => {
    if (!sessionData) return
    const email = sessionData.user.email

    setResendDisabled(true)

    try {
      await authClient.sendVerificationEmail({
        email,
        fetchOptions: { throw: true },
      })
    } catch (error) {
      setResendDisabled(false)
      throw error
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(changeEmail)}>
          <SettingsCard
            className={className}
            classNames={classNames}
            description="Enter the email address you want to use to log in."
            instructions="Please enter a valid email address."
            isPending={isPending || sessionPending}
            title="Email"
            actionLabel="Save"
          >
            <CardContent className={classNames?.content}>
              {isPending || sessionPending ? (
                <Skeleton className={cn("h-9 w-full", classNames?.skeleton)} />
              ) : (
                <InputField
                  control={form.control}
                  name="email"
                  withIconPrefix
                  Icon={Mail}
                  disabled={isLoading}
                  placeholder="m@example.com"
                />
              )}
            </CardContent>
          </SettingsCard>
        </form>
      </Form>

      {sessionData?.user && !sessionData?.user.emailVerified && (
        <Form {...resendForm}>
          <form onSubmit={resendForm.handleSubmit(resendVerification)}>
            <SettingsCard
              className={className}
              classNames={classNames}
              title="Verify Your Email"
              description="Please verify your email address. Check your inbox for the verification email. If you haven't received the email, click the button below to resend."
              actionLabel="Resend Verification Email"
              disabled={resendDisabled}
            />
          </form>
        </Form>
      )}
    </>
  )
}
