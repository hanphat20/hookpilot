import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: Request) {
  const { userId } = await req.json()

  await supabase.from("usage_logs").insert({
    auth_user_id: userId,
  })

  return NextResponse.json({ success: true })
}
