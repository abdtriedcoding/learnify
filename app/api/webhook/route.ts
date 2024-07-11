import type Stripe from 'stripe'
import { db } from '@/lib/db'
import { stripe } from '@/lib/stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('Stripe-Signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: unknown) {
    return new NextResponse(`Webhook Error: ${(error as Error).message}`, {
      status: 400,
    })
  }

  const session = event.data.object as Stripe.Checkout.Session
  const userId = session?.metadata?.userId
  const courseId = session?.metadata?.courseId

  if (event.type === 'checkout.session.completed') {
    if (!userId || !courseId) {
      return new NextResponse(`Webhook Error: Missing metadata`, {
        status: 400,
      })
    }

    await db.purchase.create({
      data: {
        courseId: courseId,
        userId: userId,
      },
    })
  } else {
    return new NextResponse(
      `Webhook Error: Unhandled event type ${event.type}`,
      { status: 200 }
    )
  }

  return new NextResponse(null, { status: 200 })
}
