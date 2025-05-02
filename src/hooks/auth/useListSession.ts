import { useQuery, type AnyUseQueryOptions } from "@tanstack/react-query"
import { authClient } from "@/lib/auth/client"

export function useListSession(options?: Partial<AnyUseQueryOptions>) {
  return useQuery({
    queryKey: ["session"],
    queryFn: () => authClient.listSessions,
    staleTime: 60 * 1000,
    ...options,
  })
}
