import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ProductGrid from '../../components/features/ProductGrid'
import { useProductHelper } from '../../utils/productHelper'

function Product() {
  const { filterProducts: filterProductsHelper } = useProductHelper()
  const [products, setProducts] = useState([])

  const filterProducts = useSelector(state => state.filterProduct)

  useEffect(() => {
    filterProductsHelper(filterProducts).then(setProducts)
  }, [filterProducts])

  return (
    <div>
      {products.length === 0 ? (
        <div>Không có sản phẩm phù hợp</div>
      ) : (
        <ProductGrid
          // title={<span className='flex gap-2'><b>Top bán chạy</b></span>}
          // buttons={[
          //   { label: "Top tai nghe", type: "primary", className: "!font-semibold !bg-[#D65312]", onClick: () => { } },
          //   { label: "Top loa", className: "!font-semibold", onClick: () => { } }
          // ]}
          products={products} />
      )}

      
    </div>
  )
}

export default Product