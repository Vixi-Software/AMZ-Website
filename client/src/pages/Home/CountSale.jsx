<<<<<<< HEAD
import React from 'react'
import { Card } from 'antd'

function CountSale() {
  return (
    <div className="flex items-start gap-6">
      <Card
        bordered
        className="!rounded-xl !p-0 !border-[#E6E6E6] !shadow-none flex-shrink-0"
        bodyStyle={{ padding: '16px 20px' }}
      >
        <div className="flex flex-col items-center">
          <span className="text-xs text-[#FF7A00] font-semibold mb-1">Kết thúc sau:</span>
          <span className="text-[22px] font-bold text-[#FF7A00]">
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
=======
import React, { useEffect, useState } from 'react'
import { Card, Row, Col } from 'antd'
import dayjs from 'dayjs'

function CountSale({ endDate, content }) {
  const [countdown, setCountdown] = useState('')

  useEffect(() => {
    if (!endDate) return
    const interval = setInterval(() => {
      const now = dayjs()
      const end = dayjs(endDate)
      const diff = end.diff(now)
      if (diff <= 0) {
        setCountdown('Đã kết thúc')
        clearInterval(interval)
        return
      }
      const days = end.diff(now, 'day')
      const hours = end.subtract(days, 'day').diff(now, 'hour')
      const minutes = end.subtract(days, 'day').subtract(hours, 'hour').diff(now, 'minute')
      setCountdown(`${days} ngày : ${hours} giờ : ${minutes} phút`)
    }, 1000)
    return () => clearInterval(interval)
  }, [endDate])

  // Nếu endDate không hợp lệ hoặc đã qua ngày hiện tại thì return null
  if (!endDate || !content || dayjs(endDate).isBefore(dayjs())) return null

  return (
    <Row gutter={24} align="top">
      <Col xs={24} md={24} lg={8}>
        <Card
          className="!rounded-xl !p-0 !border-[#E6E6E6] !shadow-none flex-shrink-0 !bg-[#FFE8D3]"
          styles={{ body: { padding: '25px 17px' } }}
          style={{ height: 104 }}
        >
          <div className="flex flex-col items-center h-full justify-center">
            <span className="text-[13px] sm:!text-[16px] text-[#D65312] font-semibold mb-1">
              Kết thúc sau:
            </span>
            <span className="text-[16px] sm:text-[21px] font-bold text-[#D65312]">
              {countdown}
            </span>
          </div>
        </Card>
      </Col>
      <Col xs={24} md={24} lg={16} className="flex justify-center items-center text-center">
        <span
          className="text-[12px] md:text-[12px] lg:text-[16px] be-vietnam-pro-light text-[#222] leading-5 text-center"
          dangerouslySetInnerHTML={{ __html: content || '' }}
        />
      </Col>
    </Row>
>>>>>>> fix-admin
  )
}

export default CountSale