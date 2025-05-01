import { CreateEmailResponseSuccess } from "resend"
import { z } from "zod"
import { ActionState } from "@/types/action"
import { sendEmailSchema, welcomeEmailSchema } from "./schema"

export type InputTypeSendEmail = z.infer<typeof sendEmailSchema>
export type ReturnTypeSendEmail = ActionState<
  InputTypeSendEmail,
  CreateEmailResponseSuccess | null
>

export type InputTypeWelcomeEmail = z.infer<typeof welcomeEmailSchema>
