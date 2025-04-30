import { env } from "@/env"
import Stripe from "stripe"

export const stripeClient = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-03-31.basil",
})
