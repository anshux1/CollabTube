"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { updateName } from "@/action/auth/account"
import { updateNameSchema } from "@/action/auth/account/schema"
import { InputTypeUpdateName } from "@/action/auth/account/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "lucide-react"
import { useForm } from "react-hook-form"
import { cn } from "@/lib/utils"
import { useSession } from "@/hooks/auth/useSession"
import { useAction } from "@/hooks/useAction"
import { CardContent } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { Skeleton } from "@/components/ui/skeleton"
import { InputField } from "@/components/form-fields"
import { SettingsCard } from "../SettingsCard"

export function ProfileNameCard() {
  const pathname = usePathname()
  const { data: session, isPending } = useSession()
  const userName = session?.user.name
  console.log("userName", userName)
  const form = useForm<InputTypeUpdateName>({
    resolver: zodResolver(updateNameSchema),
    defaultValues: {
      name: "",
      pathname,
    },
  })

  useEffect(() => {
    if (userName) {
      form.setValue("name", userName)
    }
  }, [userName, form])

  const { execute } = useAction(updateName)

  const onSubmit = async (values: InputTypeUpdateName) => execute(values)
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <SettingsCard
          description="Please enter your full name, or a display name."
          instructions="Please use 32 characters at maximum."
          isPending={isPending}
          title="Name"
          actionLabel="Save"
        >
          <CardContent>
            {isPending ? (
              <Skeleton className={cn("h-9 w-full")} />
            ) : (
              <InputField
                control={form.control}
                name="name"
                withIconPrefix
                Icon={User}
                placeholder="Enter your name"
              />
            )}
          </CardContent>
        </SettingsCard>
      </form>
    </Form>
  )
}
