import React, { useEffect, useState } from 'react'
import Header from '../components/features/Header'
import SideBarProduct from '../components/features/SideBarProduct'
<<<<<<< HEAD
import { Col, Row, Carousel } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom' 
import routePaths from '../constants/routePath'
import { getBrandsFromFirebase } from '../utils/database'
function ProductLayout({ children }) {
  const [breadcrumbLabel, setBreadcrumbLabel] = useState('Tai nghe nhét tai cũ')
  const navigate = useNavigate()

  useEffect(() => {
    const label = localStorage.getItem('selectedSidebarLabel')
    if (label) setBreadcrumbLabel(label)
  }, [])

  const [brands, setBrands] = useState([])

  useEffect(() => {
    getBrandsFromFirebase().then(setBrands)
  }, [])
=======
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
  
>>>>>>> fix-admin

  return (
    <div>
      <Header />
      <div className="max-w-[1400px] mx-auto px-2 md:px-3 lg:px-0 my-4">
        <div className='mb-3'>
          <nav className="flex items-center space-x-2 text-[15px]">
            <button
              className="flex items-center px-3 py-1 border border-gray-300 rounded-full bg-white hover:bg-gray-100"
              onClick={() => navigate(routePaths.home)}
            >
              <HomeOutlined className="mr-1" />
              <span>Trang chủ</span>
            </button>
            <span className="text-gray-400">{'>'}</span>
            <span className="px-3 py-1 rounded-full bg-orange-500 text-white font-medium">
              {breadcrumbLabel}
            </span>
          </nav>
        </div>
        
        <Carousel autoplay arrows>
          <div>
            <img
              src="https://a-static.besthdwallpaper.com/zed-martial-arts-tournament-league-of-legends-wallpaper-7680x4320-105355_56.jpg"
              alt="Banner 1"
              style={{
                width: '100%',
                height: 300,
                objectFit: 'cover',
                borderRadius: 8,
              }}
            />
          </div>
          <div>
            <img
              src="https://a-static.besthdwallpaper.com/zed-martial-arts-tournament-league-of-legends-wallpaper-7680x4320-105355_56.jpg"
              alt="Banner 2"
              style={{
                width: '100%',
                height: 300,
                objectFit: 'cover',
                borderRadius: 8,
              }}
            />
          </div>
          <div>
            <img
              src="https://a-static.besthdwallpaper.com/zed-martial-arts-tournament-league-of-legends-wallpaper-7680x4320-105355_56.jpg"
              alt="Banner 3"
              style={{
                width: '100%',
                height: 300,
                objectFit: 'cover',
                borderRadius: 8,
              }}
            />
          </div>
        </Carousel>
      </div>
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
<<<<<<< HEAD
            <div className='sticky top-0'>
              <SideBarProduct
              brands={brands}
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
            </div>
=======
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

>>>>>>> fix-admin
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

window.addEventListener('selectedBrandsChange', (e) => {
  console.log('Selected brands:', e.detail);
});