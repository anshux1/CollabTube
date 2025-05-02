import { z } from "zod"

export const signInSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
})

export const signUpSchema = signInSchema.extend({
  name: z.string().min(1, { message: "Name is required" }),
})

export const magicLinkLoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  inviteLink: z.string().optional(),
})
