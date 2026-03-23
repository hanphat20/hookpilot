export async function sendResendEmail(params: {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY is missing. Email skipped.");
    return { skipped: true };
  }

  const from = params.from || process.env.BILLING_FROM_EMAIL || "HookPilot <billing@example.com>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: Array.isArray(params.to) ? params.to : [params.to],
      subject: params.subject,
      html: params.html,
    }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    console.error("Resend API error:", data);
    throw new Error(data?.message || "Could not send email through Resend");
  }

  return data;
}
