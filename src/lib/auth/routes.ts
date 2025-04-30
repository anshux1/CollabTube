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
]

export const workspaceRoutes: RouteConfigType[] = [
  {
    name: "Dashboard",
    path: "/:workspaceId/dashboard",
    metadata: {
      title: "Dashboard",
      description: "Overview of your workspace",
    },
  },
  {
    name: "Settings",
    path: "/:workspaceId/settings",
    metadata: {
      title: "Settings",
      description: "Manage workspace settings",
    },
  },
  {
    name: "Integrations",
    path: "/:workspaceId/integrations",
    metadata: {
      title: "Integrations",
      description: "Connect third-party tools",
    },
  },
]
