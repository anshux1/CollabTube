"use client"

import { magicLinkLogin } from "@/action/auth"
import { magicLinkLoginSchema } from "@/action/auth/schema"
import { InputTypeMagicLinkLogin } from "@/action/auth/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useAction } from "@/hooks/useAction"
import { Form } from "@/components/ui/form"
import { InputField } from "../form-fields"
import { Button } from "../ui/button"

interface MagicLinkLoginProps {
  email?: string
  isInvitation?: boolean
  inviteLink?: string
}

export function MagicLinkForm({ isInvitation, inviteLink, email }: MagicLinkLoginProps) {
  const form = useForm<InputTypeMagicLinkLogin>({
    resolver: zodResolver(magicLinkLoginSchema),
    defaultValues: {
      email: email,
      inviteLink: isInvitation ? inviteLink : undefined,
    },
  })
  const { execute, isLoading } = useAction(magicLinkLogin, {
    onSuccess: () =>
      toast("We sent you a login link", {
        description: "Be sure to check your spam too.",
      }),
    onError: (error) => toast.error(error),
  })

  const onSubmit = async (values: InputTypeMagicLinkLogin) => execute(values)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <InputField
          control={form.control}
          name="email"
          type="email"
          Icon={Mail}
          placeholder="Email"
          label="Email"
          withIconPrefix
        />
        <Button disabled={isLoading} className="w-full">
          {!isLoading ? "Continue" : "Sending link..."}
        </Button>
      </form>
    </Form>
  )
}
