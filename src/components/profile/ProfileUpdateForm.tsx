"use client"

import React, { useCallback, useId, useRef } from "react"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { deleteBlob as deleteBlobHandler } from "@/action/azure"
import { onboardingProfile } from "@/action/user"
import { profileUpdateSchema } from "@/action/user/schema"
import { InputTypeProfileUpdate } from "@/action/user/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { CircleUserRoundIcon, CloudUpload } from "lucide-react"
import { useForm, useWatch } from "react-hook-form"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { useAction } from "@/hooks/useAction"
import { useFileUpload } from "@/hooks/useFileUpload"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InputField } from "@/components/form-fields"

interface ProfileUpdateFormProps {
  email: string
  name: string
  image?: string
  onboarding?: boolean
  className?: string
}

export function ProfileUpdateForm({
  name,
  email,
  image,
  onboarding,
  className,
}: ProfileUpdateFormProps) {
  const id = useId()
  const pathname = usePathname()
  const router = useRouter()

  const fileInputRef = useRef<HTMLInputElement>(null)
  const form = useForm<InputTypeProfileUpdate>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      name,
      image,
      imageRemoved: false,
      fromOnboarding: onboarding,
      currentPath: pathname,
    },
  })

  const [{ file, isUploading, isDragging }, { openFileDialog, getInputProps }] =
    useFileUpload({
      maxSize: 5 * 1024 * 1024,
      accept: "image/*",
      onFileChange: (file) => {
        form.setValue("image", file?.url ?? undefined, { shouldValidate: true })
      },
    })

  const { execute, isLoading } = useAction(onboardingProfile, {
    onSuccess: () => {
      router.push("/onboarding/workspace")
    },
    onError: (error) => {
      toast.error(error)
    },
  })
  const { execute: deleteBlob } = useAction(deleteBlobHandler, {
    onSuccess: () => {
      router.push("/onboarding/workspace")
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const currentImage = useWatch({ control: form.control, name: "image" })

  const handleRemoveImage = useCallback(() => {
    if (currentImage && image !== currentImage) {
      deleteBlob({ url: currentImage })
    }
    form.setValue("image", undefined, { shouldValidate: true })
    form.setValue("imageRemoved", true, { shouldValidate: true })
  }, [form, deleteBlob, currentImage, image])

  const onSubmit = (value: InputTypeProfileUpdate) => execute(value)

  return (
    <Card className={cn("bg-background w-full max-w-xl shadow-none", className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-4">
              <div className="relative flex gap-4">
                <div
                  className="border-input hover:border-foreground/50 hover:bg-accent/50 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex size-20 items-center justify-center overflow-hidden rounded-sm border border-dashed transition-colors has-disabled:pointer-events-none has-disabled:opacity-50"
                  role="button"
                  onClick={openFileDialog}
                  data-dragging={isDragging || undefined}
                  aria-label={currentImage ? "Change image" : "Upload image"}
                >
                  {currentImage ? (
                    <Image
                      className="size-full object-cover"
                      src={currentImage}
                      alt="Profile image"
                      width={128}
                      height={128}
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <CircleUserRoundIcon
                      className="size-8 opacity-60"
                      aria-hidden="true"
                    />
                  )}
                  {isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
                      <span className="text-sm text-white">{file?.progress}%</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <p className="text-sm">Profile image</p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <CloudUpload />
                      {image ? "Change Photo" : "Upload Photo"}
                    </Button>
                    {image && (
                      <Button
                        size="sm"
                        variant="outline"
                        type="button"
                        onClick={handleRemoveImage}
                      >
                        Remove Photo
                      </Button>
                    )}
                  </div>
                  <p className="text-muted-foreground text-xs">
                    Files up to 2MB at least 400px by 400px
                  </p>
                </div>
                <input
                  {...getInputProps()}
                  ref={fileInputRef}
                  className="sr-only"
                  aria-label="Upload profile image file"
                />
              </div>
            </div>
            <InputField
              control={form.control}
              name="name"
              label="Name"
              placeholder="Enter your name"
              disabled={isLoading}
            />
            <div className="space-y-2">
              <Label htmlFor={id}>Email</Label>
              <div className="flex rounded-md shadow-xs">
                <Input
                  id={id}
                  placeholder="Email"
                  defaultValue={email}
                  disabled
                  type="email"
                />
              </div>
            </div>
            <Button
              className="w-full"
              disabled={isLoading || isUploading}
              aria-disabled={isLoading || isUploading}
            >
              {isLoading ? "Please wait..." : "Continue"}
            </Button>
          </CardContent>
        </form>
      </Form>
    </Card>
  )
}
