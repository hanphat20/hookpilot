Auth navbar fix

This patch fixes the main logged-in user problem:
- navbar no longer stays stuck on "Login"
- logged-in users see their email + Sign out
- users can go to Dashboard from the email pill
- mobile menu also shows the correct auth state

Files changed:
- components/customer-auth-buttons.tsx
- components/navbar.tsx
