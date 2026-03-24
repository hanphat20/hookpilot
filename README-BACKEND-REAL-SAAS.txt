BACKEND REAL SAAS VERSION

This overlay upgrades the project toward a real backend flow using:
- Supabase Auth
- Supabase tables for profiles / subscriptions / usage_logs
- Stripe checkout + billing portal + webhook sync
- Server-side subscription lookup
- Server-side usage tracking

What to do:
1. Copy these files into your project and overwrite.
2. Add the environment variables from ENV-REQUIRED.txt
3. Run the SQL in supabase/schema.sql
4. Redeploy
5. In Stripe webhook settings, point to /api/stripe/webhook

Recommended cleanup:
- remove old fallback/localStorage-only billing logic after confirming this build works
