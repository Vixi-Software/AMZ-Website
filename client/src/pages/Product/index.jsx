import React, { useEffect, useState } from 'react'
<<<<<<< HEAD
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
    <ProductGrid
      products={filteredProducts}
      // banners={banners}
      viewAllButton={() => alert("Xem tất cả loa nổi bật")}
    />
=======
import { useSelector } from 'react-redux'
import ProductGrid from '../../components/features/ProductGrid'
import { useProductHelper } from '../../utils/productHelper'
import { Grid } from 'antd'
import { useFirestore } from '../../hooks/useFirestore'
import { db } from '../../utils/firebase'

const { useBreakpoint } = Grid

const sortOptions = [
  { label: 'Bán chạy nhất', value: 'bestseller' },
  { label: 'Khuyến mãi hot', value: 'hotdeal' },
  { label: 'Giá tăng dần', value: 'asc' },
  { label: 'Giá giảm dần', value: 'desc' },
]

function Product() {
  const { filterProducts: filterProductsHelper } = useProductHelper()
  const [products, setProducts] = useState([])
  const [selectedSort, setSelectedSort] = useState('bestseller')
  const { getAllDocs } = useFirestore(db, 'posts')
  const [posts, setPosts] = useState([])

  const filterProducts = useSelector(state => state.filterProduct)
  const screens = useBreakpoint()
  const isSmall = !screens.md
  const isMedium = screens.md && !screens.lg

  useEffect(() => {
    filterProductsHelper(filterProducts, selectedSort).then(setProducts)
  }, [filterProducts, selectedSort])

  useEffect(() => {
    getAllDocs().then(posts => {
      // console.log('Posts:', posts)
      setPosts(posts)
    })
  }, [])

  const handleSortClick = (option) => {
    setSelectedSort(option.value)
    // message.info(`Bạn đã chọn: ${option.label}`)
  }

  return (
    <div>
      <div
        className={
          `bg-[#FFFFFF] rounded-[10px] px-4 py-3 mb-4 flex items-center gap-3` +
          (isSmall ? ' flex-col items-start mt-3 gap-2' : '')
        }
      >
        {!(isSmall || isMedium) && (
          <span
            className={`font-medium text-[#222] mr-2  text-nowrap ${isSmall
                ? 'text-[16px] '
                : isMedium
                  ? 'text-[14px]'
                  : 'text-[20px]'
              }`}
          >
            Sắp xếp theo
          </span>
        )}
        <div className="flex gap-2 w-full overflow-x-auto">
          {sortOptions.map(option => (
            <button
              key={option.value}
              className={
                (selectedSort === option.value
                  ? "border border-[#D65312] text-[#D65312] bg-white font-medium focus:outline-none"
                  : "border border-[#e0e0e0] text-[#222] bg-white font-medium focus:outline-none hover:border-[#D65312]") +
                ` rounded-[10px] ${isSmall
                  ? 'p-1 text-[10px]'
                  : isMedium
                    ? 'px-1 py-1 text-[12px]'
                    : 'px-6 py-1 text-[20px]'
                }`
              }
              onClick={() => handleSortClick(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      {products.length === 0 ? (
        <div>Không có sản phẩm phù hợp</div>
      ) : (
        <ProductGrid products={products} />
      )}
      <div className='mt-4'>
        {/* HIển thị bài viết */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {posts.map(post => (
              <div key={post.id} className="p-4 rounded-lg">
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <div
                  className="text-gray-600"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div>Không có bài viết nào</div>
        )}
      </div>
    </div>
>>>>>>> fix-admin
  )
}

export default Product
