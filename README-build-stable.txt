This overlay is made to stop the current build errors fast.

It fixes:
- Stripe type issues in webhook route
- Missing resend package issue
- Missing prisma issue
- Stripe API version mismatch risk

Important:
- This is a build-stable override for the current project.
- Webhook persistence is memory-based fallback for now.
- Email sending uses direct fetch to Resend API.
- Cron route is build-safe and optional.

After copying these files:
1. redeploy
2. test /pricing
3. test checkout
4. test /dashboard
