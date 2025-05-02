import { AnyUseQueryOptions } from "@tanstack/react-query"
import { authClient } from "@/lib/auth/client"
import { useAuthQuery } from "./useAuthQuery"

export const useListDeviceSessions = (options: Partial<AnyUseQueryOptions>) => {
  return useAuthQuery({
    queryKey: ["list-device-sessions"],
    queryFn: authClient.multiSession.listDeviceSessions,
    options,
  })
}
