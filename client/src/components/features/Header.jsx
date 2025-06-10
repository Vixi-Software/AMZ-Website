import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux' 
import { Row, Col, Input, Button, Typography, Space, Drawer, AutoComplete } from 'antd'
import { MenuOutlined, SearchOutlined, EnvironmentOutlined, PhoneOutlined, ThunderboltOutlined, DollarCircleOutlined, HeartOutlined } from '@ant-design/icons'
import { useProductHelper } from '../../utils/productHelper'
import { setProduct } from '../../store/features/product/productSlice' 
import { useNavigate } from 'react-router-dom'
import routePath from '../../constants/routePath' // Đường dẫn đến trang sản phẩm
import AMZLogo from '../../assets/amzLogo.jpg'
const { Text, Link } = Typography

function Header() {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const { searchProductsByName, getProductById, getRandomProducts } = useProductHelper()
  const dispatch = useDispatch() 
  const navigate = useNavigate()
  const randomProducts = useSelector(state => state.product.randomProducts) // Lấy từ store

  useEffect(() => {
    getRandomProducts(3) // Lấy 3 sản phẩm random khi Header mount
  }, [])

  // Hàm xử lý khi người dùng nhập vào ô tìm kiếm
  const handleSearch = async (value) => {
    setSearchValue(value)
    if (!value) {
      setOptions([])
      return
    }
    const results = await searchProductsByName(value)
    setOptions(
      results.map((item) => ({
        value: item.name,
        label: (
          <div>
            <span>{item.name}</span>
          </div>
        ),
        item, // Lưu object sản phẩm vào option
      }))
    )
  }

  // Khi chọn một giá trị từ AutoComplete
  const handleSelect = async (value, option) => {
    const productId = option.item.id
    const product = await getProductById(productId)
    dispatch(setProduct(product))
    navigate(routePath.productDetail)
  }

  // Các phần ngoài logo và search bar
  const drawerContent = (
    <div>
      <Space size="large" direction="vertical" className="w-full">
        <Space>
          <EnvironmentOutlined style={{ color: '#F37021', fontSize: '1.125rem' }} />
          <span className="text-[#F37021]">Tìm cửa hàng</span>
        </Space>
        <Space>
          <PhoneOutlined style={{ color: '#F37021', fontSize: '1.125rem' }} />
          <span className="text-[#F37021]">Zalo: 0333.571.236</span>
        </Space>
        <div className="mt-2">
          <h3 className='mb-2 font-bold'>Từ khoá xu hướng&nbsp;</h3>
          <span className="text-gray-500 text-xs flex flex-col gap-1">
            <a className="hover:underline text-blue-500 cursor-pointer"> Sony WF-1000XM5 </a>
            <a className="hover:underline text-blue-500 cursor-pointer"> Sony WF-1000XM4 </a>
            <a className="hover:underline text-blue-500 cursor-pointer"> Bose QC2 </a>
          </span>
        </div>
      </Space>
    </div>
  )

  return (
    <div className="p-0">
      {/* Thanh trên cùng: chỉ hiện trên md trở lên */}
      <div className="bg-orange-50 py-1 hidden md:block">
        <Row justify="space-between" align="middle" className="max-w-[1400px] mx-auto px-8">
          <Col>
            <span className="text-[#F37021] font-medium text-sm flex items-center gap-1">
              <ThunderboltOutlined className="text-[#F37021]" />
              THU CŨ ĐỔI MỚI - LÊN ĐỜI SIÊU PHẨM
            </span>
          </Col>
          <Col>
            <span className="text-[#F37021] font-medium text-sm flex items-center gap-1">
              <DollarCircleOutlined className="text-[#F37021]" />
              HÀNG CŨ GIÁ RẺ - BẢO HÀNH SIÊU LÂU
            </span>
          </Col>
          <Col>
            <span className="text-[#F37021] font-medium text-sm flex items-center gap-1">
              <HeartOutlined className="text-[#F37021]" />
              BÁN HÀNG CÓ TÂM - VẬN CHUYỂN CÓ TÂM
            </span>
          </Col>
        </Row>
      </div>
      {/* Main header */}
      <Row justify="space-between" align="middle" className="max-w-[1400px] mx-auto py-4 px-4 md:px-8">
        {/* Hamburger menu: chỉ hiện trên mobile */}
        <Col className="md:hidden flex items-center">
          <Button
            type="text"
            icon={<MenuOutlined style={{ fontSize: 24, color: '#F37021' }} />}
            onClick={() => setOpen(true)}
          />
        </Col>
        {/* Logo */}
        <Col>
          <img
            src={AMZLogo}
            alt="Logo"
            onClick={() => navigate(routePath.home)}
            className="w-[60px] h-[60px] md:w-[100px] md:h-[100px] rounded-full object-cover"
          />
        </Col>
        {/* Search bar */}
        <Col flex="auto" className="px-4 md:px-8">
          <AutoComplete
            value={searchValue}
            options={options}
            style={{ width: '100%' }}
            onSearch={handleSearch}
            onChange={setSearchValue}
            onSelect={handleSelect} 
            placeholder="Hôm nay bạn muốn tìm kiếm gì?"
            className="rounded-full bg-gray-50"
            popupClassName="w-full"
          >
            <Input
              size="large"
              suffix={
                <Button
                  type="text"
                  icon={<SearchOutlined className="text-[#F37021]" />}
                  style={{ background: '#fff', color: '#F37021' }}
                >
                  <span className="hidden md:inline">Tìm kiếm</span>
                </Button>
              }
              style={{ border: '1px solid #F37021' }}
            />
          </AutoComplete>
          <div className="mt-6 hidden md:block">
            <span className="!text-[20px] text-[#D65312] font-semibold mr-1">
              Từ khoá xu hướng
            </span>
            <span className="text-gray-500 text-xs">
              {/* Hiển thị sản phẩm random ngay sau từ khoá xu hướng */}
              {randomProducts && randomProducts.map((item) => (
                <a
                  key={item.id}
                  className="hover:underline !text-black cursor-pointer mx-2 !text-[12px]"
                  onClick={async () => {
                    const product = await getProductById(item.id)
                    dispatch(setProduct(product))
                    navigate(routePath.productDetail)
                  }}
                >
                  {item.name.split(' - ')[2] || item.name}
                </a>
              ))}
            </span>
          </div>
        </Col>
        {/* Contact: chỉ hiện trên md trở lên, đặt cùng hàng với search bar */}
        <Col className="hidden md:block">
          <div className='!mt-[-25px] flex gap-3'>
            <Space>
              <EnvironmentOutlined style={{ color: '#F37021', fontSize: '1.125rem' }} />
              <span className="text-[#F37021]  inline-block">Tìm cửa hàng</span>
            </Space>
            <Space>
              <PhoneOutlined style={{ color: '#F37021', fontSize: '1.125rem' }} />
              <span className="text-[#F37021]  inline-block">Zalo: 0333.571.236</span>
            </Space>
          </div>
        </Col>
      </Row>
      {/* Drawer cho mobile */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setOpen(false)}
        open={open}
        className="md:hidden"
        width={280}
      >
        {drawerContent}
      </Drawer>
    </div>
  )
}

export default Header