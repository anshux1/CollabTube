import { z } from "zod"
import { ActionState } from "@/types/action"
import { deleteBlobSchema } from "./schema"

export type InputTypeDeleteBlob = z.infer<typeof deleteBlobSchema>
export type ReturnTypeDeleteBlob = ActionState<InputTypeDeleteBlob, string>
