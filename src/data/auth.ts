"use server"

import { headers } from "next/headers"
import { auth } from "@/lib/auth"

export const getSession = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })
    if (!session || !session.user) {
      return { error: "Unauthorized! Please login" }
    }

    return { ctx: { user: session.user, session: session.session } }
  } catch {
    return { error: "Failed to authenticate. Please try again." }
  }
}
