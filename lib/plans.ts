export type Plan = "free" | "starter" | "pro";

export function canUseExport(plan: Plan) {
  return plan === "starter" || plan === "pro";
}

export function canUseAdvancedFeatures(plan: Plan) {
  return plan === "pro";
}
