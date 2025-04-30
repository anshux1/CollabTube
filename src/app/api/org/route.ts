import { NextRequest, NextResponse } from "next/server"
import db from "@/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const userId: string = body.userId
    const activeOrganizationId: string | null = body.activeOrganizationId || null

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 })
    }

    if (activeOrganizationId) {
      const org = await db.organization.findUnique({
        where: { id: activeOrganizationId },
      })
      return NextResponse.json(org ?? null)
    }

    const fallbackOrg = await db.organization.findFirst({
      where: {
        members: {
          some: {
            userId,
          },
        },
      },
    })

    return NextResponse.json(fallbackOrg ?? null)
  } catch (error) {
    console.error("Error fetching organization:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
