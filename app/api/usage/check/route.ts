import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: Request) {
  const { userId } = await req.json()

  const today = new Date().toISOString().split("T")[0]

  const { data } = await supabase
    .from("usage_logs")
    .select("count")
    .eq("auth_user_id", userId)
    .eq("date", today)
    .maybeSingle()

  return NextResponse.json({ count: data?.count || 0 })
}
