import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
  const sig = req.headers.get("stripe-signature");
  const whSec = process.env.STRIPE_WEBHOOK_SECRET || "";

  let event: Stripe.Event;
  try {
    const raw = await req.text();
    event = stripe.webhooks.constructEvent(raw, sig || "", whSec);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (
    event.type === "customer.subscription.created" ||
    event.type === "customer.subscription.updated"
  ) {
    const sub = event.data.object as Stripe.Subscription;
    const customerId = String(sub.customer);
    const status = sub.status;
    // Link user via metadata or lookup table in real impl. Placeholder no-op.
    await prisma.payment
      .upsert({
        where: { stripeCustomerId: customerId },
        update: { status, endedAt: status === "canceled" ? new Date() : null },
        create: { userId: "placeholder", stripeCustomerId: customerId, status },
      })
      .catch(() => undefined);
  }

  return NextResponse.json({ received: true });
}
