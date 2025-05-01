import { redirect } from "next/navigation"
import { getSession } from "@/data/auth"
import { ProfileUpdateForm } from "@/components/profile/ProfileUpdateForm"

export default async function page() {
  const { ctx } = await getSession()
  if (!ctx) redirect("/sign-in")
  const { user } = ctx
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col justify-center gap-2">
      <h2 className="text-xl font-semibold">Your initial profile</h2>
      <ProfileUpdateForm
        className="mx-auto"
        email={user.email}
        name={user?.name}
        image={user.image || ""}
      />
    </div>
  )
}
