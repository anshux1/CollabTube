import { verifyEmail } from "@/action/mails"
import { MagicLinkMail } from "@/emails/magic-link"
import { env } from "@/env"
import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { nextCookies } from "better-auth/next-js"
import { magicLink, organization } from "better-auth/plugins"
import { resend } from "@/lib/services/resend"
import db from "@/db"

export const auth = betterAuth({
  appName: "CollabTube",
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    expiresIn: 600,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ url, user }) => {
      const verificationUrl = `${url}onboarding/profile`
      const res = await verifyEmail({
        name: user.name,
        email: user.email,
        url: verificationUrl,
      })
      console.log("res", res)
    },
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  user: {
    additionalFields: {
      onboardingStatus: {
        type: "string",
        required: false,
        defaultValue: "pending",
      },
      onboardingStep: {
        type: "string",
        required: false,
        defaultValue: "profile",
      },
    },
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ user, url, newEmail }) => {
        const verificationUrl = `${url}/settings/profile?type=changeEmail`
        await verifyEmail({
          name: user.name,
          email: newEmail,
          url: verificationUrl,
        })
      },
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "email-password", "dropbox"],
    },
  },
  rateLimit: {
    storage: "database",
    modelName: "ratelimit",
  },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        const result = await resend.emails.send({
          from: env.RESEND_FROM_EMAIL,
          to: email,
          subject: `Magic Login Link from CollabTube!`,
          react: MagicLinkMail({
            email: email,
            magicLink: url,
          }),
        })
        if (result.error) {
          console.error(result.error)
          throw new Error(result.error?.message)
        }
      },
    }),
    nextCookies(),
    organization(),
  ],
})
