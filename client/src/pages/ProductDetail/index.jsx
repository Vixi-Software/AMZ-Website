import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Grid, Skeleton } from 'antd'
import ProductCard from '../../components/features/ProductCard'
import { useProductHelper } from '../../utils/productHelper'
import { useNavigate } from 'react-router-dom'
import routePath from '../../constants/routePath'
import Breadcum from '../../components/features/Breadcum'
import { setCategory, resetFilter } from '../../store/features/filterProduct/filterProductSlice'

function ProductDetail() {
  const product = useSelector(state => state.product.product)
  const [selectedImage, setSelectedImage] = useState(0)
  const [relatedProducts, setRelatedProducts] = useState([])
  const { getProductsByCategory } = useProductHelper()
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const screens = Grid.useBreakpoint();
  const isSmall = screens.md === false

  const [selectedOptions, setSelectedOptions] = useState({
    color: null,
    condition: null,
    branch: null
  })
  const [loading, setLoading] = useState(true);

  console.log('ProductDetail render', product)

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
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
      return newOptions
    })
  }

  function getThirdPart(name) {
    if (!name) return '';
    const parts = name.split(' - ');
    return parts.length >= 3 ? parts[2] : name;
  }

  // --- SỬA ĐỔI DỮ LIỆU ĐẦU VÀO CHO PHÙ HỢP ---
  // Chuẩn hóa các trường dữ liệu để tương thích với UI cũ
  const images = product?.images || product?.image || []
  const colors = product?.colors || product?.color || []
  const price = product?.pricesBanLe || product?.Ban_Le_Value
  const priceOld = product?.pricesBanBuon || product?.Ban_Le
  const productCondition = product?.statusSell?.[0]
  // --------------------------------------------

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
            onClick: () => {
              dispatch(resetFilter());
              dispatch(setCategory(product.category));
              navigate(routePath.product);
            },
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
              ) : Array.isArray(images) && images.length > 0 ? (
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="rounded-lg object-cover w-full h-full"
                />
              ) : (
                <span className="text-gray-300">No Image</span>
              )}
            </div>
            <div className="flex-1 flex flex-col">
              <div className="!font-semibold !text-[21px] mb-2 text-center lg:text-center">TÍNH NĂNG NỔI BẬT</div>
              <ul className="m-0 pl-4 pr-4 list-none text-justify">
                {loading ? (
                  Array(4).fill(0).map((_, idx) => (
                    <li key={idx} className="mb-2"><Skeleton.Input active size="small" style={{ width: 200 }} /></li>
                  ))
                ) : (
                  (product.highlights
                    ? product.highlights.split('\n').map((line, idx) => (
                      <li key={idx} className="mb-2">{line}</li>
                    ))
                    : <li className="mb-2">Chưa cập nhật tính năng nổi bật...</li>
                  )
                )}
              </ul>
            </div>
          </div>
          <div className="flex gap-2 mb-4">
            {loading
              ? Array(3).fill(0).map((_, idx) => (
                <Skeleton.Image key={idx} style={{ width: 60, height: 60 }} active />
              ))
              : Array.isArray(images) && images.length > 1 && images.map((img, idx) => (
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
              className={`text-orange-600 font-bold ${isSmall ? 'text-[24px]' : 'text-[50px]'
                }`}
            >
              {loading ? <Skeleton.Input active size="large" style={{ width: 120 }} /> : `${price?.toLocaleString('vi-VN')} ₫`}
            </span>
            <span
              className={`text-gray-300 line-through ${isSmall ? 'text-[14px]' : 'text-[28px]'
                }`}
            >
              {loading ? <Skeleton.Input active size="default" style={{ width: 80 }} /> : priceOld ? priceOld.toLocaleString('vi-VN') : ''}
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
                : (Array.isArray(colors) ? colors : [colors]).map((color, idx) => (
                  <span
                    key={idx}
                    className={`rounded-md px-4 py-1 font-medium cursor-pointer ${selectedOptions.color === color
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
                  className={`rounded-md px-4 py-1 font-medium cursor-pointer ${selectedOptions.condition === productCondition
                      ? 'bg-orange-500 text-white border-none'
                      : 'border border-[#999999] bg-white text-gray-700'
                    }`}
                  onClick={() => handleSelectOption('condition', productCondition)}
                >
                  {productCondition}
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
                    className={`rounded-lg p-2 text-center cursor-pointer ${selectedOptions.branch === 'HÀ NỘI'
                        ? 'bg-orange-500 text-white border'
                        : 'border border-[#999999] bg-white'
                      }`}
                    onClick={() => handleSelectOption('branch', 'HÀ NỘI')}
                  >
                    <div className='font-semibold'>HÀ NỘI</div>
                    <div className="font-semibold">Zalo: 0333.571.236</div>
                  </div>
                  <div
                    className={`rounded-lg p-2 text-center cursor-pointer ${selectedOptions.branch === 'ĐÀ NẴNG'
                        ? 'bg-orange-500 text-white border'
                        : 'border border-[#999999] bg-white'
                      }`}
                    onClick={() => handleSelectOption('branch', 'ĐÀ NẴNG')}
                  >
                    <div className='font-semibold'>ĐÀ NẴNG</div>
                    <div className="font-semibold">Zalo: 0935.241.243</div>
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
              product.tableInfo
                ? <div dangerouslySetInnerHTML={{ __html: product.tableInfo }} />
                : <div>Chưa cập nhật thông tin sản phẩm...</div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default ProductDetail