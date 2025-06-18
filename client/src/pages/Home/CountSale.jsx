import React, { useEffect, useState } from 'react'
import { Card, Row, Col } from 'antd'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux';

function CountSale() {
  const [countdown, setCountdown] = useState('')
  const home = useSelector(state => state.homeSetting.homeSettings);

  const endDate = home?.[0].eventDate;
  const content = home?.[0].eventContent;

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

  // Nếu hết hạn, hiển thị 2 card Zalo + 1 cột content
  if (!endDate || !content || dayjs(endDate).isBefore(dayjs())) {
    return (
      <Row gutter={24} align="top">
        <Col xs={24} md={24} lg={8}>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Card
                className="!rounded-xl !p-0 !border-[#E6E6E6] !shadow-none flex-shrink-0 !bg-[#FFE8D3]"
                styles={{ body: { padding: '25px 17px' } }}
                style={{ height: 104 }}
              >
                <div className="flex flex-col items-center h-full justify-center">
                  <span className="text-[16px] font-bold text-[#D65312] mb-1">
                    Đà Nẵng
                  </span>
                  <span className="text-[16px] font-semibold text-[#222]">
                    Zalo: 0905 123 456
                  </span>
                </div>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card
                className="!rounded-xl !p-0 !border-[#E6E6E6] !shadow-none flex-shrink-0 !bg-[#FFE8D3]"
                styles={{ body: { padding: '25px 17px' } }}
                style={{ height: 104 }}
              >
                <div className="flex flex-col items-center h-full justify-center">
                  <span className="text-[16px] font-bold text-[#D65312] mb-1">
                    Hà Nội
                  </span>
                  <span className="text-[16px] font-semibold text-[#222]">
                    Zalo: 0987 654 321
                  </span>
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col xs={24} md={24} lg={16} className="flex justify-center items-center text-center">
          <span
            className="text-[12px] md:text-[12px] lg:text-[16px] be-vietnam-pro-light text-[#222] leading-5 text-center"
            dangerouslySetInnerHTML={{ __html: content || '' }}
          />
        </Col>
      </Row>
    )
  }

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
  )
}

export default CountSale