"use client"

import { signUp } from "@/action/auth"
import { signUpSchema } from "@/action/auth/schema"
import { InputTypeSignUp } from "@/action/auth/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Lock, Mail, User } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useAction } from "@/hooks/useAction"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { InputField } from "@/components/form-fields"

export function SignupForm() {
  const form = useForm<InputTypeSignUp>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const { execute, isLoading } = useAction(signUp, {
    onSuccess: (data) =>
      toast(`Welcome, ${data.user?.email || "there"}!`, {
        description: "Check your inbox and verify your email to get started.",
      }),
    onError: (error) =>
      toast.error("Sign up failed", {
        description: error || "Something went wrong. Please try again.",
      }),
  })

  const onSubmit = async (values: InputTypeSignUp) => execute(values)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (e) => console.log(e))}
        className="mt-3 space-y-3"
      >
        <InputField
          control={form.control}
          name="name"
          withIconPrefix
          Icon={User}
          label="Name"
          placeholder="Alex"
        />
        <InputField
          control={form.control}
          name="email"
          type="email"
          label="Email"
          placeholder="example@gmail.com"
          withIconPrefix
          Icon={Mail}
        />
        <InputField
          control={form.control}
          name="password"
          label="Password"
          withIconPrefix
          Icon={Lock}
          placeholder="Password"
          type="password"
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Please wait..." : "Sign up"}
        </Button>
      </form>
    </Form>
  )
}
