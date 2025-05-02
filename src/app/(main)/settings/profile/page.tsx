import { ProfileAvatarCard } from "@/components/settings/profile/ProfileAvatarCard"
import { ProfileEmailCard } from "@/components/settings/profile/ProfileEmailCard"
import { ProfileNameCard } from "@/components/settings/profile/ProfileNameCard"

export default function page() {
  return (
    <div className="flex flex-col gap-4">
      <ProfileAvatarCard />
      <ProfileNameCard />
      <ProfileEmailCard />
    </div>
  )
}
