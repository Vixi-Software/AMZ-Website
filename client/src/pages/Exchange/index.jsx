import React from 'react'
import MainCarousel from '../../pages/Home/MainCarousel'
import { Card, Row, Col } from 'antd'
import { useNavigate } from 'react-router-dom';
import routePath from '../../constants/routePath';

function Exchange() {
  const navigate = useNavigate();
  return (
    <div>
       <div className="mb-4">
              <nav className="flex items-center gap-2 text-sm">
                {/* Home icon */}
                <span className="flex items-center gap-1 text-black border-2 p-2 rounded-full border-black" onClick={() => navigate(routePath.home)}>
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                    <path d="M3 10.75L12 4l9 6.75" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4.5 10.75V19a1 1 0 001 1h3.5v-4.25a1 1 0 011-1h2a1 1 0 011 1V20H18.5a1 1 0 001-1v-8.25" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Trang chủ</span>
                </span>
               
                {/* Divider */}
                <span className="mx-1 text-black">{'>'}</span>
                {/* Product name */}
                <span className="flex items-center gap-1 bg-orange-500 text-white font-semibold p-2 rounded-full border-2 border-orange-500">
                  {'Thu cũ đổi mới'}
                </span>
              </nav>
            </div>
      <MainCarousel />
      {/* Thông tin liên hệ và mô tả */}
      <Row gutter={16} className="mb-4">
        <Col xs={24} md={10}>
          <Row gutter={[8, 8]}>
            <Col span={12}>
              <Card className="!bg-orange-50 !border-none !rounded-lg px-4 py-2 text-center">
                <div className="text-xs text-gray-700">Thu cũ tại Hà Nội:</div>
                <div className="font-bold text-orange-500 text-lg">Zalo: 0333.571.236</div>
              </Card>
            </Col>
            <Col span={12}>
              <Card className="!bg-orange-50 !border-none !rounded-lg px-4 py-2 text-center">
                <div className="text-xs text-gray-700">Thu cũ Đà Nẵng:</div>
                <div className="font-bold text-orange-500 text-lg">Zalo: 0333.571.236</div>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col xs={24} md={14}>
          <div className="text-sm text-gray-700 leading-5 h-full flex items-center">
           <span className='text-center'> Giải pháp <b>tiết kiệm và tiện lợi</b> cho khách hàng có nhu cầu nâng cấp thiết bị. AMZ TECH cam kết <b>thu mua với giá cao</b>, đảm bảo quyền lợi tốt nhất cho khách hàng. Quy trình diễn ra <b>nhanh chóng</b>, bạn sẽ nhận được chi trả ngay lập tức hoặc bù trừ trực tiếp vào sản phẩm mới.</span>
          </div>
        </Col>
      </Row>

      {/* Vùng trống với nền xám phía dưới */}
      <div className="w-full h-200 bg-[#D9D9D9] rounded-lg mt-6"></div>
    </div>
  )
}

export default Exchange