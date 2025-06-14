import React from 'react'
import Header from '../components/features/Header'
import SideBarProduct from '../components/features/SideBarProduct'
import { Col, Row } from 'antd'
import { Grid, Carousel } from 'antd';
import Footer from '../components/features/Footer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import routePath from '../constants/routePath';
import Breadcum from '../components/features/Breadcum';

function ProductLayout({ children }) {
  const screens = Grid.useBreakpoint()
  const brandsFromStore = useSelector(state => state.brand)
  const category = useSelector(state => state.filterProduct.category)
  const defaultBrands = [
    'Acnos',
    'Alpha Works',
    'Anker',
    'Bang & Olufsen',
    'Baseus',
    'Beats',
    'Bose',
    'Harman Kardon',
    'JBL',
    'Klipsch',
    'Marshall',
    'Others',
    'Sennheiser',
    'Skullcandy',
    'Sony',
    'Ultimate Ears'
  ]
  const brands = brandsFromStore && brandsFromStore.length > 0 ? brandsFromStore : defaultBrands

  const navigate = useNavigate()

  return (
    <div>
      <Header />
      <div className="max-w-[1400px] mx-auto px-2 md:px-3 lg:px-0">
        <Row>
          <Breadcum
            content={[
              {
                label: (
                  <>
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" style={{ display: 'inline', verticalAlign: 'middle' }}>
                      <path d="M3 10.75L12 4l9 6.75" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M4.5 10.75V19a1 1 0 001 1h3.5v-4.25a1 1 0 011-1h2a1 1 0 011 1V20H18.5a1 1 0 001-1v-8.25" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="ml-1">Trang chủ</span>
                  </>
                ),
                onClick: () => navigate(routePath.home)
              },
              {
                label: category || 'Danh mục',
                onClick: () => { },
                active: true
              }
            ]}
          />
        </Row>
        <Row>
          <Col span={24}>
            <Carousel autoplay arrows={true} dots={true} className="mb-4">
              {[
                {
                  src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
                  alt: "carousel-1"
                },
                {
                  src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
                  alt: "carousel-2"
                },
                {
                  src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
                  alt: "carousel-3"
                }
              ].map((img, idx) => {
                let height = '180px';
                if (screens.lg) height = '350px';
                else if (screens.md) height = '250px';
                return (
                  <div key={idx}>
                    <img
                      src={img.src}
                      alt={img.alt}
                      style={{ width: '100%', height, objectFit: 'cover', borderRadius: '0.5rem' }}
                    />
                  </div>
                );
              })}
            </Carousel>
          </Col>
        </Row>

        <Row gutter={[16, 0]}>
          <Col xs={24} sm={6} md={7} lg={5}>
            {screens.sm && (
              <div className={`bg-white rounded-lg p-4 shadow-lg transition-shadow duration-300 hover:shadow-2xl`}>
                <SideBarProduct
                  brands={brands}
                  priceRanges={[
                    { value: [0, 1000000], label: 'Dưới 1 triệu đồng' },
                    { value: [1000000, 2000000], label: 'Từ 1 triệu - 2 triệu' },
                    { value: [2000000, 3000000], label: 'Từ 2 triệu - 3 triệu' },
                    { value: [3000000, 5000000], label: 'Từ 3 triệu - 5 triệu' },
                    { value: [5000000, null], label: 'Trên 5 triệu' },
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
              </div>
            )}

          </Col>
          <Col xs={24} sm={18} md={17} lg={19}>

            {children}
            <Footer />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default ProductLayout