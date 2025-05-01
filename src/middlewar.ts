import { NextRequest, NextResponse } from "next/server"
import { betterFetch } from "@better-fetch/fetch"
import type { SessionData } from "@/types/auth"
import { authRoutes, publicRoutes, workspaceRoutes } from "@/lib/auth/routes"
import { GetOrganizationResponse } from "./types/organizations"

const allAuthPaths = authRoutes.map((r) => r.path)
const allPublicPaths = publicRoutes.map((r) => r.path)

// Check if route matches a workspace route pattern like /:workspaceId/dashboard
const isWorkspaceRoute = (pathname: string) => {
  return workspaceRoutes.some((route) => {
    const pattern = route.path.replace(":workspaceId", "[^/]+")
    const regex = new RegExp(`^${pattern}$`)
    return regex.test(pathname)
  })
}

export async function middleware(request: NextRequest) {
  const { nextUrl } = request
  const pathname = nextUrl.pathname

  //  1. Allow API auth/org requests unconditionally
  if (pathname.startsWith("/api/auth") || pathname.startsWith("/api/org")) {
    return NextResponse.next()
  }

  const { data: session } = await betterFetch<SessionData>("/api/auth/get-session", {
    baseURL: request.nextUrl.origin,
    headers: {
      cookie: request.headers.get("cookie") || "", // Forward the cookies from the request
    },
  })

  const isAuthenticated = !!session?.session
  const isPublicRoute = allPublicPaths.includes(pathname)
  const isAuthRoute = allAuthPaths.includes(pathname)

  let organization: GetOrganizationResponse | null = null
  if (isAuthenticated) {
    const { data } = await betterFetch<GetOrganizationResponse>("/api/org", {
      method: "POST",
      baseURL: nextUrl.origin,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: session.user.id,
        activeOrganizationId: session.session.activeOrganizationId,
      }),
    })
    organization = data
  }

  // 3. Allow public/auth routes to all users
  if (isPublicRoute || isAuthRoute) {
    // 🔁 If authenticated and on public/auth route, redirect to org dashboard or /join
    if (isAuthenticated) {
      const redirectUrl = organization ? `/${organization.slug}/dashboard` : "/join"
      return NextResponse.redirect(new URL(redirectUrl, nextUrl))
    }

    // 🟢 Not authenticated → allow access to public/auth route
    return NextResponse.next()
  }

  //  4. If not authenticated and not on public/auth → redirect to sign-in
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/sign-in", nextUrl))
  }

  //  5. If onboarding is pending and not on the correct onboarding step → redirect
  const onboardingStep = session.user.onboardingStep
  if (
    session.user.onboardingStatus === "pending" &&
    pathname !== `/onboarding/${onboardingStep}`
  ) {
    return NextResponse.redirect(new URL(`/onboarding/${onboardingStep}`, nextUrl))
  }

  if (!isWorkspaceRoute(pathname)) {
    const redirectUrl = organization ? `/${organization.slug}/dashboard` : "/join"
    return NextResponse.redirect(new URL(redirectUrl, nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
}
