import { z } from "zod"
import { ActionState } from "@/types/action"
import {
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  setPasswordSchema,
} from "./schema"

export type InputTypeForgotPassword = z.infer<typeof forgotPasswordSchema>
export type ReturnTypeForgotPassword = ActionState<InputTypeForgotPassword, string>

export type InputTypeResetPassword = z.infer<typeof resetPasswordSchema>
export type ReturnTypeResetPassword = ActionState<InputTypeResetPassword, string>

export type InputTypeSetPassword = z.infer<typeof setPasswordSchema>
export type ReturnTypeSetPassword = ActionState<InputTypeSetPassword, string>

export type InputTypeChangePassword = z.infer<typeof changePasswordSchema>
export type ReturnTypeChangePassword = ActionState<InputTypeChangePassword, string>
