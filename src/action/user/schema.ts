import { z } from "zod"

export const profileUpdateSchema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty" }),
  image: z.string().optional(),
  imageRemoved: z.boolean().optional(),
  currentPath: z.string().optional(),
  fromOnboarding: z.boolean().optional(),
})
