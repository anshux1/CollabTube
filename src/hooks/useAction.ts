"use client"

import { useCallback, useState } from "react"
import { ActionState, FieldErrors } from "@/types/action"

type Action<TInput, TOutput> = (data: TInput) => Promise<ActionState<TInput, TOutput>>

interface useActionProps<TOutput> {
  onSuccess?: (data: TOutput) => void
  onError?: (error: string) => void
  onComplete?: () => void
}

export const useAction = <TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options?: useActionProps<TOutput>,
) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<TInput> | undefined>(
    undefined,
  )
  const [data, setData] = useState<TOutput | undefined>(undefined)

  const execute = useCallback(
    async (data: TInput) => {
      setIsLoading(true)
      try {
        const result = await action(data)
        if (!result) return
        setFieldErrors(result.FieldErrors)
        if (result.error) {
          setError(result.error)
          if (options?.onError) options.onError(result.error)
        }
        if (result.data) {
          setData(result.data)
          if (options?.onSuccess) options.onSuccess(result.data)
        }
      } finally {
        setIsLoading(false)
        if (options?.onComplete) options.onComplete()
      }
    },
    [action, options],
  )

  return {
    isLoading,
    execute,
    error,
    data,
    fieldErrors,
    setFieldErrors,
  }
}
