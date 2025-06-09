import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ProductGrid from '../../components/features/ProductGrid'
import { useProductHelper } from '../../utils/productHelper'

function Product() {
  const { filterProducts: filterProductsHelper } = useProductHelper()
  const [products, setProducts] = useState([])

  const filterProducts = useSelector(state => state.filterProduct)
  console.log('Filter Products:', filterProducts)

  useEffect(() => {
    filterProductsHelper(filterProducts).then(setProducts)
  }, [filterProducts])

  return (
    <div>
      {products.length === 0 ? (
        <div>Không có sản phẩm phù hợp</div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  )
}

export default Product