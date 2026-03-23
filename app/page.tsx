"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

type AuthMode = "login" | "signup"
type Lang = "en" | "vi"

const copy = {
  en: {
    badge: "AI Hook Generator",
    heroTitle: "Create high-converting hooks for ads, videos, and landing pages.",
    heroDesc:
      "HookPilot helps marketers and creators generate viral hooks in seconds with reusable frameworks for performance campaigns.",
    createAccount: "Create account",
    login: "Login",
    signup: "Sign up",
    email: "Email",
    password: "Password",
    emailPlaceholder: "you@example.com",
    passwordPlaceholder: "Enter password",
    authDesc: "Start free and upgrade when you need more generations.",
    processing: "Processing...",
    signupSuccess: "Account created. Check your email to confirm your account.",
    loginSuccess: "Login successful.",
    dashboard: "Open dashboard",
    pricing: "View pricing",
    logout: "Logout",
    signedIn: "You are signed in",
    trustTitle: "Built for creators, affiliates, and media buyers",
    features: [
      {
        title: "Fast hook generation",
        desc: "Create multiple hook angles in seconds for short videos, ads, and product pages.",
      },
      {
        title: "Framework-based output",
        desc: "Use curiosity, pain-point, contrarian, number-led, and story hooks for better testing.",
      },
      {
        title: "Optimized workflow",
        desc: "Simple dashboard, clean pricing, and mobile-ready UI for real use instead of demo feel.",
      },
    ],
    stats: [
      { value: "10", label: "hooks each generation" },
      { value: "2", label: "languages" },
      { value: "20/day", label: "free usage" },
    ],
  },
  vi: {
    badge: "AI tạo Hook",
    heroTitle: "Tạo hook chuyển đổi cao cho quảng cáo, video và landing page.",
    heroDesc:
      "HookPilot giúp marketer và creator tạo hook viral trong vài giây với framework có thể tái sử dụng cho chiến dịch thực tế.",
    createAccount: "Tạo tài khoản",
    login: "Đăng nhập",
    signup: "Đăng ký",
    email: "Email",
    password: "Mật khẩu",
    emailPlaceholder: "ban@example.com",
    passwordPlaceholder: "Nhập mật khẩu",
    authDesc: "Bắt đầu miễn phí và nâng cấp khi cần nhiều lượt tạo hơn.",
    processing: "Đang xử lý...",
    signupSuccess: "Đã tạo tài khoản. Hãy kiểm tra email để xác nhận.",
    loginSuccess: "Đăng nhập thành công.",
    dashboard: "Mở dashboard",
    pricing: "Xem bảng giá",
    logout: "Đăng xuất",
    signedIn: "Bạn đang đăng nhập",
    trustTitle: "Tối ưu cho creator, affiliate và đội chạy quảng cáo",
    features: [
}
