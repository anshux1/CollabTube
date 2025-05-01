import VerificationEmail from "@/emails/verify-email"
import WelcomeEmail from "@/emails/welcome"
import { env } from "@/env"
import { differenceInSeconds } from "date-fns"
import { CreateEmailResponseSuccess } from "resend"
import { resend } from "@/lib/services/resend"
import prisma from "@/db"
import { sendEmailSchema } from "./schema"
import { InputTypeSendEmail, InputTypeWelcomeEmail, ReturnTypeSendEmail } from "./types"

async function sendEmail({
  from = env.RESEND_FROM_EMAIL || "Ansh <no-reply@anshux1.me>",
  to,
  subject,
  react,
}: {
  from?: string
  to: string
  subject: string
  react: React.ReactElement
}): Promise<{ data?: CreateEmailResponseSuccess; error?: string }> {
  try {
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      subject,
      react,
    })
    if (error || !data?.id) return { error: error?.message }
    return { data }
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Failed to send email.",
    }
  }
}

export async function verifyEmail({
  name,
  email,
  url,
}: InputTypeSendEmail): Promise<ReturnTypeSendEmail> {
  const validated = sendEmailSchema.parse({ name, email, url })
  const res = await sendEmail({
    to: validated.email,
    subject: "Verify Your Email Address for CollabTube",
    react: VerificationEmail({
      name: validated.name,
      verificationUrl: validated.url,
    }),
  })
  return res
}

export async function welcomeEmail({
  name,
  email,
  url: redirectUrl,
}: InputTypeSendEmail): Promise<ReturnTypeSendEmail> {
  const res = await sendEmail({
    to: email,
    subject: "Welcome to CollabTube!",
    react: WelcomeEmail({ name: name, redirectUrl }),
  })
  return res
}

export async function sendWelcomeEmail({ account }: InputTypeWelcomeEmail) {
  const user = await prisma.user.findUnique({
    where: { id: account.userId },
    select: {
      name: true,
      email: true,
      createdAt: true,
    },
  })

  if (!user) {
    console.log("User not found for welcome email")
    return
  }

  const accountCreatedAt = new Date(account.createdAt)
  const userCreatedAt = new Date(user.createdAt)
  const diffInSeconds = Math.abs(differenceInSeconds(accountCreatedAt, userCreatedAt))

  if (diffInSeconds < 5 && account.providerId !== "credential") {
    const dashboardUrl = process.env.DASHBOARD_URL ?? "https://app.example.com/dashboard"

    await Promise.all([
      sendEmail({
        to: user.email,
        subject: "Welcome to CollabTube!",
        react: WelcomeEmail({ name: user.name, redirectUrl: dashboardUrl }),
      }),
    ])
  }
}
