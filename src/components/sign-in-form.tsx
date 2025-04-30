"use client"

import { signInSchema } from "@/schema/sign-in"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { InputTypeSignIn } from "@/types/sign-in"
import { authClient } from "@/lib/auth/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GoogleIcon } from "./provider-icons"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"

interface SignInFormProps {
  email?: string
  isInvitation?: boolean
  inviteLink?: string
}

export function SignInForm({ email, inviteLink, isInvitation }: SignInFormProps) {
  const form = useForm<InputTypeSignIn>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: email,
    },
  })

  const onSubmit = async (value: InputTypeSignIn) => {
    const { data, error } = await authClient.signIn.magicLink({
      email: value.email,
      callbackURL: isInvitation ? inviteLink : undefined,
    })
    if (data?.status) {
      toast.success("We sent you a login link", {
        description: "Be sure to check your spam too.",
      })
    } else {
      if (error?.message) {
        toast.error(error.message)
      }
    }
  }

  const handleOAuth = async (provider: "google") => {
    const newUserCallbackURL = isInvitation ? inviteLink : "/onboarding/profile"
    await authClient.signIn.social(
      { provider, newUserCallbackURL },
      {
        onError: (error) => {
          toast.error(error.error.message)
        },
      },
    )
  }

  return (
    <div className="space-y-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      {...field}
                      id="email"
                      className="peer ps-9"
                      placeholder="Email"
                      type="email"
                    />
                  </FormControl>
                  <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                    <Mail size={16} aria-hidden="true" />
                  </div>
                </div>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full">Sign in</Button>
        </form>
      </Form>
      <div className="before:bg-border after:bg-border flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1">
        <span className="text-muted-foreground text-xs">Or continue with</span>
      </div>
      <Button
        size="lg"
        type="submit"
        variant="outline"
        className="w-full [&_svg:not([class*='size-'])]:size-4"
        onClick={() => handleOAuth("google")}
      >
        <GoogleIcon />
        Continue with Google
      </Button>
    </div>
  )
}
