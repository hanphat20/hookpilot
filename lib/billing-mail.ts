import { resend } from "@/lib/resend";

const FROM = process.env.BILLING_FROM_EMAIL || "HookPilot <billing@example.com>";

async function sendEmail(to: string, subject: string, html: string) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY is missing. Email skipped.");
    return;
  }

  await resend.emails.send({
    from: FROM,
    to,
    subject,
    html,
  });
}

export async function sendWelcomeEmail(to: string, name?: string | null) {
  await sendEmail(
    to,
    "Welcome to HookPilot",
    `
      <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;padding:24px">
        <h1 style="margin:0 0 12px;color:#0f172a">Welcome${name ? `, ${name}` : ""}.</h1>
        <p style="font-size:15px;line-height:1.7;color:#334155">
          Your account is ready. You can now generate TikTok scripts, captions, and landing page copy inside HookPilot.
        </p>
        <p style="font-size:15px;line-height:1.7;color:#334155">
          Upgrade any time to unlock higher usage, better exports, and full landing page workflows.
        </p>
      </div>
    `
  );
}

export async function sendFirstPaymentOfferEmail(to: string, checkoutUrl: string) {
  await sendEmail(
    to,
    "Your first plan comes with 10% off",
    `
      <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;padding:24px">
        <h1 style="margin:0 0 12px;color:#0f172a">Get 10% off your first payment</h1>
        <p style="font-size:15px;line-height:1.7;color:#334155">
          Use your first-order code at checkout and unlock paid tools at a lower cost.
        </p>
        <p style="font-size:15px;line-height:1.7;color:#334155">
          Suggested code: <strong>FIRST10</strong>
        </p>
        <p>
          <a href="${checkoutUrl}" style="display:inline-block;background:#22d3ee;color:#082f49;padding:12px 18px;border-radius:12px;text-decoration:none;font-weight:700">
            Complete my upgrade
          </a>
        </p>
      </div>
    `
  );
}

export async function sendExpiryReminderEmail(to: string, daysLeft: number) {
  const subject =
    daysLeft > 0
      ? `Your HookPilot plan expires in ${daysLeft} day${daysLeft > 1 ? "s" : ""}`
      : "Your HookPilot plan expires today";

  await sendEmail(
    to,
    subject,
    `
      <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;padding:24px">
        <h1 style="margin:0 0 12px;color:#0f172a">${subject}</h1>
        <p style="font-size:15px;line-height:1.7;color:#334155">
          To avoid interruption, renew or update your payment method before your billing period ends.
        </p>
        <p style="font-size:15px;line-height:1.7;color:#334155">
          If the subscription expires or becomes unpaid, your account will be locked back to the Free plan automatically.
        </p>
      </div>
    `
  );
}

export async function sendPaymentFailedEmail(to: string) {
  await sendEmail(
    to,
    "Payment failed for your HookPilot subscription",
    `
      <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;padding:24px">
        <h1 style="margin:0 0 12px;color:#0f172a">Payment failed</h1>
        <p style="font-size:15px;line-height:1.7;color:#334155">
          We could not collect your latest subscription payment. Please update your card to keep your paid features active.
        </p>
      </div>
    `
  );
}

export async function sendPlanLockedEmail(to: string) {
  await sendEmail(
    to,
    "Your paid plan has been locked",
    `
      <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;padding:24px">
        <h1 style="margin:0 0 12px;color:#0f172a">Paid plan locked</h1>
        <p style="font-size:15px;line-height:1.7;color:#334155">
          Your paid access has expired or become inactive, so your account has been moved back to the Free plan.
        </p>
      </div>
    `
  );
}
