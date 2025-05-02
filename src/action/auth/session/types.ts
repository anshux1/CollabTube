import { z } from "zod"
import { ActionState } from "@/types/action"
import {
  revokeAllSessionSchema,
  revokeSessionSchema,
  setActiveSessionSchema,
} from "./schema"

export type InputTypeRevokeSession = z.infer<typeof revokeSessionSchema>
export type ReturnTypeRevokeSession = ActionState<InputTypeRevokeSession, string>

export type InputTypeRevokeAllSession = z.infer<typeof revokeAllSessionSchema>
export type ReturnTypeRevokeAllSession = ActionState<InputTypeRevokeAllSession, string>

export type InputTypeSetActiveSession = z.infer<typeof setActiveSessionSchema>
export type ReturnTypeSetActiveSession = ActionState<InputTypeSetActiveSession, string>
