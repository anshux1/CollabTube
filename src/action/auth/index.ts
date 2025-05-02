"use server"

import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { createAction } from "@/lib/safe-action"
import { magicLinkLoginSchema, signInSchema, signUpSchema } from "./schema"
import {
  InputTypeMagicLinkLogin,
  InputTypeSignIn,
  InputTypeSignUp,
  ReturnTypeMagicLinkLogin,
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

    if (!data.status) {
      return { error: "Failed to send magic link" }
    }
    return { data: "Magic link sent" }
  } catch {
    return { error: "Failed to send magic link" }
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
    })

    return { data }
  } catch {
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
    })
    return { data }
  } catch {
    return { error: "An unexpected error occurred during sign-up." }
  }
}

export const signIn = createAction(signInSchema, signInHandler)
export const signUp = createAction(signUpSchema, signUpHandler)
export const magicLinkLogin = createAction(magicLinkLoginSchema, magicLinkLoginHandler)
