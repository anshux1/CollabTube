import { z } from "zod"

export const deleteBlobSchema = z.object({
  url: z.string().url({ message: "Please provide a valid image URL" }),
})
