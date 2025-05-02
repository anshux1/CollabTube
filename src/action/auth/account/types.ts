import { z } from "zod"
import { ActionState } from "@/types/action"
import {
  changeEmailRequestSchema,
  markEmailVerifiedSchema,
  unlinkAccountSchema,
  updateImageSchema,
  updateNameSchema,
} from "./schema"

export type InputTypeChangeEmailRequest = z.infer<typeof changeEmailRequestSchema>
export type ReturnTypeChangeEmailRequest = ActionState<
  InputTypeChangeEmailRequest,
  string
>
export type InputTypeMarkUserEmailVerified = z.infer<typeof markEmailVerifiedSchema>
export type ReturnTypeMarkUserEmailVerified = ActionState<
  InputTypeMarkUserEmailVerified,
  string
>

export type InputTypeUnlinkAccount = z.infer<typeof unlinkAccountSchema>
export type ReturnTypeUnlinkAccount = ActionState<InputTypeUnlinkAccount, string>

export type InputTypeUpdateName = z.infer<typeof updateNameSchema>
export type ReturnTypeUpdateName = ActionState<InputTypeUpdateName, string>

export type InputTypeUpdateImage = z.infer<typeof updateImageSchema>
export type ReturnTypeUpdateImage = ActionState<InputTypeUpdateImage, string>
