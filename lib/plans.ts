export type Plan = "free" | "starter" | "pro";

export const PLAN_LABELS: Record<Plan, string> = {
  free: "Miễn phí",
  starter: "Gói Starter",
  pro: "Gói Pro",
};

export function canUseStarterFeatures(plan: Plan): boolean {
  return plan === "starter" || plan === "pro";
}

export function canUseProFeatures(plan: Plan): boolean {
  return plan === "pro";
}
