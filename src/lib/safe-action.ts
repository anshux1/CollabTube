import { getSession } from "@/data/auth"
import z from "zod"
import { FieldErrors } from "@/types/action"
import { AuthContext } from "@/types/auth"

export const createAction = <TInput, TOutput>(
  schema: z.Schema<TInput>,
  handler: (data: TInput) => Promise<TOutput>,
) => {
  return async (data: TInput) => {
    const result = schema.safeParse(data)
    if (!result.success) {
      return {
        FieldErrors: result.error.flatten().fieldErrors as FieldErrors<TInput>,
      }
    }
    return handler(result.data)
  }
}

export const createActionWithMiddleware = <TInput, TOutput, TContext>(
  schema: z.Schema<TInput>,
  middleware: () => Promise<{ ctx: TContext } | { error: string }>,
  handler: (data: TInput, ctx: TContext) => Promise<TOutput>,
) => {
  return async (data: TInput) => {
    const result = schema.safeParse(data)
    if (!result.success) {
      return {
        FieldErrors: result.error.flatten().fieldErrors as FieldErrors<TInput>,
      }
    }

    const middlewareResult = await middleware()
    if ("error" in middlewareResult) {
      return { error: middlewareResult.error }
    }

    return handler(result.data, middlewareResult.ctx)
  }
}

export const createActionWithAuth = <TInput, TOutput>(
  schema: z.Schema<TInput>,
  handler: (data: TInput, ctx: AuthContext) => Promise<TOutput>,
) => {
  return createActionWithMiddleware(schema, getSession, handler)
}
