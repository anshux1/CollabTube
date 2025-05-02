import { z } from "zod"
import { ActionState } from "@/types/action"
import { SignInResponse, SignUpResponse } from "@/types/auth"
import { magicLinkLoginSchema, signInSchema, signUpSchema } from "./schema"

export type InputTypeMagicLinkLogin = z.infer<typeof magicLinkLoginSchema>
export type ReturnTypeMagicLinkLogin = ActionState<InputTypeMagicLinkLogin, string>

export type InputTypeSignIn = z.infer<typeof signInSchema>
export type ReturnTypeSignIn = ActionState<InputTypeSignIn, SignInResponse>

export type InputTypeSignUp = z.infer<typeof signUpSchema>
export type ReturnTypeSignUp = ActionState<InputTypeSignUp, SignUpResponse>
