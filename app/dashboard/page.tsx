"use client"

import { useEffect, useMemo, useState } from "react"
import { supabase } from "../../lib/supabase"

type Lang = "en" | "vi"
type Tone = "Curiosity" | "Pain Point" | "Contrarian" | "Story" | "Number-led"

type HistoryItem = {
  id: string
  createdAt: string
  topic: string
  audience: string
  language: string
  tone: Tone
  hooks: string[]
}

const dashboardCopy = {
  en: {
    title: "Hook Generator Dashboard",
    subtitle: "Generate clean hook angles for content, paid ads, affiliate creatives, and landing pages.",
    topic: "Topic or offer",
    topicPlaceholder: "Example: Online casino welcome bonus for new users",
    audience: "Audience",
    audiencePlaceholder: "Example: New users in Vietnam",
    language: "Language",
    tone: "Framework",
    generate: "Generate hooks",
    generating: "Generating...",
    result: "Generated hooks",
    empty: "Your generated hooks will appear here.",
    recent: "Recent generations",
    noHistory: "No history yet.",
    signout: "Logout",
    pricing: "Pricing",
    home: "Home",
    helper: "Use short, clear input for better output.",
    signedIn: "Signed in as",
  },
  vi: {
    title: "Dashboard tạo Hook",
    subtitle: "Tạo hook rõ ràng cho content, quảng cáo trả phí, affiliate và landing page.",
    topic: "Chủ đề hoặc ưu đãi",
    topicPlaceholder: "Ví dụ: Thưởng chào mừng casino online cho người mới",
    audience: "Tệp khách hàng",
    audiencePlaceholder: "Ví dụ: Người dùng mới tại Việt Nam",
    language: "Ngôn ngữ",
    tone: "Framework",
    generate: "Tạo hook",
    generating: "Đang tạo...",
    result: "Kết quả hook",
    empty: "Hook được tạo sẽ hiện tại đây.",
    recent: "Lịch sử gần đây",
    noHistory: "Chưa có lịch sử.",
    signout: "Đăng xuất",
    pricing: "Bảng giá",
    home: "Trang chủ",
    helper: "Nhập ngắn gọn, rõ ràng để ra kết quả tốt hơn.",
    signedIn: "Đăng nhập bởi",
  },
} as const

const toneTemplates: Record<Tone, { en: (topic: string, audience: string) => string; vi: (topic: string, audience: string) => string }[]> = {
  Curiosity: [
    {
      en: (topic, audience) => `Why are smart ${audience} suddenly paying attention to ${topic}?`,
      vi: (topic, audience) => `Vì sao ${audience} đang bắt đầu chú ý mạnh tới ${topic}?`,
}
