export type Plan = "free" | "starter" | "pro";

export function getDailyLimit(plan: string, toolKey: string): number {
  if (plan === "pro") return 999999;

  if (plan === "starter") {
    if (toolKey === "ads" || toolKey === "rewrite") return 0;
    return 50;
  }

  if (plan === "free") {
    if (toolKey === "listing") return 5;
    return 0;
  }

  return 0;
}
