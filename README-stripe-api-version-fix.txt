Stripe API version compatibility fix

Reason:
Your installed Stripe SDK types expect a newer API version string than the one hardcoded in lib/stripe.ts.
Removing the explicit apiVersion lets the SDK use its compatible default and fixes the TypeScript build error.

File changed:
- lib/stripe.ts
