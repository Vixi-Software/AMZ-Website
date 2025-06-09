import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Row, Col } from 'antd'

function ProductDetail() {
  const product = useSelector(state => state.product.product)
  const [selectedImage, setSelectedImage] = useState(0)


  if (!product) {
    return (
      <div>
        <h2>Product Detail</h2>
        <p>Không có sản phẩm nào được chọn.</p>
      </div>
    )
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div className="mb-4">
        <nav className="flex items-center gap-2 text-sm">
          {/* Home icon */}
          <span className="flex items-center gap-1 text-black border-2 p-2 rounded-full border-black">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
              <path d="M3 10.75L12 4l9 6.75" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4.5 10.75V19a1 1 0 001 1h3.5v-4.25a1 1 0 011-1h2a1 1 0 011 1V20H18.5a1 1 0 001-1v-8.25" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Trang chủ</span>
          </span>
          {/* Divider */}
          <span className="mx-1 text-black">{'>'}</span>
          {/* Category */}
          <span className="flex items-center gap-1 text-black border-2 p-2 rounded-full border-black">
            {product.category || 'Danh mục'}
          </span>
          {/* Divider */}
          <span className="mx-1 text-black">{'>'}</span>
          {/* Product name */}
          <span className="flex items-center gap-1 bg-orange-500 text-white font-semibold p-2 rounded-full border-2 border-orange-500">
            {product.name}
          </span>
        </nav>
      </div>

      <Row gutter={24}>
        {/* Left: Image + Features */}
        <Col xs={24} md={14}>
          {/* Features */}
          <div className="flex gap-5 bg-orange-500 text-white rounded-lg p-4 mb-4">
            <div className="w-[540px] h-[350px] bg-gray-200 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
              {Array.isArray(product.image) && product.image.length > 0 ? (
                <img
                  src={product.image[selectedImage]}
                  alt={product.name}
                  className="rounded-lg object-cover w-full h-full"
                />
              ) : (
                <span className="text-gray-300">No Image</span>
              )}
            </div>
            <div>
              <div className="font-semibold text-lg mb-2">TÍNH NĂNG NỔI BẬT</div>
              <ul className="m-0 list-disc pl-4">
                <li>Chống ồn chủ động với bộ xử lý HD QN2e, cảm nhận âm thanh môi trường hoặc tai</li>
                <li>Bộ màng loa Dynamic Driver X giúp tái tạo âm thanh chi tiết, mạnh mẽ, sống động</li>
                <li>Tối ưu hóa âm thanh cho nhiều tình huống thực tế, tự động điều chỉnh EQ</li>
                <li>Chống nước nhẹ, thời lượng pin dài, chất liệu thân thiện cho thao tác chuyển động dễ dàng</li>
              </ul>
            </div>
          </div>
          {/* Product Image Select*/}
          <div className="flex gap-2 mb-4">
            {Array.isArray(product.image) && product.image.length > 1 && product.image.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`border ${selectedImage === idx ? 'border-orange-500' : 'border-gray-300'} rounded-md p-0.5 cursor-pointer w-30 h-30 bg-white flex items-center justify-center box-border`}
              >
                <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover rounded" />
              </div>
            ))}
          </div>
        </Col>

        {/* Right: Info + Price + Options */}
        <Col xs={24} md={10}>
          {/* Product Name */}
          <h2 className="m-0 font-bold text-2xl">{product.name}</h2>
          {/* Price */}
          <div className="flex items-baseline gap-4 mb-4">
            <span className="text-orange-600 font-bold text-4xl">
              {product.Ban_Le_Value?.toLocaleString('vi-VN')} ₫
            </span>
            <span className="text-gray-300 line-through text-2xl">
              {product.Ban_Le?.toLocaleString('vi-VN')} ₫
            </span>
          </div>
          {/* Color Options */}
          <div className="mb-3">
            <div className="font-semibold mb-1">Màu sắc</div>
            <div className="flex gap-2">
              {(Array.isArray(product.color) ? product.color : [product.color]).map((color, idx) => (
                <span key={idx} className="border border-gray-300 rounded-md px-4 py-1 bg-white font-medium">{color}</span>
              ))}
            </div>
          </div>
          {/* Condition Options */}
          <div className="mb-3">
            <div className="font-semibold mb-1">Tình trạng</div>
            <div className="flex gap-2">
              <span className="border border-orange-500 bg-orange-50 text-orange-500 rounded-md px-4 py-1 font-medium">{product.Product_condition}</span>
            </div>
          </div>
          {/* Stock Info */}
          <div className="mb-3">
            <div className="font-semibold mb-1">Chi nhánh mua hàng</div>
            <div className="flex gap-4">
              <div className="bg-gray-200 rounded-md p-2">
                <div>HÀ NỘI</div>
                <div className="text-orange-500 font-semibold">Zalo: 0333.571.236</div>
                <div>Số lượng: {product.HaNoi}</div>
              </div>
              <div className="bg-gray-200 rounded-md p-2">
                <div>ĐÀ NẴNG</div>
                <div className="text-orange-500 font-semibold">Zalo: 0333.571.236</div>
                <div>Số lượng: {product.DaNang}</div>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <Row gutter={24} className="mt-8">
        <Col xs={24} md={14} className="bg-white py-4">
          <div className="text-black text-base mb-2 bg-gray-200 p-3 rounded-md">
            <h3 className="text-lg text-orange-400 text-center font-semibold mb-2">Mô tả sản phẩm</h3>
            {product.description}
          </div>
          {/* Rating */}
          {/* <div className="text-yellow-400 font-semibold mb-4">
            ★★★★★ <span className="text-gray-500 font-normal text-sm">97 đánh giá</span>
          </div> */}
        </Col>

        <Col xs={24} md={10} className="">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Thông tin sản phẩm</h3>
            <table className="w-full text-gray-700 text-base [&>tbody>tr>td]:px-3 [&>tbody>tr>td]:py-2 [&>tbody>tr>th]:px-3 [&>tbody>tr>th]:py-2">
              <tbody>
                <tr className="odd:bg-gray-100">
                  <td className="font-bold pr-2 w-1/3">Thương hiệu:</td>
                  <td>{product.brand}</td>
                </tr>
                <tr className="odd:bg-gray-100">
                  <td className="font-bold py-1 pr-2">Model:</td>
                  <td className="py-1">{product.model}</td>
                </tr>
                <tr className="odd:bg-gray-100">
                  <td className="font-bold py-1 pr-2">Trọng lượng:</td>
                  <td className="py-1">{product.weight}g</td>
                </tr>
                <tr className="odd:bg-gray-100">
                  <td className="font-bold py-1 pr-2">Kích thước:</td>
                  <td className="py-1">{product.size}</td>
                </tr>
                <tr className="odd:bg-gray-100">
                  <td className="font-bold py-1 pr-2">Bảo hành:</td>
                  <td className="py-1">{product.warranty} tháng</td>
                </tr>
                <tr className="odd:bg-gray-100">
                  <td className="font-bold py-1 pr-2">Mã SKU:</td>
                  <td className="py-1">{product.sku || product.Barcode}</td>
                </tr>
                <tr className="odd:bg-gray-100">
                  <td className="font-bold py-1 pr-2">Mã vạch:</td>
                  <td className="py-1">{product.Barcode}</td>
                </tr>
                <tr className="odd:bg-gray-100">
                  <td className="font-bold py-1 pr-2">Giá nhập:</td>
                  <td className="py-1">{product.importPrice?.toLocaleString('vi-VN')} ₫</td>
                </tr>
                <tr className="odd:bg-gray-100">
                  <td className="font-bold py-1 pr-2">Giá bán buôn:</td>
                  <td className="py-1">{product.wholesalePrice?.toLocaleString('vi-VN')} ₫</td>
                </tr>
                <tr className="odd:bg-gray-100">
                  <td className="font-bold py-1 pr-2">Giá bán lẻ:</td>
                  <td className="py-1">{product.retailPrice?.toLocaleString('vi-VN')} ₫</td>
                </tr>
                <tr className="odd:bg-gray-100">
                  <td className="font-bold py-1 pr-2">Giá khuyến mãi:</td>
                  <td className="py-1">{product.salePrice?.toLocaleString('vi-VN')} ₫</td>
                </tr>
                <tr className="odd:bg-gray-100">
                  <td className="font-bold py-1 pr-2">Tags:</td>
                  <td className="py-1">{product.tags}</td>
                </tr>
                <tr className="odd:bg-gray-100">
                  <td className="font-bold py-1 pr-2">Mã danh mục:</td>
                  <td className="py-1">{product.category_code}</td>
                </tr>
                <tr className="odd:bg-gray-100">
                  <td className="font-bold py-1 pr-2">Loại sản phẩm:</td>
                  <td className="py-1">{product.category}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default ProductDetail