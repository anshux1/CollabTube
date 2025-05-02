"use server"

import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { createActionWithAuth } from "@/lib/safe-action"
import db from "@/db"
import {
  changeEmailRequestSchema,
  markEmailVerifiedSchema,
  unlinkAccountSchema,
  updateImageSchema,
  updateNameSchema,
} from "./schema"
import {
  InputTypeChangeEmailRequest,
  InputTypeMarkUserEmailVerified,
  InputTypeUnlinkAccount,
  InputTypeUpdateImage,
  InputTypeUpdateName,
  ReturnTypeChangeEmailRequest,
  ReturnTypeMarkUserEmailVerified,
  ReturnTypeUnlinkAccount,
  ReturnTypeUpdateImage,
  ReturnTypeUpdateName,
} from "./types"

const changeEmailRequestHandler = async (
  input: InputTypeChangeEmailRequest,
): Promise<ReturnTypeChangeEmailRequest> => {
  try {
    const data = await auth.api.changeEmail({
      body: { newEmail: input.email },
      headers: await headers(),
    })

    if (!data.status) {
      return { error: "Failed to send verification email" }
    }
    return { data: "Verification email sent" }
  } catch (err) {
    console.error("Email:", err)
    return { error: "Something went wrong" }
  }
}

const markEmailasVerifiedHandler = async (
  input: InputTypeMarkUserEmailVerified,
): Promise<ReturnTypeMarkUserEmailVerified> => {
  try {
    await db.user.update({
      where: { email: input.email, name: input.name },
      data: { emailVerified: true },
    })
    return { data: "Email marked as verified" }
  } catch {
    return { error: "Failed to verify email" }
  }
}

const unlinkAccountHandler = async (
  input: InputTypeUnlinkAccount,
): Promise<ReturnTypeUnlinkAccount> => {
  try {
    const data = await auth.api.unlinkAccount({
      body: { ...input },
      headers: await headers(),
    })
    if (!data.status) {
      return { error: "Unlink failed" }
    }

    return { data: "Account unlinked" }
  } catch {
    return { error: "Something went wrong" }
  }
}

const updateNameHandler = async (
  input: InputTypeUpdateName,
): Promise<ReturnTypeUpdateName> => {
  try {
    const data = await auth.api.updateUser({
      body: { name: input.name },
      headers: await headers(),
    })

    revalidatePath(input.pathname)
    if (!data.status) {
      return { error: "Could not update your name" }
    }

    return { data: "Name updated successfully!" }
  } catch (err) {
    console.error(err)
    return { error: "Something went wrong" }
  }
}

const updateImageHandler = async (
  input: InputTypeUpdateImage,
): Promise<ReturnTypeUpdateImage> => {
  try {
    const data = await auth.api.updateUser({
      body: { image: input.image },
      headers: await headers(),
    })

    revalidatePath(input.pathname)
    if (!data.status) {
      return { error: "Could not update your image" }
    }

    return { data: "image updated successfully!" }
  } catch (err) {
    console.error(err)
    return { error: "Something went wrong" }
  }
}

export const changeEmailRequest = createActionWithAuth(
  changeEmailRequestSchema,
  changeEmailRequestHandler,
)

export const markEmailVerified = createActionWithAuth(
  markEmailVerifiedSchema,
  markEmailasVerifiedHandler,
)
export const unlinkAccount = createActionWithAuth(
  unlinkAccountSchema,
  unlinkAccountHandler,
)
export const updateName = createActionWithAuth(updateNameSchema, updateNameHandler)

export const updateImage = createActionWithAuth(updateImageSchema, updateImageHandler)
