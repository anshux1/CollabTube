"use client"

import { toast } from "sonner"
import { authClient } from "@/lib/auth/client"
import { Button } from "@/components/ui/button"
import { DropboxIcon, GoogleIcon } from "@/components/provider-icons"

const PROVIDERS: {
  name: string
  id: "google" | "dropbox"
  icon: React.ComponentType<{ className?: string }>
}[] = [
  { name: "Google", id: "google", icon: GoogleIcon },
  { name: "Dropbox", id: "dropbox", icon: DropboxIcon },
]

export function SocialLogin() {
  const handleAuth = async (provider: "google" | "dropbox") => {
    try {
      await authClient.signIn.social(
        {
          provider,
          callbackURL: "/dashboard",
          newUserCallbackURL: "/onboarding",
        },
        {
          onSuccess: () => {
            toast("Signed in successfully")
          },
          onError: (error) => {
            console.error(error)
            toast.error(error?.error?.message || "Something went wrong.")
          },
        },
      )
    } catch (err) {
      console.error(err)
      toast.error("Authentication failed.")
    }
  }

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        {PROVIDERS.map(({ id, name, icon: Icon }) => (
          <Button
            key={id}
            variant="outline"
            className="w-full [&_svg:not([class*='size-'])]:size-4"
            onClick={() => handleAuth(id)}
          >
            <Icon />
            {name}
          </Button>
        ))}
      </div>
    </div>
  )
}
