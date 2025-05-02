import { z } from "zod"

export const revokeSessionSchema = z.object({
  token: z.string(),
  pathname: z.string(),
})

export const revokeAllSessionSchema = z.object({
  pathname: z.string(),
})

export const setActiveSessionSchema = z.object({
  sessionToken: z.string(),
  pathname: z.string(),
})
