export type Plan = "free" | "starter" | "pro";

export function isPaidPlan(plan: Plan | string | null | undefined): boolean {
  return plan === "starter" || plan === "pro";
}

export function isLockedStatus(status: string | null | undefined): boolean {
  return status === "canceled" || status === "unpaid" || status === "incomplete_expired";
}

export function getDailyLimit(plan: Plan | string | null | undefined): number {
  if (plan === "pro") return 999999;
  if (plan === "starter") return 50;
  return 5;
}

export function canUseLandingGenerator(plan: Plan | string | null | undefined): boolean {
  return plan === "pro";
}

export function canUseAdvancedExports(plan: Plan | string | null | undefined): boolean {
  return plan === "starter" || plan === "pro";
}
