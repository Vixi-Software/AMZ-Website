import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Row, Col, Grid, message, Skeleton } from 'antd'
import ProductCard from '../../components/features/ProductCard'
import { useProductHelper } from '../../utils/productHelper'
import { useNavigate } from 'react-router-dom'
import routePath from '../../constants/routePath'
import Breadcum from '../../components/features/Breadcum'
import Loading from '../../components/features/Loading' // Thêm dòng này

function ProductDetail() {
  const product = useSelector(state => state.product.product)
  const [selectedImage, setSelectedImage] = useState(0)
  const [relatedProducts, setRelatedProducts] = useState([])
  const { getProductsByCategory } = useProductHelper()
  const navigate = useNavigate()
  const screens = Grid.useBreakpoint();
  const isSmall = screens.md === false

  const [selectedOptions, setSelectedOptions] = useState({
    color: null,
    condition: null,
    branch: null
  })
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600); // Giả lập loading, có thể thay bằng logic thực tế
    return () => clearTimeout(timer);
  }, [product]);

  useEffect(() => {
    const fetchRelated = async () => {
      if (product && product.category) {
        let products = await getProductsByCategory(product.category)
        products = products.filter(p => p.id !== product.id)
        const shuffled = products.sort(() => 0.5 - Math.random())
        // Lấy 3 sản phẩm nếu md, 4 nếu lg, còn lại lấy 5
        let count = 5
        if (screens.lg) count = 4
        else if (screens.md) count = 3
        setRelatedProducts(shuffled.slice(0, count))
      }
    }
    fetchRelated()
  }, [product, screens.md, screens.lg])

  const handleSelectOption = (type, value) => {
    setSelectedOptions(prev => {
      let newOptions;
      if (prev[type] === value) {
        newOptions = { ...prev, [type]: null }
      } else {
        newOptions = { ...prev, [type]: value }
      }

      message.open({
        type: 'info',
        content: (
          <div>
            <div><b>Màu sắc:</b> {newOptions.color || 'Chưa chọn'}</div>
            <div><b>Tình trạng:</b> {newOptions.condition || 'Chưa chọn'}</div>
            <div><b>Chi nhánh:</b> {newOptions.branch || 'Chưa chọn'}</div>
          </div>
        ),
        duration: 2
      });

      return newOptions
    })
  }

  function getThirdPart(name) {
    if (!name) return '';
    const parts = name.split(' - ');
    return parts.length >= 3 ? parts[2] : name;
  }

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
      <Breadcum
        content={[
          {
            label: (
              <>
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" style={{ display: 'inline', verticalAlign: 'middle' }}>
                  <path d="M3 10.75L12 4l9 6.75" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4.5 10.75V19a1 1 0 001 1h3.5v-4.25a1 1 0 011-1h2a1 1 0 011 1V20H18.5a1 1 0 001-1v-8.25" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="ml-1">Trang chủ</span>
              </>
            ),
            onClick: () => navigate(routePath.home)
          },
          {
            label: product.category || 'Danh mục',
            onClick: () => { },
          },
          {
            label: getThirdPart(product.name),
            onClick: () => { },
            active: true
          }
        ]}
      />
      <h2 className="m-0 font-bold text-2xl mb-5">{loading ? <Skeleton.Input active size="default" style={{ width: 200 }} /> : getThirdPart(product.name)}</h2>
      <Row gutter={24}>
        <Col xs={24} md={14}>
          <div
            className={`flex flex-col lg:flex-row gap-5 text-white rounded-lg p-8 mb-4 md:animate-shake`}
            style={{
              background: 'linear-gradient(135deg, #FF8F2Ccc 0%, #FF9231b3 60%, #FFD8B0cc 100%)'
            }}
          >
            <div className="w-full md:w-[300px] h-[250px] bg-gray-200 rounded-xl mb-4 lg:mb-0 flex items-center justify-center overflow-hidden">
              {loading ? (
                <Skeleton.Image style={{ width: 300, height: 250 }} active />
              ) : Array.isArray(product.image) && product.image.length > 0 ? (
                <img
                  src={product.image[selectedImage]}
                  alt={product.name}
                  className="rounded-lg object-cover w-full h-full"
                />
              ) : (
                <span className="text-gray-300">No Image</span>
              )}
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <div className="!font-semibold !text-[21px] mb-2 text-center lg:text-left">TÍNH NĂNG NỔI BẬT</div>
              <ul className="m-0 pl-4 list-none">
                <li>Chống ồn chủ động với bộ xử lý HD QN2e, cảm nhận âm thanh môi trường hoặc tai</li>
                <li>Bộ màng loa Dynamic Driver X giúp tái tạo âm thanh chi tiết, mạnh mẽ, sống động</li>
                <li>Tối ưu hóa âm thanh cho nhiều tình huống thực tế, tự động điều chỉnh EQ</li>
                <li>Chống nước nhẹ, thời lượng pin dài, chất liệu thân thiện cho thao tác chuyển động dễ dàng</li>
              </ul>
            </div>
          </div>
          <div className="flex gap-2 mb-4">
            {loading
              ? Array(3).fill(0).map((_, idx) => (
                  <Skeleton.Image key={idx} style={{ width: 60, height: 60 }} active />
                ))
              : Array.isArray(product.image) && product.image.length > 1 && product.image.map((img, idx) => (
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

        <Col xs={24} md={10}>
          <div className="flex items-baseline gap-4 mb-4">
            <span
              className={`text-orange-600 font-bold ${
                isSmall ? 'text-[24px]' : 'text-[50px]'
              }`}
            >
              {loading ? <Skeleton.Input active size="large" style={{ width: 120 }} /> : `${product.Ban_Le_Value?.toLocaleString('vi-VN')} ₫`}
            </span>
            <span
              className={`text-gray-300 line-through ${
                isSmall ? 'text-[14px]' : 'text-[28px]'
              }`}
            >
              {loading ? <Skeleton.Input active size="default" style={{ width: 80 }} /> : product.Ban_Le?.toLocaleString('vi-VN')}
            </span>
          </div>
          
          {/* Color Options */}
          <div className="mb-3">
            <div className="font-semibold mb-1">Màu sắc</div>
            <div className="flex gap-2">
              {loading
                ? Array(2).fill(0).map((_, idx) => (
                    <Skeleton.Button key={idx} active size="small" style={{ width: 60 }} />
                  ))
                : (Array.isArray(product.color) ? product.color : [product.color]).map((color, idx) => (
                    <span 
                      key={idx} 
                      className={`rounded-md px-4 py-1 font-medium cursor-pointer ${
                        selectedOptions.color === color 
                          ? 'bg-orange-500 text-white border-none'
                          : 'border border-gray-300 bg-white'
                      }`}
                      onClick={() => handleSelectOption('color', color)}
                    >
                      {color}
                    </span>
                  ))}
            </div>
          </div>
          
          {/* Condition Options */}
          <div className="mb-3">
            <div className="font-semibold mb-1">Tình trạng</div>
            <div className="flex gap-2">
              {loading
                ? <Skeleton.Button active size="small" style={{ width: 80 }} />
                : <span 
                    className={`rounded-md px-4 py-1 font-medium cursor-pointer ${
                      selectedOptions.condition === product.Product_condition
                        ? 'bg-orange-500 text-white border-none'
                        : 'border border-[#999999] bg-white text-gray-700'
                    }`}
                    onClick={() => handleSelectOption('condition', product.Product_condition)}
                  >
                    {product.Product_condition}
                  </span>
              }
            </div>
          </div>
          
          {/* Stock Info */}
          <div className="mb-3">
            <div className="font-semibold mb-1">Chi nhánh mua hàng</div>
            <div className="flex gap-4">
              {loading
                ? Array(2).fill(0).map((_, idx) => (
                    <Skeleton.Button key={idx} active size="large" style={{ width: 120, height: 60 }} />
                  ))
                : <>
                    <div 
                      className={`rounded-lg p-2 text-center cursor-pointer ${
                        selectedOptions.branch === 'HÀ NỘI'
                          ? 'bg-orange-500 text-white border-none'
                          : 'border border-[#999999] bg-white'
                      }`}
                      onClick={() => handleSelectOption('branch', 'HÀ NỘI')}
                    >
                      <div className='font-semibold'>HÀ NỘI</div>
                      <div className="font-semibold">Zalo: 0333.571.236</div>
                    </div>
                    <div 
                      className={`rounded-lg p-2 text-center cursor-pointer ${
                        selectedOptions.branch === 'ĐÀ NẴNG'
                          ? 'bg-orange-500 text-white border-none'
                          : 'border border-[#999999] bg-white'
                      }`}
                      onClick={() => handleSelectOption('branch', 'ĐÀ NẴNG')}
                    >
                      <div className='font-semibold'>ĐÀ NẴNG</div>
                      <div className="font-semibold">Zalo: 0333.571.236</div>
                    </div>
                  </>
              }
            </div>
          </div>
        </Col>
      </Row>

      <h1>Sản phẩm tương tự</h1>
      <div>
        <Row gutter={24}>
          {loading
            ? Array(4).fill(0).map((_, idx) => (
                <Col xs={24} md={8} lg={6} key={idx} className="mt-4">
                  <Skeleton active avatar paragraph={{ rows: 4 }} />
                </Col>
              ))
            : relatedProducts.map((item, idx) => (
                <Col xs={24} md={8} lg={6} key={item.id || idx} className="mt-4">
                  <ProductCard
                    product={item}
                    onClickCard={() => setLoading(true)}
                  />
                </Col>
              ))}
        </Row>
      </div>

      <Row gutter={24} className="mt-8">
        <Col xs={24} md={14} className="bg-white py-4">
          <div className="text-black text-base mb-2 bg-gray-200 p-3 rounded-md">
            <h3 className="text-lg text-orange-400 text-center font-semibold mb-2">Mô tả sản phẩm</h3>
            {loading ? (
              <Skeleton active paragraph={{ rows: 4 }} />
            ) : (
              product.description || 'Chưa cập nhật mô tả sản phẩm...'
            )}
          </div>
        </Col>

        <Col xs={24} md={10} className="">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Thông tin sản phẩm</h3>
            {loading ? (
              <Skeleton
                active
                paragraph={{ rows: 8, width: ['60%', '40%', '50%', '70%', '60%', '50%', '40%', '60%'] }}
              />
            ) : (
              <table className="w-full text-gray-700 text-base [&>tbody>tr>td]:px-3 [&>tbody>tr>td]:py-2 [&>tbody>tr>th]:px-3 [&>tbody>tr>th]:py-2">
                <tbody>
                  <tr className="odd:bg-gray-100">
                    <td className="font-bold pr-2 w-1/3">Thương hiệu:</td>
                    <td>{product.brand || 'Chưa cập nhật'}</td>
                  </tr>
                  <tr className="odd:bg-gray-100">
                    <td className="font-bold py-1 pr-2">Model:</td>
                    <td className="py-1">{product.model || 'Chưa cập nhật'}</td>
                  </tr>
                  <tr className="odd:bg-gray-100">
                    <td className="font-bold py-1 pr-2">Trọng lượng:</td>
                    <td className="py-1">{product.weight ? `${product.weight}g` : 'Chưa cập nhật'}</td>
                  </tr>
                  <tr className="odd:bg-gray-100">
                    <td className="font-bold py-1 pr-2">Kích thước:</td>
                    <td className="py-1">{product.size || 'Chưa cập nhật'}</td>
                  </tr>
                  <tr className="odd:bg-gray-100">
                    <td className="font-bold py-1 pr-2">Giá nhập:</td>
                    <td className="py-1">{product.importPrice ? `${product.importPrice.toLocaleString('vi-VN')} ₫` : 'Chưa cập nhật'}</td>
                  </tr>
                  <tr className="odd:bg-gray-100">
                    <td className="font-bold py-1 pr-2">Tags:</td>
                    <td className="py-1">{product.tags || 'Chưa cập nhật'}</td>
                  </tr>
                  <tr className="odd:bg-gray-100">
                    <td className="font-bold py-1 pr-2">Mã danh mục:</td>
                    <td className="py-1">{product.category_code || 'Chưa cập nhật'}</td>
                  </tr>
                  <tr className="odd:bg-gray-100">
                    <td className="font-bold py-1 pr-2">Loại sản phẩm:</td>
                    <td className="py-1">{product.category || 'Chưa cập nhật'}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default ProductDetail