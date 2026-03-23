import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { niche, audience, tone } = await req.json();

  const hooks = [
    `Phần lớn ${audience} đang làm "${niche}" sai từ bước đầu mà chưa nhận ra.`,
    `Đây là lý do vì sao nhiều ${audience} mãi không bứt lên khi triển khai "${niche}".`,
    `Nếu bạn muốn "${niche}" hiệu quả hơn, hãy dừng ngay thói quen này.`,
    `Không cần thêm quá nhiều ngân sách, ${audience} vẫn có thể cải thiện "${niche}" theo cách thông minh hơn.`,
    `${tone}: đa số người làm "${niche}" đang bỏ lỡ đúng đòn bẩy tạo chuyển đổi.`,
    `Một thay đổi nhỏ trong "${niche}" có thể giúp ${audience} tiết kiệm rất nhiều thời gian và chi phí.`,
    `Tại sao có người làm "${niche}" ít hơn nhưng hiệu quả hơn phần đông?`,
    `Nếu bắt đầu lại từ đầu với "${niche}", đây là câu mở đầu tôi sẽ dùng ngay hôm nay.`,
  ];

  return NextResponse.json({ hooks });
}
