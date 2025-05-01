import { useQuery, type AnyUseQueryOptions } from "@tanstack/react-query"
import { Session, SessionData, User } from "@/types/auth"
import { authClient } from "@/lib/auth/client"

export function useSession(options?: Partial<AnyUseQueryOptions>) {
  const result = useQuery<SessionData>({
    queryKey: ["session"],
    queryFn: () => authClient.getSession({ fetchOptions: { throw: true } }),
    staleTime: 60 * 1000,
    ...options,
  })
  return {
    ...result,
    session: result.data?.session as Session | undefined,
    user: result.data?.user as User | undefined,
  }
}
