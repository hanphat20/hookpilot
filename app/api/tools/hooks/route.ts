import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { niche, audience, tone } = await req.json();

  const hooks = [
    `Phần lớn ${audience} đang làm "${niche}" sai từ bước đầu mà không nhận ra.`,
    `Đây là lý do vì sao ${audience} mãi không bứt lên khi triển khai "${niche}".`,
    `Nếu bạn muốn "${niche}" hiệu quả hơn, hãy dừng ngay thói quen này.`,
    `Không cần thêm ngân sách lớn, ${audience} vẫn có thể cải thiện "${niche}" theo cách thông minh hơn.`,
    `${tone} truth: đa số người làm "${niche}" đang bỏ lỡ đúng đòn bẩy tạo chuyển đổi.`,
    `Một thay đổi nhỏ trong "${niche}" có thể khiến ${audience} tiết kiệm rất nhiều thời gian và chi phí.`,
    `Tại sao có người làm "${niche}" rất ít nhưng vẫn hiệu quả hơn phần đông?`,
    `Nếu bắt đầu lại từ đầu với "${niche}", đây là câu mở đầu tôi sẽ dùng ngay hôm nay.`,
  ];

  return NextResponse.json({ hooks });
}
