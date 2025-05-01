"use server"

import { headers } from "next/headers"
import { messages } from "@/config/messages"
import { auth } from "@/lib/auth"
import { createAction, createActionWithAuth } from "@/lib/safe-action"
import db from "@/db"
import {
  changeEmailRequestSchema,
  magicLinkLoginSchema,
  markEmailVerifiedSchema,
  signInSchema,
  signUpSchema,
} from "./schema"
import {
  InputTypeChangeEmailRequest,
  InputTypeMagicLinkLogin,
  InputTypeMarkUserEmailVerified,
  InputTypeSignIn,
  InputTypeSignUp,
  ReturnTypeChangeEmailRequest,
  ReturnTypeMagicLinkLogin,
  ReturnTypeMarkUserEmailVerified,
  ReturnTypeSignIn,
  ReturnTypeSignUp,
} from "./types"

const magicLinkLoginHandler = async (
  input: InputTypeMagicLinkLogin,
): Promise<ReturnTypeMagicLinkLogin> => {
  try {
    const data = await auth.api.signInMagicLink({
      body: {
        email: input.email,
        callbackURL: input.inviteLink,
      },
      headers: await headers(),
    })

    return { data }
  } catch (err) {
    console.log("Error :", err)
    return { error: "An unexpected error occurred during sign-in" }
  }
}

const signInHandler = async (input: InputTypeSignIn): Promise<ReturnTypeSignIn> => {
  try {
    const data = await auth.api.signInEmail({
      body: {
        email: input.email,
        password: input.password,
        callbackURL: "/dashboard",
      },
      headers: await headers(),
    })

    return { data }
  } catch (err) {
    console.log("Sign-in Error:", err)
    return { error: "An unexpected error occurred during sign-in" }
  }
}

const signUpHandler = async (input: InputTypeSignUp): Promise<ReturnTypeSignUp> => {
  try {
    const data = await auth.api.signUpEmail({
      body: {
        name: input.name,
        email: input.email,
        password: input.password,
        onboardingStep: "profile",
      },
      headers: await headers(),
      params: ["ANSH"],
    })
    console.log("Sign-up data:", data)
    return { data }
  } catch (err) {
    console.log("Sign-up Error:", err)
    return { error: "An unexpected error occurred during sign-up." }
  }
}

const changeEmailRequestHandler = async (
  input: InputTypeChangeEmailRequest,
): Promise<ReturnTypeChangeEmailRequest> => {
  try {
    const data = await auth.api.changeEmail({
      body: { newEmail: input.email },
      headers: await headers(),
    })
    return { data }
  } catch {
    return { error: messages.EMAIL_CHANGE_REQUESTED.error }
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
    return { data: messages.EMAIL_VERIFIED.success }
  } catch {
    return { error: messages.EMAIL_VERIFIED.error }
  }
}

export const signIn = createAction(signInSchema, signInHandler)
export const signUp = createAction(signUpSchema, signUpHandler)
export const magicLinkLogin = createAction(magicLinkLoginSchema, magicLinkLoginHandler)
export const changeEmailRequest = createActionWithAuth(
  changeEmailRequestSchema,
  changeEmailRequestHandler,
)
export const markEmailVerified = createActionWithAuth(
  markEmailVerifiedSchema,
  markEmailasVerifiedHandler,
)
