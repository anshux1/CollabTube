import { auth } from "@/lib/auth"
import { authClient } from "@/lib/auth/client"

export type BetterAuth = typeof auth
export type AuthClient = typeof authClient

export type GetSessionParams = Parameters<BetterAuth["api"]["getSession"]>[0]

export type SessionData = BetterAuth["$Infer"]["Session"]
export type User = BetterAuth["$Infer"]["Session"]["user"]
export type Session = BetterAuth["$Infer"]["Session"]["session"]

export type AuthContext = {
  user: User
  session: Session
}

export type SignInResponse = Awaited<ReturnType<typeof auth.api.signInEmail>>
export type SignUpResponse = Awaited<ReturnType<typeof auth.api.signUpEmail>>
