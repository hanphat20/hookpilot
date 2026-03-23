import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { brand, offer, cta } = await req.json();

  const headline = `${brand} giúp bạn triển khai nhanh hơn và bán hàng rõ ràng hơn.`;
  const subheadline = `Tối ưu thông điệp, bố cục và lời kêu gọi hành động cho ưu đãi hoặc sản phẩm: ${offer}`;
  const bulletPoints = [
    "Làm rõ lợi ích cốt lõi thay vì trình bày lan man.",
    "Chuyển ưu đãi thành thông điệp dễ hiểu và dễ mua hơn.",
    "Tạo khung nội dung có thể đưa thẳng sang landing page hoặc quảng cáo.",
  ];

  const html = `<section class="hero">
  <h1>${headline}</h1>
  <p>${subheadline}</p>
  <ul>
    <li>${bulletPoints[0]}</li>
    <li>${bulletPoints[1]}</li>
    <li>${bulletPoints[2]}</li>
  </ul>
  <a href="#cta">${cta}</a>
</section>`;

  return NextResponse.json({
    headline,
    subheadline,
    bulletPoints,
    cta,
    html,
  });
}
