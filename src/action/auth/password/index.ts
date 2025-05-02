"use server"

import { auth } from "@/lib/auth"
import { createAction, createActionWithAuth } from "@/lib/safe-action"
import { changePasswordSchema, forgotPasswordSchema, setPasswordSchema } from "./schema"
import {
  InputTypeChangePassword,
  InputTypeForgotPassword,
  InputTypeSetPassword,
  ReturnTypeChangePassword,
  ReturnTypeForgotPassword,
  ReturnTypeSetPassword,
} from "./types"

const setPasswordHandler = async (
  input: InputTypeSetPassword,
): Promise<ReturnTypeSetPassword> => {
  try {
    const data = await auth.api.setPassword({
      body: { newPassword: input.newPassword },
    })
    if (!data.status) return { error: "Failed to set password" }
    return { data: "Password set successfully" }
  } catch {
    return { error: "Unexpected error while setting password" }
  }
}

const changePasswordHandler = async (
  input: InputTypeChangePassword,
): Promise<ReturnTypeChangePassword> => {
  try {
    await auth.api.changePassword({
      body: {
        currentPassword: input.oldPassword,
        newPassword: input.newPassword,
        revokeOtherSessions: input.revokeSessions,
      },
    })
    return { data: "Password changed successfully" }
  } catch {
    return { error: "Failed to change password" }
  }
}

const forgotPasswordHandler = async (
  values: InputTypeForgotPassword,
): Promise<ReturnTypeForgotPassword> => {
  try {
    await auth.api.forgetPassword({
      body: {
        email: values.email,
        redirectTo: "forgot-password",
      },
    })
    return { data: "Password reset link sent" }
  } catch {
    return { error: "Failed to send reset link" }
  }
}

export const changePassword = createActionWithAuth(
  changePasswordSchema,
  changePasswordHandler,
)
export const setPassword = createActionWithAuth(setPasswordSchema, setPasswordHandler)
export const forgotPassword = createAction(forgotPasswordSchema, forgotPasswordHandler)
