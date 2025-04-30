import { WorkspaceCreateForm } from "@/components/workspace/WorkSpaceCreateForm"

export default async function page() {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col justify-center gap-2">
      <h2 className="text-xl font-semibold">Create your first workspace </h2>
      <WorkspaceCreateForm onboarding />
    </div>
  )
}
