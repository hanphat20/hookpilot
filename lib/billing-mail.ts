export async function sendWelcomeEmail(email: string) {
  console.log("welcome email:", email);
}

export async function sendPaymentFailedEmail(email: string) {
  console.log("payment failed email:", email);
}

export async function sendPlanLockedEmail(email: string) {
  console.log("plan locked email:", email);
}

export async function sendFirstPaymentOfferEmail(email: string) {
  console.log("first payment offer email:", email);
}

export async function sendExpiryReminderEmail(email: string) {
  console.log("expiry reminder email:", email);
}
