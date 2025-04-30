import { Session } from "@/lib/auth"

export type AuthContext = {
  user: Session["user"]
  session: Session["session"]
}
