ADMIN + REVENUE + AUTO MONEY DASHBOARD

This overlay adds:
- admin users page
- manual plan activation API
- admin revenue stats API
- admin revenue dashboard page
- admin-safe helper for simple email allowlist protection

How to use:
1. Copy these files into your project and overwrite.
2. Set ADMIN_EMAIL in environment variables.
3. Make sure Supabase has:
   - subscriptions
   - usage_logs
4. Optional but recommended SQL:
   alter table subscriptions
   add column if not exists manual_override boolean default false,
   add column if not exists manual_plan text,
   add column if not exists manual_until timestamptz,
   add column if not exists updated_at timestamptz default now();
