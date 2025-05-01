import { Account } from "better-auth"
import { z } from "zod"

export const sendEmailSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Email is required" }),
  url: z.string().url({ message: "URL is required" }),
})

export const welcomeEmailSchema = z.object({
  account: z.custom<Account>(),
})
