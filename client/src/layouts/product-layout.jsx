import React, { useEffect, useState } from 'react'
import Header from '../components/features/Header'
import SideBarProduct from '../components/features/SideBarProduct'
import { Col, Row, Carousel } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import routePaths from '../constants/routePath'
import { getBrandsFromFirebase } from '../utils/database'
import { db } from '../utils/firebase'
import { useFirestore } from '../hooks/useFirestore'
function ProductLayout({ children }) {
  const [breadcrumbLabel, setBreadcrumbLabel] = useState('Tai nghe nhét tai cũ')
   useEffect(() => {
    const label = localStorage.getItem('selectedSidebarLabel')
    if (label) setBreadcrumbLabel(label)
  }, [])
  const navigate = useNavigate()

  const { getAllDocs } = useFirestore(db, 'posts')
  const [posts, setPosts] = useState([])

 

  const [brands, setBrands] = useState([])

  useEffect(() => {
    getBrandsFromFirebase().then(setBrands)
  }, [])

  useEffect(() => {
    getAllDocs().then((data) => setPosts(data));
  }, []);

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
        <Row gutter={[16, 0]}>
          <Col xs={24} sm={6} md={7} lg={5}>
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
          </Col>
          <Col xs={24} sm={18} md={17} lg={19}>
            {children}
          </Col>
        </Row>
      </div>

      {/* Hiển thị các bài viết */}
      <div className="max-w-[1400px] mx-auto px-2 md:px-3 lg:px-0 mt-5">
        {posts.map((post) => (
          <div key={post.id} style={{ marginBottom: 32, borderBottom: "1px solid #eee", paddingBottom: 16 }}>
            <h1 className='text-2xl'>{post.title}</h1>
            <div style={{ color: "#888", fontSize: 14 }}>
              {post.createdAt
                ? new Date(post.createdAt.seconds * 1000).toLocaleString()
                : ""}
            </div>
            <div
              style={{ marginTop: 12 }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductLayout

window.addEventListener('selectedBrandsChange', (e) => {
  console.log('Selected brands:', e.detail);
});