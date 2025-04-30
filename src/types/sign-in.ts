import { signInSchema } from "@/schema/sign-in"
import { z } from "zod"

export type InputTypeSignIn = z.infer<typeof signInSchema>
