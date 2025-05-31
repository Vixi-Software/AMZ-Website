import React from 'react'
import Header from '../components/features/Header'
import Sidebar from '../components/features/Sidebar'
import { Row, Col } from 'antd'

function MainLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="max-w-[1400px] mx-auto px-2 md:px-3 lg:px-0">
        <Row gutter={[16, 0]}>
          <Col xs={24} sm={6} md={8} lg={6}>
            <div className="sticky top-0 flex justify-center">
              <Sidebar />
            </div>
          </Col>
          <Col xs={24} sm={18} md={16} lg={18}>
            {children}

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

      </div>
    </div>
  )
}

export default MainLayout