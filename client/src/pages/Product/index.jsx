import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ProductGrid from '../../components/features/ProductGrid'
import { Grid } from 'antd'
import { useFirestore } from '../../hooks/useFirestore'
import { db } from '../../utils/firebase'
import { useProductService } from '../../services/productService' // Thêm dòng này

const { useBreakpoint } = Grid

const sortOptions = [
  { label: 'Bán chạy nhất', value: 'bestseller' },
  { label: 'Khuyến mãi hot', value: 'hotdeal' },
  { label: 'Giá tăng dần', value: 'asc' },
  { label: 'Giá giảm dần', value: 'desc' },
]

function Product() {
  const { filterProduct } = useProductService() // Đổi từ getProductsWithStore sang filterProduct
  const [products, setProducts] = useState([])
  const [selectedSort, setSelectedSort] = useState('bestseller')
  const { getAllDocs } = useFirestore(db, 'posts')
  const [posts, setPosts] = useState([])
  const filteredProducts = useSelector(state => state.filterProduct)
  const screens = useBreakpoint()
  const isSmall = !screens.md
  const isMedium = screens.md && !screens.lg


  useEffect(() => {
    // Lấy bài viết
    getAllDocs().then(posts => {
      setPosts(posts)
    })
    filterProduct(filteredProducts, selectedSort).then(products => {
      setProducts(products)
    })
    // eslint-disable-next-line
  }, [selectedSort, filteredProducts])

  const handleSortClick = (option) => {
    setSelectedSort(option.value)
  }

  // Giả sử bạn có một mảng sản phẩm tên là products
  const bestSellerProducts = products.filter(product => product.isbestSeller === true);

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
  )
}

export default Product
