import { AnyUseQueryOptions } from "@tanstack/react-query"
import { authClient } from "@/lib/auth/client"
import { useAuthQuery } from "./useAuthQuery"

export const useListAccounts = (options: Partial<AnyUseQueryOptions>) => {
  return useAuthQuery({
    queryKey: ["list-accounts"],
    queryFn: authClient.listAccounts,
    options,
  })
}
