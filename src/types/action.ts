export type FieldErrors<T> = {
  [K in keyof T]?: string[]
}

export type ActionState<TInput, TOutput> = {
  FieldErrors?: FieldErrors<TInput>
  error?: string
  data?: TOutput
}
