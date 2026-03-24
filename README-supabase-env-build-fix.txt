Supabase env build fix

Reason:
Your build is failing because createClient() is being called at module load time
without Supabase env vars present.

This patch makes both Supabase clients build-safe so the app can compile.

Important:
You still need to set these env vars in Vercel / production:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY

If you do not set them, the app may build but login/billing routes will not work at runtime.
