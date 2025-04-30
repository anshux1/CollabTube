import { User } from "@prisma/client"
import { z } from "zod"
import { ActionState } from "@/types/action"
import { profileUpdateSchema } from "./schema"

export type InputTypeProfileUpdate = z.infer<typeof profileUpdateSchema>
export type ReturnTypeProfileUpdate = ActionState<InputTypeProfileUpdate, User>
