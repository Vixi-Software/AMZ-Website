import React from 'react'
import { Card } from 'antd'

function CountSale() {
  return (
    <div className="flex items-start gap-6">
      <Card
        bordered
        className="!rounded-xl !p-0 !border-[#E6E6E6] !shadow-none flex-shrink-0 !bg-[#FFE8D3]"
        bodyStyle={{ padding: '16px 20px' }}
      >
        <div className="flex flex-col items-center">
          <span className="!text-[16px] text-[#D65312] font-semibold mb-1">Kết thúc sau:</span>
          <span className="text-[21px] font-bold text-[#D65312]">
            7 ngày : 12 giờ : 35 phút
          </span>
        </div>
      </Card>
      <div className="flex-1 flex justify-center items-center">
        <span className="text-[13px] text-[#222] leading-5 text-center">
          <b>AMZ TECH</b> – chuyên cung cấp loa và tai nghe đã qua sử dụng với chất lượng được tuyển chọn kỹ càng.
          Chúng tôi cam kết mang đến trải nghiệm âm thanh tuyệt vời với mức giá hợp lý nhất. Bên cạnh đó AMZ TECH còn mang tới dịch vụ thu cũ đổi mới, giúp bạn tiếp cận sản phẩm yêu thích một cách dễ dàng hơn &lt;3
        </span>
      </div>
    </div>
  )
}

export default CountSale