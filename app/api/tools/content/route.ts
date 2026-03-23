import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { keyword, platform, goal } = await req.json();

  const hooks = [
    `Đừng làm nội dung về "${keyword}" theo cách cũ nữa nếu bạn đang cần ${goal.toLowerCase()}.`,
    `3 góc triển khai "${keyword}" trên ${platform} giúp nội dung bớt nhạt và vào việc nhanh hơn.`,
    `Nếu bạn đang bí ý tưởng cho "${keyword}", đây là công thức ngắn nhất để ra nội dung có chuyển đổi.`,
  ];

  const caption = [
    `Bạn không cần thêm thật nhiều nội dung, bạn cần đúng nội dung.`,
    `Với chủ đề "${keyword}", hãy tập trung vào đúng đau điểm khách hàng, lợi ích rõ ràng và lời kêu gọi hành động dứt khoát.`,
    `Phù hợp cho ${platform} và mục tiêu ${goal.toLowerCase()}.`,
  ].join("\n\n");

  const script = [
    `Mở đầu: Nói thẳng vấn đề lớn nhất mà khách hàng đang gặp khi làm "${keyword}".`,
    `Phần giữa: Đưa ra 2-3 ý chính giúp họ thấy giải pháp cụ thể, dễ làm, dễ tin.`,
    `Kết thúc: Kêu gọi họ bấm vào CTA để nhận demo, tư vấn hoặc dùng thử ngay.`,
  ].join("\n\n");

  const ctas = [
    "Nhận bản demo",
    "Dùng thử ngay",
    "Xem cách triển khai",
  ];

  return NextResponse.json({ hooks, caption, script, ctas });
}
