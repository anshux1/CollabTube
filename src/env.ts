import { createEnv } from "@t3-oss/env-nextjs"
import z from "zod"

// Create and validate env
export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.string().url(),
    RESEND_API_KEY: z.string().min(1),
    RESEND_FROM_EMAIL: z.string(),
    STRIPE_SECRET_KEY: z.string().min(1),
    STRIPE_WEBHOOK_SECRET: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_AZURE_BLOB_SAS_URL: z.string().url(),
    NEXT_PUBLIC_AZURE_BLOB_CONTAINER_NAME: z.string().min(1),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    NEXT_PUBLIC_AZURE_BLOB_SAS_URL: process.env.NEXT_PUBLIC_AZURE_BLOB_SAS_URL,
    NEXT_PUBLIC_AZURE_BLOB_CONTAINER_NAME:
      process.env.NEXT_PUBLIC_AZURE_BLOB_CONTAINER_NAME,
  },
})

// Ensure that all required env variables are available
if (process.env.NODE_ENV === "production") {
  const missingEnvVars = Object.keys(env).filter((key) => !process.env[key])
  if (missingEnvVars.length > 0) {
    throw new Error(`Missing environment variables: ${missingEnvVars.join(", ")}`)
  }
}
