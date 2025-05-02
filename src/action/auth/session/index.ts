"use server"

import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { createActionWithAuth } from "@/lib/safe-action"
import {
  revokeAllSessionSchema,
  revokeSessionSchema,
  setActiveSessionSchema,
} from "./schema"
import {
  InputTypeRevokeAllSession,
  InputTypeRevokeSession,
  InputTypeSetActiveSession,
  ReturnTypeRevokeSession,
  ReturnTypeSetActiveSession,
} from "./types"

const revokeSessionHandler = async (
  input: InputTypeRevokeSession,
): Promise<ReturnTypeRevokeSession> => {
  try {
    const data = await auth.api.revokeSession({
      body: { ...input },
      headers: await headers(),
    })
    if (!data.status) return { error: "Could not revoke session" }
    return { data: "Session revoked" }
  } catch {
    return { error: "Unexpected error occurred while revoking session" }
  }
}

const revokeAllSessionHandler = async (input: InputTypeRevokeAllSession) => {
  try {
    const data = await auth.api.revokeSessions({
      headers: await headers(),
    })
    revalidatePath(input.pathname)
    if (!data.status) return { error: "Failed to revoke all sessions" }
    return { data: "All sessions revoked" }
  } catch {
    return { error: "Unexpected error occurred while revoking all sessions" }
  }
}

const setActiveSessionHandler = async (
  input: InputTypeSetActiveSession,
): Promise<ReturnTypeSetActiveSession> => {
  try {
    const data = await auth.api.setActiveSession({
      body: { sessionToken: input.sessionToken },
      headers: await headers(),
    })
    revalidatePath(input.pathname)
    if (data.session && data.user) return { data: "Session activated" }
    return { error: "Failed to activate session" }
  } catch {
    return { error: "Unexpected error occurred while setting active session" }
  }
}

export const revokeSession = createActionWithAuth(
  revokeSessionSchema,
  revokeSessionHandler,
)
export const revokeAllSessions = createActionWithAuth(
  revokeAllSessionSchema,
  revokeAllSessionHandler,
)
export const setActiveSession = createActionWithAuth(
  setActiveSessionSchema,
  setActiveSessionHandler,
)
