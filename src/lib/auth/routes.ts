import { Metadata } from "next"
import { icons } from "lucide-react"

type RouteConfigType = {
  path: string
  disabled?: boolean
  name: string
  metadata: Metadata
  icon?: keyof typeof icons
}

export const onboardingRoutes: RouteConfigType[] = [
  {
    name: "Onboarding - Profile",
    path: "/onboarding/profile",
    metadata: {
      title: "Complete your profile",
      description: "Tell us about yourself",
    },
  },
  {
    name: "Onboarding - Workspace",
    path: "/onboarding/workspace",
    metadata: {
      title: "Setup Workspace",
      description: "Create your first workspace",
    },
  },
]

export const publicRoutes: RouteConfigType[] = [
  {
    name: "Home",
    path: "/",
    metadata: {
      title: "Welcome",
      description: "Landing page",
    },
  },
]

export const authRoutes: RouteConfigType[] = [
  {
    name: "Sign In",
    path: "/sign-in",
    metadata: {
      title: "Sign In",
      description: "Access your account.",
    },
  },
  {
    name: "Sign up",
    path: "/sign-up",
    metadata: {
      title: "Sign up",
      description: "Create your account.",
    },
  },
]

export const settingsRoutes: RouteConfigType[] = [
  {
    name: "Account",
    path: "/:workspaceId/settings/account",
    metadata: {
      title: "Account Settings",
      description: "Manage your personal account settings for this workspace",
    },
  },
  {
    name: "Workspaces",
    path: "/:workspaceId/settings/workspaces",
    metadata: {
      title: "Workspaces Settings",
      description: "Manage multiple workspaces and their configurations",
    },
  },
]

export const workspaceSettingsRoutes: RouteConfigType[] = [
  {
    name: "Workspace",
    path: "/:workspaceId/settings/workspace",
    metadata: {
      title: "Workspace Settings",
      description: "Customize settings specific to this workspace",
    },
  },
  {
    name: "Members",
    path: "/:workspaceId/settings/members",
    metadata: {
      title: "Members Settings",
      description: "Manage team members and their permissions",
    },
  },
  {
    name: "Channels",
    path: "/:workspaceId/settings/channels",
    metadata: {
      title: "Channel Settings",
      description: "Manage channels within this workspace",
    },
  },
]

export const workspaceRoutes: RouteConfigType[] = [
  {
    name: "Dashboard",
    path: "/:workspaceId/dashboard",
    metadata: {
      title: "Dashboard",
      description: "Overview of your workspace activities",
    },
  },
  {
    name: "Integrations",
    path: "/:workspaceId/integrations",
    metadata: {
      title: "Integrations",
      description: "Connect and manage third-party integrations",
    },
  },
  ...settingsRoutes,
]
