import { env } from "process"
import {
  inferAdditionalFields,
  magicLinkClient,
  multiSessionClient,
  organizationClient,
} from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
import { auth } from "@/lib/auth"

export const authClient = createAuthClient({
  baseURL: env.BETTER_AUTH_URL,
  plugins: [
    inferAdditionalFields<typeof auth>(),
    magicLinkClient(),
    organizationClient(),
    multiSessionClient(),
  ],
})
