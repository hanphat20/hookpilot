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
    .select("*")
    .eq("auth_user_id", userId)
    .eq("date", today)

  const count = data?.length || 0

  return NextResponse.json({ count })
}
