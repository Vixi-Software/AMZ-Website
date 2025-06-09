import React from 'react'
import { useSelector } from 'react-redux'

function ProductDetail() {
  const product = useSelector(state => state.product.product)

  return (
    <div>
      <h2>Product Detail</h2>
      {product ? (
        <div>
          <p>Tên sản phẩm: {product.name}</p>
          <p>Mô tả: {product.description}</p>
          {/* Thêm các thông tin khác nếu cần */}
        </div>
      ) : (
        <p>Không có sản phẩm nào được chọn.</p>
      )}
    </div>
  )
}

export default ProductDetail