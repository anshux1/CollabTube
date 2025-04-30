"use server"

import { AuthContext } from "@/types/auth"
import { createActionWithAuth } from "@/lib/safe-action"
import db from "@/db"
import { profileUpdateSchema } from "./schema"
import { InputTypeProfileUpdate, ReturnTypeProfileUpdate } from "./types"

const profileUpdateHandler = async (
  input: InputTypeProfileUpdate,
  ctx: AuthContext,
): Promise<ReturnTypeProfileUpdate> => {
  try {
    const data = await db.user.update({
      where: { email: ctx.user.email },
      data: {
        name: input.name,
        image: input.image,
        ...(input.fromOnboarding
          ? { onboardingStatus: "completed", onboardingStep: "workspace" }
          : {}),
      },
    })
    console.log("Onboarding profile data:", data)
    return { data }
  } catch (err) {
    console.log("Error :", err)
    return { error: "" }
  }
}

export const onboardingProfile = createActionWithAuth(
  profileUpdateSchema,
  profileUpdateHandler,
)
