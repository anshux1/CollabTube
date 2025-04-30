import { Organization } from "better-auth/plugins"

export type GetOrganizationRequest = {
  userId: string
  activeOrganizationId?: string | null
}

export type GetOrganizationResponse = Organization | null
