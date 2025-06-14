import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ProductGrid from '../../components/features/ProductGrid'
import { useProductHelper } from '../../utils/productHelper'
import { message, Grid } from 'antd' 

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

  const filterProducts = useSelector(state => state.filterProduct)
  const screens = useBreakpoint()
  const isSmall = !screens.md 
  const isMedium = screens.md && !screens.lg 

  useEffect(() => {
    filterProductsHelper(filterProducts).then(setProducts)
  }, [filterProducts])

  const handleSortClick = (option) => {
    setSelectedSort(option.value)
    message.info(`Bạn đã chọn: ${option.label}`)
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
            className={`font-medium text-[#222] mr-2  text-nowrap ${
              isSmall
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
                ` rounded-[10px] ${
                  isSmall
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
    </div>
  )
}

export default Product