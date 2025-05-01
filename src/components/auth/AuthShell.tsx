"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowLeft, Lock, WandSparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LinkButton } from "@/components/link-button"
import { Logo } from "@/components/logo"
import { MagicLinkForm } from "./MagicLinkForm"
import { SignInForm } from "./SignInForm"
import { SignupForm } from "./SignUpForm"
import { SocialLogin } from "./SocialLogin"

export default function AuthShell() {
  const pathname = usePathname()
  const isSignup = pathname === "/sign-up"

  const [isMagicLinkActive, setIsMagicLinkActive] = useState(false)

  const toggleFormText = isMagicLinkActive
    ? `${isSignup ? "Sign up" : "Sign in"} with password`
    : `${isSignup ? "Sign up" : "Sign in"} with magic link`

  return (
    <div className="relative flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <Button variant="link" asChild className="absolute top-4 left-4">
        <Link href="/">
          <ArrowLeft /> Back to home
        </Link>
      </Button>

      <div className="flex w-full max-w-sm flex-col gap-3">
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center gap-2 font-medium">
            <div className="flex h-8 w-8 items-center justify-center rounded-md">
              <Logo onlyImage />
            </div>
            <span className="sr-only">CollabTube</span>
          </div>
          <h1 className="text-2xl font-bold">Welcome to CollabTube.</h1>
          <div className="text-center text-sm">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <LinkButton
              className="p-0"
              variant="link"
              href={isSignup ? "/sign-in" : "/sign-up"}
              text={isSignup ? "Sign in" : "Sign up"}
            />
          </div>
        </div>

        {isMagicLinkActive ? (
          <MagicLinkForm />
        ) : isSignup ? (
          <SignupForm />
        ) : (
          <SignInForm />
        )}

        <div className="before:bg-border after:bg-border flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1">
          <span className="text-muted-foreground text-sm">Or continue with</span>
        </div>

        <Button
          onClick={() => setIsMagicLinkActive((prev) => !prev)}
          variant="outline"
          className="w-full"
        >
          {isMagicLinkActive ? (
            <Lock className="size-4" />
          ) : (
            <WandSparkles className="size-4" />
          )}
          {toggleFormText}
        </Button>
        <SocialLogin />

        <div className="text-muted-foreground hover:[&_a]:text-primary text-center text-xs text-balance [&_a]:underline [&_a]:underline-offset-4">
          By clicking continue, you agree to our <a href="#">Terms of Service</a> and{" "}
          <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  )
}
