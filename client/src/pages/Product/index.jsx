import React, { useEffect, useState } from 'react'
import ProductGrid from '../../components/ui/product-grid'
import { getProductsByCategory } from '../../utils/database'

// const banners = [
//   { bannerImg: "https://seve7.vn/wp-content/themes/yootheme/cache/01.11-01-scaled-6d43862a.jpeg", alt: "Banner 1", bannerIndex: 1 },
//   { bannerImg: "https://th.bing.com/th/id/OIP.u0yK-aYenmSmKoq7WOL5sQHaEm?w=864&h=537&rs=1&pid=ImgDetMain", alt: "Banner 2", bannerIndex: 5 },
// ]

function Product() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const selectedCategory = localStorage.getItem('selectedSidebarLabel') || 'Loa Bluetooth'
    console.log("🚀 ~ useEffect ~ selectedCategory:", selectedCategory)
    getProductsByCategory(selectedCategory).then(setProducts)
    console.log("🚀 ~ useEffect ~ products:", products)
  }, [])

  return (
    <ProductGrid
      products={products}
      // banners={banners}
      viewAllButton={() => alert("Xem tất cả loa nổi bật")}
    />
  )
}

export default Product