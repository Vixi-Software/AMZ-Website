import React, { useEffect, useState } from 'react'
import ProductGrid from '../../components/ui/product-grid'
import { getProductsByCategory } from '../../utils/database'

// const banners = [
//   { bannerImg: "https://seve7.vn/wp-content/themes/yootheme/cache/01.11-01-scaled-6d43862a.jpeg", alt: "Banner 1", bannerIndex: 1 },
//   { bannerImg: "https://th.bing.com/th/id/OIP.u0yK-aYenmSmKoq7WOL5sQHaEm?w=864&h=537&rs=1&pid=ImgDetMain", alt: "Banner 2", bannerIndex: 5 },
// ]

function Product() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    const selectedCategory = localStorage.getItem('selectedSidebarLabel') || 'Loa Bluetooth'
    getProductsByCategory(selectedCategory).then((data) => {
      setProducts(data)
      // Lọc theo brand ban đầu nếu có
      const selectedBrands = JSON.parse(localStorage.getItem('selectedBrands') || '[]')
      if (selectedBrands.length > 0) {
        setFilteredProducts(data.filter((product) => selectedBrands.includes(product.brand)))
      } else {
        setFilteredProducts(data)
      }
    })
  }, [])

  useEffect(() => {
    const handleFilterChange = (e) => {
      const { brands, prices } = e.detail;
      console.log('Filter changed:', brands, prices);
      let filtered = products;

      if (brands && brands.length > 0) {
        filtered = filtered.filter((product) => brands.includes(product.brand));
      }
      if (prices && Array.isArray(prices)) {
        const [min, max] = prices;
        // Chuyển Ban_Le từ "3.290.000 ₫" thành số
        filtered = filtered.filter((product) => {
          const price = Number(
            product.Ban_Le.replace(/[^\d]/g, '')
          );
          return price >= min && price <= max;
        });
        console.log("Filtered range", filtered)
      }
      setFilteredProducts(filtered);
    };
    window.addEventListener('filterChange', handleFilterChange);

    return () => {
      window.removeEventListener('filterChange', handleFilterChange);
    };
  }, [products])

  // Xóa selectedBrands và selectedPrices khỏi localStorage khi thoát trang
  useEffect(() => {
    return () => {
      localStorage.removeItem('selectedBrands');
      localStorage.removeItem('selectedPrices');
    };
  }, []);


  return (
    <>
      <ProductGrid
        products={filteredProducts}
        // banners={banners}
        viewAllButton={() => alert("Xem tất cả loa nổi bật")}
      />
      
    </>
  )
}

export default Product