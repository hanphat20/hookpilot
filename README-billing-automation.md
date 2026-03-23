# HookPilot Billing + Email Automation Overlay

What this overlay adds:
- Resend email sending
- First-payment offer email
- Expiry reminder emails
- Payment failed email
- Automatic plan lock when expired
- Stripe checkout with promotion codes enabled
- Stripe webhook sync for starter/pro/free locking
- Cron endpoint for reminder emails and lock checks

## Environment variables

Add these to `.env.local`:

```env
RESEND_API_KEY=re_xxx
BILLING_FROM_EMAIL="HookPilot <billing@yourdomain.com>"
CRON_SECRET=change_me
NEXT_PUBLIC_APP_URL=https://yourdomain.com

STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID=price_xxx
NEXT_PUBLIC_STRIPE_PRO_PRICE_ID=price_xxx
```

## Stripe setup

1. Create a 10% coupon in Stripe.
2. Create a promotion code for that coupon, for example: FIRST10.
3. Leave `allow_promotion_codes: true` enabled in checkout.
4. Point the Stripe webhook to `/api/stripe/webhook`.

Stripe recommends webhooks for subscription status changes and payment failures, including events like
`customer.subscription.updated`, `customer.subscription.deleted`, and `invoice.payment_failed`. citeturn756476search0turn756476search6

## Next.js setup

These endpoints use App Router Route Handlers inside the `app` directory, which is the official pattern for custom server endpoints in modern Next.js. citeturn756476search2turn756476search11

## Email setup

This overlay uses the Resend Node SDK pattern for sending transactional email. Resend supports Next.js and Node-based email sending through its SDK. citeturn756476search1

## Cron setup

Run this endpoint daily:
- `GET /api/cron/subscription-reminders`
- Header: `Authorization: Bearer <CRON_SECRET>`

Recommended schedule:
- once per day at 09:00
