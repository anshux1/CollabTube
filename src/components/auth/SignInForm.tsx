"use client"

import { signIn } from "@/action/auth"
import { signInSchema } from "@/action/auth/schema"
import { InputTypeSignIn } from "@/action/auth/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Lock, Mail } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useAction } from "@/hooks/useAction"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { InputField } from "@/components/form-fields"

export function SignInForm() {
  const form = useForm<InputTypeSignIn>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { execute, isLoading } = useAction(signIn, {
    onSuccess: (data) =>
      toast(`Welcome back, ${data.user.email}`, {
        description: "You're now signed in.",
      }),
    onError: (error) => toast.error(error),
  })

  const onSubmit = async (values: InputTypeSignIn) => execute(values)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-3 space-y-3">
        <InputField
          control={form.control}
          name="email"
          type="email"
          label="Email"
          className="h-10"
          placeholder="example@gmail.com"
          withIconPrefix
          Icon={Mail}
        />
        <InputField
          control={form.control}
          name="password"
          label="Password"
          className="h-10"
          withIconPrefix
          Icon={Lock}
          placeholder="Password"
          type="password"
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Please wait..." : "Sign in"}
        </Button>
      </form>
    </Form>
  )
}
