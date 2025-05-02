"use client"

import { useRef } from "react"
import { usePathname } from "next/navigation"
import { updateImage } from "@/action/auth/account"
import { updateImageSchema } from "@/action/auth/account/schema"
import { InputTypeUpdateImage } from "@/action/auth/account/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { useSession } from "@/hooks/auth/useSession"
import { useAction } from "@/hooks/useAction"
import { useFileUpload } from "@/hooks/useFileUpload"
import { Card } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { Skeleton } from "@/components/ui/skeleton"
import { UserAvatar } from "@/components/common/UserAvatar"
import type { SettingsCardClassNames } from "../SettingsCard"
import { SettingsCardFooter } from "../SettingsCardFooter"
import { SettingsCardHeader } from "../SettingsCardHeader"

export interface UpdateAvatarCardProps {
  className?: string
  classNames?: SettingsCardClassNames
  isPending?: boolean
}

export function ProfileAvatarCard({ className, classNames }: UpdateAvatarCardProps) {
  const pathname = usePathname()
  const { data: sessionData, isPending } = useSession()
  const form = useForm<InputTypeUpdateImage>({
    resolver: zodResolver(updateImageSchema),
    defaultValues: {
      image: "",
      pathname,
    },
  })
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [{ isUploading }, { openFileDialog, getInputProps }] = useFileUpload({
    maxSize: 5 * 1024 * 1024,
    accept: "image/*",
    onFileChange: (file) => {
      form.setValue("image", file?.url, { shouldValidate: true })
    },
  })

  const { execute, isLoading } = useAction(updateImage, {
    onSuccess: (data) => toast(data),
    onError: (error) => toast.error(error),
  })
  const currentImage = useWatch({ control: form.control, name: "image" })

  const onSubmit = (value: InputTypeUpdateImage) => execute(value)

  if (!sessionData?.user) return
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className={cn("w-full pb-0 text-start", className, classNames?.base)}>
          <input
            {...getInputProps()}
            ref={fileInputRef}
            className="sr-only"
            aria-label="Upload profile image file"
          />
          <div className="flex justify-between">
            <SettingsCardHeader
              className="grow self-start"
              title="Avatar"
              description="Click on the avatar to upload a custom one from your files."
              isPending={isPending}
              classNames={classNames}
            />
            <button
              className={cn("me-6")}
              type="button"
              onClick={() => fileInputRef.current?.click()}
            >
              {isPending ? (
                <Skeleton
                  className={cn("size-20 rounded-full", classNames?.avatar?.base)}
                />
              ) : (
                <UserAvatar
                  onClick={openFileDialog}
                  key={sessionData?.user.image}
                  className="size-20 text-2xl"
                  classNames={classNames?.avatar}
                  user={{
                    name: sessionData?.user.name,
                    image: currentImage || sessionData?.user.image || "",
                  }}
                />
              )}
            </button>
          </div>
          <SettingsCardFooter
            actionLabel="Save"
            className="!py-5"
            instructions="An avatar is optional but strongly recommended."
            classNames={classNames}
            isPending={isPending}
            isSubmitting={isLoading || isUploading}
            action={() => onSubmit(form.getValues())}
          />
        </Card>
      </form>
    </Form>
  )
}
