Full money-system overlay for the current HookPilot project.

What this pack adds:
- customer login page
- navbar auth actions
- dashboard with customer email, plan, usage, billing portal button
- real estate positioning on home, tools, and pricing
- plan gating on tools using localStorage
- checkout success verification and local plan persistence
- listing generator, buyer follow-up generator, property ads generator
- Stripe checkout success and cancel pages

How to use:
1. copy these files into the current project
2. redeploy
3. set env:
   OPENAI_API_KEY
   STRIPE_SECRET_KEY
   STRIPE_WEBHOOK_SECRET
   NEXT_PUBLIC_APP_URL
   NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID
   NEXT_PUBLIC_STRIPE_PRO_PRICE_ID
4. test:
   /login
   /pricing
   /checkout/success
   /dashboard
   /tools/listing
   /tools/buyer
   /tools/ads

Important:
- plan persistence is browser-based for now
- after successful checkout, plan/customer_id are stored locally from the verified Stripe session
- billing portal requires a real Stripe customer id, which gets stored after a successful paid checkout
