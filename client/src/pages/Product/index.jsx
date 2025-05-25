import React from 'react'
import ProductGrid from '../../components/ui/product-grid'

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

const banners = [
  { bannerImg: "https://seve7.vn/wp-content/themes/yootheme/cache/01.11-01-scaled-6d43862a.jpeg", alt: "Banner 1", bannerIndex: 1 },
  { bannerImg: "https://th.bing.com/th/id/OIP.u0yK-aYenmSmKoq7WOL5sQHaEm?w=864&h=537&rs=1&pid=ImgDetMain", alt: "Banner 2", bannerIndex: 5 },
]

function Product() {
  return (
    <ProductGrid
      products={products}
      banners={banners}
      viewAllButton={() => alert("Xem tất cả loa nổi bật")}
    />
  )
}

export default Product