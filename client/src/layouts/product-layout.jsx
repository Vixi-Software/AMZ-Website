import React, { useEffect, useState } from 'react'
import Header from '../components/features/Header'
import SideBarProduct from '../components/features/SideBarProduct'
import { Col, Row } from 'antd'
import { Grid, Carousel } from 'antd';
import Footer from '../components/features/Footer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import routePath from '../constants/routePath';
import Breadcum from '../components/features/Breadcum';
import { useProductService } from '../services/productService' // Thêm dòng này

function ProductLayout({ children }) {
  const screens = Grid.useBreakpoint()
  const category = useSelector(state => state.filterProduct.category)
  const { getProductsByCategory } = useProductService() // Thêm dòng này
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
  const [brandsByCategory, setBrandsByCategory] = useState(defaultBrands)

  useEffect(() => {
    if (category) {
      getProductsByCategory(category).then(products => {
        // Lấy danh sách brand duy nhất từ sản phẩm
        const brands = Array.from(
          new Set(
            products
              .map(p => p.brand)
              .filter(Boolean)
          )
        )
        setBrandsByCategory(brands.length > 0 ? brands : defaultBrands)
      })
    } else {
      setBrandsByCategory(defaultBrands)
    }
    // eslint-disable-next-line
  }, [category])

  const navigate = useNavigate()

  // Định nghĩa các mảng dùng chung
  const priceRange1M = [
    { value: [0, 1000000], label: 'Dưới 1 triệu đồng' },
    { value: [1000000, 2000000], label: 'Từ 1 triệu - 2 triệu' },
    { value: [2000000, 3000000], label: 'Từ 2 triệu - 3 triệu' },
    { value: [3000000, 5000000], label: 'Từ 3 triệu - 5 triệu' },
    { value: [5000000, 7000000], label: 'Từ 5 triệu - 7 triệu' },
    { value: [7000000, Infinity], label: 'Trên 7 triệu' }
  ];
  const priceRangeLoa = [
    { value: [0, 5000000], label: 'Dưới 5 triệu' },
    { value: [5000000, 10000000], label: '5 - 10 triệu' },
    { value: [10000000, Infinity], label: 'Trên 10 triệu' }
  ];
  const priceRangeDefault = [
    { value: [0, 1000000], label: 'Dưới 1 triệu đồng' },
    { value: [1000000, 2000000], label: 'Từ 1 triệu - 2 triệu' },
    { value: [2000000, 3000000], label: 'Từ 2 triệu - 3 triệu' },
    { value: [3000000, 5000000], label: 'Từ 3 triệu - 5 triệu' },
    { value: [5000000, Infinity], label: 'Trên 5 triệu' },
  ];

  const getPriceRangesByCategory = () => {
    switch (category) {
      case 'Loa di động cũ':
      case 'Loa để bàn cũ':
        return priceRange1M;
      case 'Loa':
        return priceRangeLoa;
      default:
        return priceRangeDefault;
    }
  };

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
                label: category == 'Loa' ? "Loa karaoke cũ" : category || 'Danh mục',
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
                  src: "https://chauaudio.com/cdn/images/tin-tuc/loa-marshall-la-thuong-hieu-nuoc-nao-phu-hop-voi-nhung-ai-5.jpg",
                  alt: "carousel-1"
                },
                {
                  src: "https://th.bing.com/th/id/R.b1c51812c16cb5d4d84dabec2e75265d?rik=1t0PlY8a%2b649rA&pid=ImgRaw&r=0",
                  alt: "carousel-2"
                },
                {
                  src: "https://th.bing.com/th/id/OIP.skBzSDoI0713daeCX87n4QHaEK?rs=1&pid=ImgDetMain&cb=idpwebp1&o=7&rm=3",
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
                  brands={brandsByCategory}
                  priceRanges={getPriceRangesByCategory()}
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