import Link from "next/link"
import { ArrowLeft, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function page() {
  return (
    <div className="bg-os-background-100 relative flex min-h-screen items-center justify-center px-6 py-12 md:px-0">
      <Button variant="link" asChild className="absolute top-4 left-4">
        <Link href="/">
          <ArrowLeft /> Back to home
        </Link>
      </Button>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-lg">Sign in or sign up</CardTitle>
          <CardDescription>Build your SaaS in minutes, not months.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="*:not-first:mt-2">
            <Label htmlFor="email">Email </Label>
            <div className="relative">
              <Input id="email" className="peer ps-9" placeholder="Email" type="email" />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <Mail size={16} aria-hidden="true" />
              </div>
            </div>
          </div>
          <Button className="w-full">Sign in</Button>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or continue with
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
