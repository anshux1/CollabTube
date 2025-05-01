import { AnyUseQueryOptions, QueryKey, skipToken, useQuery } from "@tanstack/react-query"
import { BetterFetchOption, BetterFetchResponse } from "better-auth/react"
import { useSession } from "./useSession"

export type BetterFetchRequest<TData> = ({
  fetchOptions,
}: {
  fetchOptions: BetterFetchOption
}) => Promise<BetterFetchResponse<TData>>

type UseAuthQueryProps<TData> = {
  queryKey: QueryKey
  queryFn: BetterFetchRequest<TData>
  options?: Partial<AnyUseQueryOptions>
}

export const useAuthQuery = <TData>({
  queryFn,
  queryKey,
  options,
}: UseAuthQueryProps<TData>) => {
  const { data: sessionData } = useSession()
  return useQuery<TData>({
    queryKey,
    queryFn: sessionData ? () => queryFn({ fetchOptions: { throw: true } }) : skipToken,
    ...options,
  })
}
