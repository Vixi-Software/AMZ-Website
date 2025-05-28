import React, { useEffect, useState } from 'react'
import { Carousel, Space } from 'antd'
import 'antd/dist/reset.css'
import CountSale from './CountSale'
import BannerCustom from './BannerCustom'
import ProductGrid from '../../components/ui/product-grid'
import BannerCustom2 from './BannerCustom2'
import Feeback from './Feeback'
import { db } from '../../utils/firebase'
import { useFirestore } from '../../hooks/useFirestore'

const carouselImages = [
  'https://tiengvangaudio.vn/wp-content/uploads/2023/02/BANNER-DM-JBL.jpg',
  'https://th.bing.com/th/id/OIP.TwEyvv_v8V_eLhG-g21lLgHaDR?rs=1&pid=ImgDetMain',
  'https://baochauelec.com/cdn1/images/202204/thumb_article/cac-mau-loa-bluetooth-nho-gon-pin-trau-nen-mua-du-lich-he-2022-thumb-1650940183.jpg',
]

const extraButtons = [
  { key: "extra1", label: "Xem khuyến mãi", type: "default" },
  { key: "extra2", label: "Sản phẩm mới", type: "default" }
]
const banners = [
  { bannerImg: "https://seve7.vn/wp-content/themes/yootheme/cache/01.11-01-scaled-6d43862a.jpeg", alt: "Banner 1", bannerIndex: 1 },
  { bannerImg: "https://th.bing.com/th/id/OIP.u0yK-aYenmSmKoq7WOL5sQHaEm?w=864&h=537&rs=1&pid=ImgDetMain", alt: "Banner 2", bannerIndex: 5 },
]
const banners2 = [
  { bannerImg: "https://www.thuongdo.com/sites/default/files/field/image/tai-nghe-bluetooth-trung-quoc-1.jpg", alt: "Banner 3", bannerIndex: 0 },
  { bannerImg: "https://seve7.vn/wp-content/uploads/2022/09/1024x576-02-6-scaled.jpg", alt: "Banner 4", bannerIndex: 6 },
]
const extraButtons2 = [
  { key: "extra3", label: "Loa di động", type: "default" },
  { key: "extra4", label: "Giảm giá sốc", type: "primary" }
]

function Home() {
  const [products, setProducts] = useState([])
  const [products2, setProducts2] = useState([])
  const { getAllDocs } = useFirestore(db, 'products')

  useEffect(() => {
    getAllDocs().then((data) => {
      setProducts(data)
      setProducts2(data) // hoặc lọc theo điều kiện nếu muốn
    })
  }, [])

  return (
    <div className="w-full">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Carousel autoplay arrows>
          {carouselImages.map((img, idx) => (
            <div key={idx}>
              <img
                src={img}
                alt={`carousel-${idx}`}
                className="
                  w-full object-cover
                  h-[300px]
                  md:h-[400px]
                  lg:h-[560px]
                  rounded-lg
                "
              />
            </div>
          ))}
        </Carousel>
        <CountSale />
        <BannerCustom />
        <ProductGrid
          title="Top bán chạy"
          products={products}
          banners={banners}
          extraButtons={extraButtons}
          viewAllButton={() => alert("Xem tất cả sản phẩm")}
        />
        {/* <ProductGrid
          title="Loa nổi bật"
          products={products2}
          banners={banners2}
          extraButtons={extraButtons2}
          viewAllButton={() => alert("Xem tất cả loa nổi bật")}
        /> */}
        <BannerCustom2 />
        <Feeback />
      </Space>
    </div>
  )
}

export default Home