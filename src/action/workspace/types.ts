import { Organization } from "better-auth/plugins"
import { z } from "zod"
import { ActionState } from "@/types/action"
import { createWorkspaceSchema } from "./schema"

export type InputTypeCreateWorkspace = z.infer<typeof createWorkspaceSchema>
export type ReturnTypeCreateWorkspace = ActionState<
  InputTypeCreateWorkspace,
  Organization
>
