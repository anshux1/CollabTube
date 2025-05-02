import { z } from "zod"

export const changeEmailRequestSchema = z.object({
  email: z.string().email({ message: "Enter a valid email" }),
  pathname: z.string(),
})

export const markEmailVerifiedSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Enter a valid email" }),
})

export const unlinkAccountSchema = z.object({
  providerId: z.string().min(1, { message: "Provider ID is required" }),
  accountId: z.string().min(1, { message: "Account ID is required" }),
})

export const updateNameSchema = z.object({
  name: z.string({ message: "Invalid name" }),
  pathname: z.string(),
})

export const updateImageSchema = z.object({
  image: z.string().url({ message: "Invalid image URL" }).optional(),
  pathname: z.string(),
})
