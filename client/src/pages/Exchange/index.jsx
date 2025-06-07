import React from 'react'
import { Row, Col } from 'antd'

function Exchange() {
  return (
    <Row align="middle" className="w-full">
      <Col xs={24} md={8}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <div className="bg-orange-100 rounded-md px-6 py-4 text-center">
              <div className="text-sm text-orange-500 font-semibold">Thu cũ tại Hà Nội:</div>
              <div className="text-lg text-orange-600 font-bold">Zalo: 0333.571.236</div>
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <div className="bg-orange-100 rounded-md px-6 py-4 text-center">
              <div className="text-sm text-orange-500 font-semibold">Thu cũ Đà Nẵng:</div>
              <div className="text-lg text-orange-600 font-bold">Zalo: 0333.571.236</div>
            </div>
          </Col>
        </Row>
      </Col>
      <Col xs={24} md={16}>
        <div className="text-center text-gray-700 text-sm max-w-3xl mx-auto">
          <span className="font-semibold">Giải pháp tiết kiệm và tiện lợi</span> cho khách hàng có nhu cầu nâng cấp thiết bị. AMZ TECH cam kết <span className="font-semibold">thu mua với giá cao</span>, đảm bảo quyền lợi tốt nhất cho khách hàng. Quy trình diễn ra <span className="font-semibold">nhanh chóng</span>, bạn sẽ nhận được chi trả ngay lập tức hoặc bù trừ trực tiếp vào sản phẩm mới.
        </div>
      </Col>

      <Col lg={24}>
        <div className='w-full bg-gray-200 p-6 rounded-md mt-6'>
          <div className="text-center text-gray-700 text-sm max-w-3xl mx-auto mt-4">
            <span className="font-semibold">Chúng tôi thu mua các thiết bị công nghệ cũ</span> như điện thoại, máy tính bảng, laptop, đồng hồ thông minh, tai nghe và các thiết bị điện tử khác. Chúng tôi cam kết mang đến cho bạn giá trị tốt nhất cho thiết bị của mình.
          </div>
        </div>
      </Col>

      <Col lg={6} >
      </Col>
      <Col lg={18}>
          <div className="bg-white py-8 mt-4 rounded-4">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <h6 className="font-bold text-lg mb-4">Thông tin và chính sách</h6>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>Mua hàng và thanh toán</li>
                      <li>Mua hàng trả góp</li>
                      <li>Chính sách giao hàng</li>
                      <li>Chính sách vận chuyển</li>
                      <li>Chính sách kiểm hàng</li>
                      <li>Chính sách đổi trả</li>
                      <li>Chính sách bảo hành</li>
                      <li>Chính sách bảo mật</li>
                    </ul>
                  </div>

                  <div>
                    <h6 className="font-bold text-lg mb-4">Loa</h6>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>Loa mini</li>
                      <li>Loa bluetooth cầm tay</li>
                      <li>Loa cắm điện</li>
                      <li>Loa để bàn</li>
                      <li>Loa decor</li>
                      <li>Loa cao cấp</li>
                      <li>Loa đi cắm trại</li>
                      <li>Loa hát karaoke</li>
                    </ul>
                  </div>

                  <div>
                    <h6 className="font-bold text-lg mb-4">Tai nghe</h6>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>Tai nghe true wireless</li>
                      <li>Tai nghe nhét tai</li>
                      <li>Tai nghe chụp tai</li>
                      <li>Tai nghe tập gym</li>
                      <li>Tai nghe chống ồn</li>
                    </ul>
                  </div>
                </div>

                <div className='grid grid-cols-3 gap-5'>
                  <div className=''>
                    <h6 className="font-bold text-lg mb-4">Kết nối với AMZ TECH</h6>
                    <p className="text-sm text-gray-600">
                      Đà Nẵng: <span className="font-bold">0935.241.243</span><br />
                      Địa chỉ: 14 Nguyễn Thông - An Hải Tây - Sơn Trà - Đà Nẵng
                    </p>
                    <p className="text-sm text-gray-600 mt-4">
                      Hà Nội: <span className="font-bold">0333.571.236</span><br />
                      Địa chỉ: Số 2, Ngõ 92 Láng Hạ - Đống Đa - Hà Nội
                    </p>
                    <div className="flex space-x-4 mt-4">
                      <a href="#" className="text-blue-500"><i className="fab fa-facebook"></i></a>
                      <a href="#" className="text-pink-500"><i className="fab fa-instagram"></i></a>
                      <a href="#" className="text-red-500"><i className="fab fa-youtube"></i></a>
                      <a href="#" className="text-blue-400"><i className="fab fa-twitter"></i></a>
                      <a href="#" className="text-black"><i className="fab fa-tiktok"></i></a>
                    </div>
                  </div>
                  <div >
                    <h6 className="font-bold text-lg mt-8">Google maps</h6>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <div className="bg-gray-300 h-24"></div>
                      <div className="bg-gray-300 h-24"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      </Col>
    </Row>
  )
}

export default Exchange