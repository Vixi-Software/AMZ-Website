import React from 'react'
import { Row, Col } from 'antd'

const bannerImg = 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Zed_49.jpg'
const promoImgs = [
  'https://via.placeholder.com/400x200?text=Promo+1',
  'https://via.placeholder.com/400x200?text=Promo+2',
]
const upcomingImgs = [
  'https://via.placeholder.com/400x200?text=Upcoming+1',
  'https://via.placeholder.com/400x200?text=Upcoming+2',
  'https://via.placeholder.com/400x200?text=Upcoming+3',
]

function Sale() {
  return (
    <div className="mx-auto p-4">
      {/* Banner */}
      <div className="mb-6">
        <img src={bannerImg} alt="Banner" className="w-full rounded-xl shadow-lg" />
      </div>

      {/* Khuyến mãi HOT */}
      <h3 className="text-lg font-semibold mb-2">Khuyến mãi HOT</h3>
      <Row gutter={[16, 16]} className="mb-6">
        {promoImgs.map((img, idx) => (
          <Col xs={24} md={12} key={idx}>
            <img src={img} alt={`Promo ${idx + 1}`} className="w-full rounded-xl shadow" />
          </Col>
        ))}
      </Row>

      {/* Sắp diễn ra */}
      <h3 className="text-lg font-semibold mb-2">Sắp diễn ra</h3>
      <Row gutter={[16, 16]}>
        {upcomingImgs.map((img, idx) => (
          <Col xs={24} md={8} key={idx}>
            <img src={img} alt={`Upcoming ${idx + 1}`} className="w-full rounded-xl shadow" />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Sale