This patch removes the direct @prisma/client dependency from the two failing build routes:

- app/api/stripe/webhook/route.ts
- app/api/cron/subscription-reminders/route.ts

Use this if your project does not have Prisma installed yet.

Important:
- This is a build-safe fallback, not full production persistence.
- Stripe webhook data is kept in temporary memory only.
- The cron endpoint works without a database and can send one debug reminder email if:
  DEBUG_REMINDER_EMAIL_TO=your@email.com

When you are ready for full production:
1. install prisma and @prisma/client
2. add your real schema
3. regenerate the client
4. replace these fallback routes with DB-backed versions
