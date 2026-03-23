import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { keyword, platform, goal } = await req.json();

  const hooks = [
    `Đừng triển khai "${keyword}" theo cách cũ nữa nếu mục tiêu của bạn là ${goal.toLowerCase()}.`,
    `3 hướng làm nội dung về "${keyword}" trên ${platform} giúp thông điệp rõ hơn và dễ ra khách hơn.`,
    `Nếu bạn đang bí ý tưởng cho "${keyword}", đây là công thức nhanh để tạo nội dung có chuyển đổi.`,
  ];

  const caption = [
    `Bạn không cần quá nhiều nội dung, bạn cần đúng nội dung.`,
    `Với chủ đề "${keyword}", hãy tập trung vào nỗi đau thật, lợi ích rõ ràng và lời kêu gọi hành động dứt khoát.`,
    `Phù hợp cho nền tảng ${platform} và mục tiêu ${goal.toLowerCase()}.`,
  ].join("\n\n");

  const script = [
    `Mở đầu: Nói thẳng vấn đề lớn nhất mà khách hàng gặp phải khi xử lý "${keyword}".`,
    `Phần giữa: Đưa ra 2 đến 3 ý chính giúp họ thấy giải pháp cụ thể, dễ làm và đáng tin.`,
    `Kết thúc: Kêu gọi họ bấm vào hành động chính để nhận demo, tư vấn hoặc dùng thử ngay.`,
  ].join("\n\n");

  const ctas = [
    "Nhận bản demo",
    "Dùng thử ngay",
    "Xem cách triển khai",
  ];

  return NextResponse.json({ hooks, caption, script, ctas });
}
