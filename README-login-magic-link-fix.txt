Login magic-link fix

This patch changes the login page from "enter code" to the correct Supabase magic-link flow.

Important:
In Supabase Authentication > URL Configuration, set:
- Site URL: https://hookpilot.pro
- Redirect URL: https://hookpilot.pro/dashboard

Files changed:
- app/login/page.tsx
