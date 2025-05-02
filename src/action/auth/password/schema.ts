import { z } from "zod"

const passwordSchema = z.string().min(8, "Password must be at least 8 characters long")

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
})

export const setPasswordSchema = z
  .object({
    newPassword: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Oops! The passwords you entered do not match",
    path: ["confirmPassword"],
  })

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Oops! The passwords you entered do not match",
    path: ["confirmPassword"],
  })

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Please enter your current password"), // ✅ explicitly added message
    newPassword: passwordSchema,
    confirmPassword: passwordSchema,
    revokeSessions: z.boolean().optional(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Oops! The new passwords do not match",
    path: ["confirmPassword"],
  })
