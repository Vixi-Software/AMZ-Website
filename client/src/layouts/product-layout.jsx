import React from 'react'
import Header from '../components/features/Header'
import SideBarProduct from '../components/features/SideBarProduct'
import { Col, Row } from 'antd'
function ProductLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="max-w-[1400px] mx-auto px-2 md:px-3 lg:px-0">
        <Row gutter={[16, 0]}>
          <Col xs={24} sm={6} md={7} lg={5}>
            <SideBarProduct
              brands={['Apple', 'Samsung', 'Xiaomi', 'Oppo', 'Vivo', 'Realme', 'Nokia', 'Asus', 'Sony', 'LG']}
              priceRanges={[
                { value: 'duoi1tr', label: 'Dưới 1 triệu đồng' },
                { value: '1-2tr', label: 'Từ 1 triệu - 2 triệu' },
                { value: '2-3tr', label: 'Từ 2 triệu - 3 triệu' },
                { value: '3-5tr', label: 'Từ 3 triệu - 5 triệu' },
                { value: 'tren5tr', label: 'Trên 5 triệu' },
              ]}
              needs={[
                { value: 'chongon', label: 'Chống ồn' },
                { value: 'xuyendam', label: 'Xuyên âm' },
                { value: 'mic', label: 'Có micro đàm thoại' },
                { value: 'nghegoitot', label: 'Nghe gọi tốt' },
                { value: 'tapthethao', label: 'Tập luyện thể thao' },
                { value: 'chongnuoc', label: 'Chống nước, chống bụi' },
                { value: 'choigame', label: 'Chơi game' },
                { value: 'nghenhac', label: 'Nghe nhạc trữ tình' },
                { value: 'nghenhacso', label: 'Nghe nhạc sôi động' },
              ]}
              selectedBrands={[]}
              selectedPrices={['tren5tr']}
              selectedNeeds={['chongon', 'xuyendam']}
            />
          </Col>
          <Col xs={24} sm={18} md={17} lg={19}>
            {children}
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default ProductLayout