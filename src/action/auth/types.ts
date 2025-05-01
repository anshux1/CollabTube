import { z } from "zod"
import { ActionState } from "@/types/action"
import {
  ChangeEmailResponse,
  MagicLinkResponse,
  SignInResponse,
  SignUpResponse,
} from "@/types/auth"
import {
  changeEmailRequestSchema,
  magicLinkLoginSchema,
  markEmailVerifiedSchema,
  signInSchema,
  signUpSchema,
} from "./schema"

export type InputTypeMagicLinkLogin = z.infer<typeof magicLinkLoginSchema>
export type ReturnTypeMagicLinkLogin = ActionState<
  InputTypeMagicLinkLogin,
  MagicLinkResponse
>

export type InputTypeSignIn = z.infer<typeof signInSchema>
export type ReturnTypeSignIn = ActionState<InputTypeSignIn, SignInResponse>

export type InputTypeSignUp = z.infer<typeof signUpSchema>
export type ReturnTypeSignUp = ActionState<InputTypeSignUp, SignUpResponse>

export type InputTypeChangeEmailRequest = z.infer<typeof changeEmailRequestSchema>
export type ReturnTypeChangeEmailRequest = ActionState<
  InputTypeChangeEmailRequest,
  ChangeEmailResponse
>
export type InputTypeMarkUserEmailVerified = z.infer<typeof markEmailVerifiedSchema>
export type ReturnTypeMarkUserEmailVerified = ActionState<
  InputTypeMarkUserEmailVerified,
  string
>
