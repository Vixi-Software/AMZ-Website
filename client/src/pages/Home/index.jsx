import React from 'react'
import { Carousel, Space } from 'antd'
import 'antd/dist/reset.css'
import CountSale from './CountSale'
import BannerCustom from './BannerCustom'
import ProductGrid from '../../components/ui/product-grid'
import BannerCustom2 from './BannerCustom2'
import Feeback from './Feeback'

const carouselImages = [
  'https://tiengvangaudio.vn/wp-content/uploads/2023/02/BANNER-DM-JBL.jpg',
  'https://th.bing.com/th/id/OIP.TwEyvv_v8V_eLhG-g21lLgHaDR?rs=1&pid=ImgDetMain',
  'https://baochauelec.com/cdn1/images/202204/thumb_article/cac-mau-loa-bluetooth-nho-gon-pin-trau-nen-mua-du-lich-he-2022-thumb-1650940183.jpg',
]

const products = [
  {
    id: 1,
    name: "Harman Kardon Go Play 3",
    price: "3,590,000",
    oldPrice: "5,000,000",
    discount: "Giảm 19%",
    tag: "Newseal",
    image: "https://th.bing.com/th/id/OIP.yhQo3CZKHiMvoixlJ44Z6wHaE8?rs=1&pid=ImgDetMain",
    colors: ["#ff69b4", "#e5e7eb", "#000000"],
    description: "Giá tham khảo. Chi tiết xin liên hệ zalo"
  },
  {
    id: 2,
    name: "Sony SRS-XB43",
    price: "2,990,000",
    oldPrice: "4,200,000",
    discount: "Giảm 15%",
    tag: "Hot",
    image: "https://th.bing.com/th/id/OIP.2Qw8Qw8Qw8Qw8Qw8Qw8Qw8HaE8?rs=1&pid=ImgDetMain",
    colors: ["#2563eb", "#e5e7eb", "#22c55e"],
    description: "Loa Sony chính hãng, bảo hành 12 tháng"
  },
  {
    id: 3,
    name: "JBL Charge 5",
    price: "2,490,000",
    oldPrice: "3,500,000",
    discount: "Giảm 10%",
    tag: "Best Seller",
    image: "https://th.bing.com/th/id/OIP.3Qw8Qw8Qw8Qw8Qw8Qw8Qw8HaE8?rs=1&pid=ImgDetMain",
    colors: ["#fb923c", "#e5e7eb", "#000000"],
    description: "Pin trâu, chống nước IP67"
  },
  {
    id: 4,
    name: "Marshall Emberton II",
    price: "3,200,000",
    oldPrice: "4,000,000",
    discount: "Giảm 20%",
    tag: "Hot",
    image: "https://th.bing.com/th/id/OIP.4Qw8Qw8Qw8Qw8Qw8Qw8Qw8HaE8?rs=1&pid=ImgDetMain",
    colors: ["#000000", "#e5e7eb", "#fbbf24"],
    description: "Âm thanh sống động, thiết kế cổ điển"
  },
  {
    id: 5,
    name: "Bose SoundLink Flex",
    price: "2,800,000",
    oldPrice: "3,600,000",
    discount: "Giảm 12%",
    tag: "New",
    image: "https://th.bing.com/th/id/OIP.5Qw8Qw8Qw8Qw8Qw8Qw8Qw8HaE8?rs=1&pid=ImgDetMain",
    colors: ["#2563eb", "#e5e7eb", "#f87171"],
    description: "Chống nước, âm bass mạnh mẽ"
  },
  {
    id: 6,
    name: "Anker Soundcore Motion+",
    price: "1,990,000",
    oldPrice: "2,500,000",
    discount: "Giảm 8%",
    tag: "Best Seller",
    image: "https://th.bing.com/th/id/OIP.6Qw8Qw8Qw8Qw8Qw8Qw8Qw8HaE8?rs=1&pid=ImgDetMain",
    colors: ["#22c55e", "#e5e7eb", "#000000"],
    description: "Pin 12h, hỗ trợ aptX"
  },
  {
    id: 7,
    name: "Ultimate Ears BOOM 3",
    price: "2,350,000",
    oldPrice: "3,000,000",
    discount: "Giảm 10%",
    tag: "Hot",
    image: "https://th.bing.com/th/id/OIP.7Qw8Qw8Qw8Qw8Qw8Qw8Qw8HaE8?rs=1&pid=ImgDetMain",
    colors: ["#a21caf", "#e5e7eb", "#2563eb"],
    description: "Chống nước, chống bụi, nhiều màu sắc"
  },
  {
    id: 8,
    name: "Xiaomi Mi Portable Bluetooth Speaker",
    price: "990,000",
    oldPrice: "1,200,000",
    discount: "Giảm 5%",
    tag: "New",
    image: "https://th.bing.com/th/id/OIP.8Qw8Qw8Qw8Qw8Qw8Qw8Qw8HaE8?rs=1&pid=ImgDetMain",
    colors: ["#f87171", "#e5e7eb", "#000000"],
    description: "Giá rẻ, chất lượng ổn định"
  }
]

const extraButtons = [
  { key: "extra1", label: "Xem khuyến mãi", type: "default" },
  { key: "extra2", label: "Sản phẩm mới", type: "default" }
]

const banners = [
  { bannerImg: "https://seve7.vn/wp-content/themes/yootheme/cache/01.11-01-scaled-6d43862a.jpeg", alt: "Banner 1", bannerIndex: 1 },
  { bannerImg: "https://th.bing.com/th/id/OIP.u0yK-aYenmSmKoq7WOL5sQHaEm?w=864&h=537&rs=1&pid=ImgDetMain", alt: "Banner 2", bannerIndex: 5 },
]
const products2 = [
  {
    id: 1,
    name: "LG XBOOM Go PL7",
    price: "2,100,000",
    oldPrice: "2,800,000",
    discount: "Giảm 8%",
    tag: "Hot",
    image: "https://th.bing.com/th/id/OIP.9Qw8Qw8Qw8Qw8Qw8Qw8Qw8HaE8?rs=1&pid=ImgDetMain",
    colors: ["#2563eb", "#e5e7eb", "#fbbf24"],
    description: "Âm thanh Meridian, pin 24h"
  },
  {
    id: 2,
    name: "SoundPEATS Halo",
    price: "1,200,000",
    oldPrice: "1,500,000",
    discount: "Giảm 5%",
    tag: "New",
    image: "https://th.bing.com/th/id/OIP.10Qw8Qw8Qw8Qw8Qw8Qw8Qw8HaE8?rs=1&pid=ImgDetMain",
    colors: ["#fb923c", "#e5e7eb", "#000000"],
    description: "Bluetooth 5.3, chống nước IPX7"
  },
  {
    id: 3,
    name: "JBL Flip 6",
    price: "2,400,000",
    oldPrice: "3,000,000",
    discount: "Giảm 10%",
    tag: "Best Seller",
    image: "https://th.bing.com/th/id/OIP.11Qw8Qw8Qw8Qw8Qw8Qw8Qw8HaE8?rs=1&pid=ImgDetMain",
    colors: ["#22c55e", "#e5e7eb", "#000000"],
    description: "Chống nước IP67, âm bass mạnh"
  },
  {
    id: 4,
    name: "Sony SRS-XB23",
    price: "1,800,000",
    oldPrice: "2,200,000",
    discount: "Giảm 8%",
    tag: "Hot",
    image: "https://th.bing.com/th/id/OIP.12Qw8Qw8Qw8Qw8Qw8Qw8Qw8HaE8?rs=1&pid=ImgDetMain",
    colors: ["#2563eb", "#e5e7eb", "#f87171"],
    description: "Pin 12h, thiết kế nhỏ gọn"
  },
  {
    id: 5,
    name: "Marshall Willen",
    price: "2,700,000",
    oldPrice: "3,200,000",
    discount: "Giảm 7%",
    tag: "New",
    image: "https://th.bing.com/th/id/OIP.13Qw8Qw8Qw8Qw8Qw8Qw8Qw8HaE8?rs=1&pid=ImgDetMain",
    colors: ["#000000", "#e5e7eb", "#fbbf24"],
    description: "Chống nước IP67, thiết kế cổ điển"
  },
  {
    id: 6,
    name: "Bose SoundLink Micro",
    price: "1,900,000",
    oldPrice: "2,400,000",
    discount: "Giảm 12%",
    tag: "Best Seller",
    image: "https://th.bing.com/th/id/OIP.14Qw8Qw8Qw8Qw8Qw8Qw8Qw8HaE8?rs=1&pid=ImgDetMain",
    colors: ["#f87171", "#e5e7eb", "#2563eb"],
    description: "Chống nước, âm thanh mạnh mẽ"
  },
  {
    id: 7,
    name: "Anker Soundcore Mini 3",
    price: "850,000",
    oldPrice: "1,100,000",
    discount: "Giảm 5%",
    tag: "Hot",
    image: "https://th.bing.com/th/id/OIP.15Qw8Qw8Qw8Qw8Qw8Qw8Qw8HaE8?rs=1&pid=ImgDetMain",
    colors: ["#a21caf", "#e5e7eb", "#22c55e"],
    description: "Nhỏ gọn, pin 15h"
  },
  {
    id: 8,
    name: "Edifier MP230",
    price: "1,500,000",
    oldPrice: "1,900,000",
    discount: "Giảm 10%",
    tag: "New",
    image: "https://th.bing.com/th/id/OIP.16Qw8Qw8Qw8Qw8Qw8Qw8Qw8HaE8?rs=1&pid=ImgDetMain",
    colors: ["#fbbf24", "#e5e7eb", "#000000"],
    description: "Thiết kế retro, pin 10h, âm thanh chất lượng"
  }
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

        <ProductGrid
          title="Top bán chạy"
          products={products}
          banners={banners}
          extraButtons={extraButtons}
          viewAllButton={() => alert("Xem tất cả sản phẩm")}
        />

        <ProductGrid
          title="Loa nổi bật"
          products={products2}
          banners={banners2}
          extraButtons={extraButtons2}
          viewAllButton={() => alert("Xem tất cả loa nổi bật")}
        />
        <BannerCustom2 />
        <Feeback />
      </Space>
    </div>
  )
}

export default Home