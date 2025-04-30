"use client"

import React, { useCallback, useId, useRef } from "react"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { createWorkspace } from "@/action/workspace"
import { createWorkspaceSchema } from "@/action/workspace/schema"
import { InputTypeCreateWorkspace } from "@/action/workspace/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { CircleUserRoundIcon, CloudUpload } from "lucide-react"
import { useForm, useWatch } from "react-hook-form"
import { toast } from "sonner"
import { useAction } from "@/hooks/useAction"
import { useFileUpload } from "@/hooks/useFileUpload"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { InputField } from "@/components/form-fields"

interface WorkspaceCreateFormProps {
  onboarding?: boolean
}

export function WorkspaceCreateForm({ onboarding }: WorkspaceCreateFormProps) {
  const id = useId()
  const pathname = usePathname()
  const router = useRouter()

  const fileInputRef = useRef<HTMLInputElement>(null)
  const form = useForm<InputTypeCreateWorkspace>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: "",
      image: "",
      slug: "",
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

  const { execute, isLoading } = useAction(createWorkspace, {
    onSuccess: (data) => {
      router.push(`/${data.slug}/dashboard`)
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const currentImage = useWatch({ control: form.control, name: "image" })

  const handleRemoveImage = useCallback(() => {
    form.setValue("image", undefined, { shouldValidate: true })
    form.setValue("imageRemoved", true, { shouldValidate: true })
  }, [form])

  const onSubmit = (value: InputTypeCreateWorkspace) => execute(value)

  return (
    <Card className="bg-background mx-auto w-full max-w-xl shadow-none">
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
                  <p className="text-sm">Image</p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <CloudUpload />
                      {currentImage ? "Change Photo" : "Upload Photo"}
                    </Button>
                    {currentImage && (
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
              label="Workspace Name"
              placeholder="Enter your name"
              disabled={isLoading}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workspace URL</FormLabel>
                  <div className="flex rounded-md shadow-xs">
                    <span className="border-input bg-background text-muted-foreground inline-flex items-center rounded-s-md border px-3 text-sm">
                      collabtube.in/
                    </span>
                    <FormControl>
                      <Input
                        {...field}
                        id={id}
                        className="-ms-px rounded-s-none shadow-none"
                        placeholder="google.com"
                        type="text"
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
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
