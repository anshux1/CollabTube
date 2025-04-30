import { z } from "zod"

export const createWorkspaceSchema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty" }),
  image: z.string().optional(),
  slug: z.string().min(1, { message: "Slug cannot be empty" }),
  imageRemoved: z.boolean().optional(),
  currentPath: z.string().optional(),
  fromOnboarding: z.boolean().optional(),
})
