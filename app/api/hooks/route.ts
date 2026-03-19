import OpenAI from "openai"
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const frameworkPromptMap: Record<string, string> = {
  curiosity: "Focus on curiosity gaps and open loops.",
  pain: "Focus on pain points, frustration, and urgency.",
  contrarian: "Use contrarian angles that challenge common beliefs.",
  story: "Use story-driven hooks and personal narrative style.",
  numbers: "Use numbers, stats, and list-style openings.",
  default: "Use a balanced mix of curiosity, benefits, pain, and outcomes.",
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const topic = String(body.topic || "").trim()
    const platform = String(body.platform || "").trim()
    const audience = String(body.audience || "").trim()
    const lang = String(body.lang || "en").trim()
    const framework = String(body.framework || "default").trim()
    const userId = String(body.userId || "").trim()

    console.log("HOOK userId =", userId)
    console.log("HOOK topic =", topic)
    console.log("HOOK platform =", platform)
    console.log("HOOK audience =", audience)

    if (!topic || !platform || !audience) {
      return NextResponse.json(
        { error: "Missing topic, platform, or audience." },
        { status: 400 }
      )
    }

    if (!userId) {
      return NextResponse.json(
        { error: "Missing user id." },
        { status: 401 }
      )
    }

    // Lấy plan thật từ DB
    const { data: subscription, error: subscriptionError } = await supabase
      .from("subscriptions")
      .select("plan,status")
      .eq("auth_user_id", userId)
      .in("status", ["active", "trialing"])
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle()

    if (subscriptionError) {
      console.error("SUBSCRIPTION_LOOKUP_ERROR =", subscriptionError)
      return NextResponse.json(
        { error: "Failed to check subscription." },
        { status: 500 }
      )
    }

    const plan =
      subscription?.plan === "starter" || subscription?.plan === "pro"
        ? subscription.plan
        : "free"

    console.log("HOOK resolved plan =", plan)

    // Chỉ free mới bị giới hạn 20 lượt/ngày
    if (plan === "free") {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const { count, error: countError } = await supabase
        .from("generations")
        .select("*", { count: "exact", head: true })
        .eq("auth_user_id", userId)
        .gte("created_at", today.toISOString())

      if (countError) {
        console.error("USAGE_COUNT_ERROR =", countError)
        return NextResponse.json(
          { error: "Failed to check usage." },
          { status: 500 }
        )
      }

      if ((count || 0) >= 20) {
        return NextResponse.json(
          {
            error:
              "Free plan limit reached: 20 generations per day. Please upgrade to Starter or Pro.",
          },
          { status: 403 }
        )
      }
    }

    const frameworkHint =
      frameworkPromptMap[framework] || frameworkPromptMap.default

    const prompt =
      lang === "vi"
        ? `
Bạn là senior copywriter và chuyên gia performance marketing.

Hãy tạo 10 hook viral cho nền tảng ${platform}.

Thông tin:
- Chủ đề: ${topic}
- Đối tượng: ${audience}
- Framework: ${framework}

Yêu cầu:
- Viết bằng tiếng Việt tự nhiên
- Mỗi hook trên một dòng
- Không giải thích thêm
- Ngắn, sắc, dễ dùng
- ${frameworkHint}
`
        : `
You are a senior copywriter and performance marketing expert.

Create 10 viral hooks for ${platform}.

Context:
- Topic: ${topic}
- Audience: ${audience}
- Framework: ${framework}

Requirements:
- Write in natural English
- One hook per line
- No extra explanation
- Short, punchy, usable
- ${frameworkHint}
`

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.9,
      messages: [{ role: "user", content: prompt }],
    })

    const content = completion.choices[0]?.message?.content || ""
    const hooks = content
      .split("\n")
      .map((line) => line.replace(/^\d+[\).\-\s]*/, "").trim())
      .filter(Boolean)

    return NextResponse.json({ hooks, plan })
  } catch (error) {
    console.error("HOOK_API_ERROR =", error)
    return NextResponse.json(
      { error: "Failed to generate hooks." },
      { status: 500 }
    )
  }
}
