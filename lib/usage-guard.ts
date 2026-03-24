import { getDailyLimit } from "@/lib/plan";

export function checkUsageAccess({
  plan,
  toolKey,
  usedToday,
}: {
  plan: string;
  toolKey: string;
  usedToday: number;
}) {
  const dailyLimit = getDailyLimit(plan, toolKey);
  const allowed = dailyLimit > usedToday;

  return {
    allowed,
    dailyLimit,
    usedToday,
    remaining: Math.max(dailyLimit - usedToday, 0),
    lockedByPlan: dailyLimit === 0,
  };
}
