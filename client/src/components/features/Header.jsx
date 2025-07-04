import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Input, Button, Typography, Space, Drawer, AutoComplete, Dropdown, Menu, Grid } from 'antd'
import { MenuOutlined, SearchOutlined, EnvironmentOutlined, PhoneOutlined, ThunderboltOutlined, DollarCircleOutlined, HeartOutlined, ClockCircleOutlined, TruckOutlined } from '@ant-design/icons'
import { useProductHelper } from '../../utils/productHelper'
import { setProduct } from '../../store/features/product/productSlice'
import { useNavigate, useLocation } from 'react-router-dom'
import routePath from '../../constants/routePath'
import AMZLogo from '../../assets/amzLogo.jpg'
import images from '../../utils/images'
import { setCategory } from '../../store/features/filterProduct/filterProductSlice'
import SideBarProduct from './SideBarProduct'
const { Text, Link } = Typography

function Header() {
  const screens = Grid.useBreakpoint()
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const { searchProductsByName, getProductById, getRandomProducts } = useProductHelper()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const home = useSelector(state => state.settings.home);


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
            {item.salePrice
              ? `${item.name.split(' - ')[2]} ${item.Ban_Le} - ${(item.salePrice*item.Ban_Le_Value)/100}`
              : `${item.name.split(' - ')[2]} - ${item.Ban_Le}`
            }
          </div>
        ),
        item,
      }))
    )
  }

  const handleSelect = async (value, option) => {
    const productId = option.item.id
    const product = await getProductById(productId)
    dispatch(setProduct(product))
    navigate(routePath.productDetail)
  }

  const storeMenu = (
    <Menu>
      <Menu.Item key="danang">
        <a
          href="https://www.google.com/maps/place/C%E1%BB%ADa+h%C3%A0ng+Loa,+Tai+nghe,+Ph%E1%BB%A5+ki%E1%BB%87n+c%C3%B4ng+ngh%E1%BB%87+ch%C3%ADnh+h%C3%A3ng+t%E1%BA%A1i+%C4%90%C3%A0+N%E1%BA%B5ng+-+AMZ+TECH/@16.0659671,108.2281222,1044m/data=!3m1!1e3!4m6!3m5!1s0x3142192ac74d5237:0x84d4e7e69dfa4254!8m2!3d16.0659379!4d108.2307203!16s%2Fg%2F11s66cyymc?entry=tts&g_ep=EgoyMDI1MDYxMC4xIPu8ASoASAFQAw%3D%3D&skid=7260499d-3c77-4e0e-9874-2b3580162dd1"
          target="_blank"
          rel="noopener noreferrer"
        >
          Đà Nẵng
        </a>
      </Menu.Item>
      <Menu.Item key="hanoi">
        <a
          href="https://www.google.com/maps/place/AMZ+TECH+H%C3%A0+N%E1%BB%99i+-+C%E1%BB%ADa+h%C3%A0ng+Loa,+Tai+nghe,+ph%E1%BB%A5+ki%E1%BB%87n+%C4%91i%E1%BB%87n+t%E1%BB%AD+ch%C3%ADnh+h%C3%A3ng/@21.0116923,105.8087566,1015m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3135ab0177a9de8d:0xe820380dfd55f75e!8m2!3d21.0116873!4d105.8113315!16s%2Fg%2F11y7d2ybyn?entry=tts&g_ep=EgoyMDI1MDYxMC4xIPu8ASoASAFQAw%3D%3D&skid=2e1bc059-883e-4ffc-a81c-c3534459e4f5"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hà Nội
        </a>
      </Menu.Item>
    </Menu>
  )

  // Thêm các item từ Sidebar
  const mainItems = [
    {
      icon: <img src={images['item11.png']} alt="" width={30} height={30} />,
      label: "Tai nghe nhét tai cũ",
      value: "tai nghe",
    },
    {
      icon: <img src={images['item10.png']} alt="" width={30} height={30} />,
      label: "Tai nghe chụp tai cũ",
      value: "Tai nghe cắm dây",
    },
    {
      icon: <img src={images['item9.png']} alt="" width={30} height={30} />,
      label: "Loa di động cũ",
      value: "Loa di động",
    },
    {
      icon: <img src={images['item8.png']} alt="" width={30} height={30} />,
      label: "Loa để bàn cũ",
      value: "Loa để bàn",
    },
    {
      icon: <img src={images['item7.png']} alt="" width={30} height={30} />,
      label: "Loa karaoke cũ",
      value: "Loa",
    },
    {
      icon: <img src={images['item6.png']} alt="" width={30} height={30} />,
      label: "Thu cũ đổi mới",
      value: "thu-cu-doi-moi",
    },
  ]

  const exploreItems = [
    {
      icon: <img src={images['item5.png']} alt="" width={30} height={30} />,
      label: "Hàng newseal",
    },
    {
      icon: <img src={images['item4.png']} alt="" width={30} height={30} />,
      label: "Khuyến mãi hot",
    },
    {
      icon: <img src={images['item3.png']} alt="" width={30} height={30} />,
      label: "Bảo hành",
    },
    {
      icon: <img src={images['item2.png']} alt="" width={30} height={30} />,
      label: "Reviews",
    },
    {
      icon: <img src={images['item1.png']} alt="" width={30} height={30} />,
      label: "Sửa chữa",
    },
  ]

  // Dummy data for brands, priceRanges, and needs (replace with real data as needed)
  const brands = [
    'Acnos',
    'Alpha Works',
    'Anker',
    'Bang & Olufsen',
    'Baseus',
    'Beats',
    'Bose',
    'Harman Kardon',
    'JBL',
    'Klipsch',
    'Marshall',
    'Others',
    'Sennheiser',
    'Skullcandy',
    'Sony',
    'Ultimate Ears'
  ]
  const priceRanges = [
    { value: [0, 1000000], label: 'Dưới 1 triệu đồng' },
    { value: [1000000, 2000000], label: 'Từ 1 triệu - 2 triệu' },
    { value: [2000000, 3000000], label: 'Từ 2 triệu - 3 triệu' },
    { value: [3000000, 5000000], label: 'Từ 3 triệu - 5 triệu' },
    { value: [5000000, null], label: 'Trên 5 triệu' },
  ]
  const needs = [
    { value: 'chongon', label: 'Chống ồn' },
    { value: 'xuyendam', label: 'Xuyên âm' },
    { value: 'mic', label: 'Có micro đàm thoại' },
    { value: 'nghegoitot', label: 'Nghe gọi tốt' },
    { value: 'tapthethao', label: 'Tập luyện thể thao' },
    { value: 'chongnuoc', label: 'Chống nước, chống bụi' },
    { value: 'choigame', label: 'Chơi game' },
    { value: 'nghenhac', label: 'Nghe nhạc trữ tình' },
    { value: 'nghenhacso', label: 'Nghe nhạc sôi động' },
  ]

<<<<<<< HEAD
  const trendingKeywords = [
    "Sony WF-1000XM5",
    "Sony WF-1000XM4",
    "Bose QC2"
  ]

  // Các phần ngoài logo và search bar
=======
>>>>>>> fix-admin
  const drawerContent = (
    <div>
      {location.pathname === '/product' ? (
        <SideBarProduct brands={brands} priceRanges={priceRanges} needs={needs} forceShow={true} />
      ) : (
        <Space size="large" direction="vertical" className="w-full">
          <Space>
            <Dropdown overlay={storeMenu} trigger={['click']}>
              <span className="text-[#F37021] cursor-pointer">
                <EnvironmentOutlined style={{ color: '#F37021', fontSize: '1.125rem' }} /> Tìm cửa hàng
              </span>
            </Dropdown>
          </Space>
          <Space>
            <PhoneOutlined style={{ color: '#F37021', fontSize: '1.125rem' }} />
            <a
              href="https://zalo.me/0333571236"
              target="_blank"
              rel="noopener noreferrer"
              className="!text-[#F37021] inline-block"
              style={{ textDecoration: 'none' }}
            >
              Zalo: 0333.571.236
            </a>
          </Space>
          <div className="mt-2">
            <h3 className='mb-2 font-bold'>Từ khoá xu hướng&nbsp;</h3>
            <span className="text-gray-500 text-xs flex flex-col gap-1">
              {home.trendingKeywords && home.trendingKeywords.map((keyword, idx) => (
                <a
                  key={idx}
                  className="hover:underline !text-black cursor-pointer mx-1 !text-[12px]"
                  onClick={() => {
                    setSearchValue(keyword)
                    handleSearch(keyword)
                  }}
                >
                  {keyword}
                </a>
              ))}
            </span>
          </div>
          <div className="rounded-lg mb-4">
            <div className="font-semibold text-[16px] text-gray-700 mb-2 tracking-wide">
              Hàng cũ giá tốt - Sản phẩm chính
            </div>
            <div className="flex flex-col gap-3">
              {mainItems.map((item, idx) => (
                <div
                  key={idx}
                  className="w-full flex items-center gap-3 text-[15px] text-gray-800 rounded py-1 cursor-pointer transition-all duration-200 group hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 hover:scale-[1.03] hover:shadow-md"
                  onClick={() => {
                    setOpen(false)
                    if (item.value === "thu-cu-doi-moi") {
                      navigate(routePath.exchange)
                    } else {
                      dispatch(setCategory(item.value))
                      navigate(routePath.product)
                    }
                  }}
                >
                  <span className="transition-transform duration-200 group-hover:scale-110">
                    {item.icon}
                  </span>
                  <span className="transition-colors duration-200 group-hover:text-blue-700 font-semibold text-[16px]">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg">
            <div className="font-semibold text-[16px] text-gray-700 mb-2 tracking-wide">
              Khám phá thêm
            </div>
            <div className="flex flex-col gap-3">
              {exploreItems.map((item, idx) => (
                <div
                  key={idx}
                  className="w-full flex items-center gap-3 text-[15px] text-gray-800 rounded py-1 cursor-pointer transition-all duration-200 group hover:bg-gradient-to-r hover:from-pink-100 hover:to-yellow-100 hover:scale-[1.03] hover:shadow-md"
                  onClick={() => {
                    setOpen(false)
                    if (item.label === "Khuyến mãi hot") {
                      navigate(routePath.sale)
                    }
                  }}
                >
                  <span className="transition-transform duration-200 group-hover:scale-110">
                    {item.icon}
                  </span>
                  <span className="transition-colors duration-200 group-hover:text-pink-700 font-semibold text-[16px]">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Space>
<<<<<<< HEAD
        <Space>
          <PhoneOutlined style={{ color: '#F37021', fontSize: '1.125rem' }} />
          <span className="text-[#F37021]">Zalo: 0333.571.236</span>
        </Space>
        <div className="mt-2">
          <h3
            className="mb-2 font-bold text-base"
            style={{ color: '#F37021', }}
          >
            Từ khoá xu hướng&nbsp;
          </h3>
          <span className="text-gray-500 text-xs flex flex-col gap-1">
            {trendingKeywords.map((kw, idx) => (
              <span key={kw}>
                <a className="hover:underline text-blue-500 cursor-pointer">{kw}</a>
                {idx < trendingKeywords.length - 1 && <span>, </span>}
              </span>
            ))}
          </span>
        </div>
      </Space>
=======
      )}
>>>>>>> fix-admin
    </div>
  )

  return (
    <div className="p-0 z-[100] relative">
      <div className="bg-orange-50 py-1 hidden lg:block">
        <Row justify="space-between" align="middle" className="max-w-[1400px] mx-auto px-8">
          <Col>
            <span className="text-[#F37021] font-medium text-base flex items-center gap-1">
              <ClockCircleOutlined className="text-[#F37021]" style={{ fontSize: '16px' }} />
              THU CŨ ĐỔI MỚI - LÊN ĐỜI SIÊU PHẨM
            </span>
          </Col>
          <Col>
            <span className="text-[#F37021] font-medium text-base flex items-center gap-1">
              <DollarCircleOutlined className="text-[#F37021]" style={{ fontSize: '16px' }} />
              HÀNG CŨ GIÁ RẺ - BẢO HÀNH SIÊU LÂU
            </span>
          </Col>
          <Col>
            <span className="text-[#F37021] font-medium text-base flex items-center gap-1">
              <TruckOutlined className="text-[#F37021]" style={{ fontSize: '16px' }} />
              BÁN HÀNG CÓ TÂM - VẬN CHUYỂN CÓ TẦM
            </span>
          </Col>
        </Row>
      </div>
      <Row justify="space-between" align="middle" className="max-w-[1400px] mx-auto py-4 px-4 md:px-8">
        <Col xs={0} sm={4} md={3} lg={2}>
          <img
            src={AMZLogo}
            alt="Logo"
            onClick={() => navigate(routePath.home)}
            className="hidden sm:block w-[60px] h-[60px] md:w-[100px] md:h-[100px] rounded-full object-cover"
          />
        </Col>
<<<<<<< HEAD
        {/* Search bar */}
        <Col flex="auto" className="px-4 md:px-8">
          <Input
            size="large"
            placeholder="Hôm nay bạn muốn tìm kiếm gì?"
            suffix={
              <>
                <Button
                  type="text"
                  icon={<SearchOutlined className="text-[#F37021]" />}
                  style={{ background: '#fff', color: '#F37021' }}
                >
                  <span className="hidden md:inline">Tìm kiếm</span>
                </Button>
              </>
            }
            className="rounded-full bg-gray-50"
            style={{ border: '1px solid #F37021' }}
          />
          <div className="mt-1 hidden md:block">
            <span className="text-[#F37021] font-bold text-base" >
              Từ khoá xu hướng&nbsp;
            </span>
            <span className="text-gray-500 text-xs">
              {trendingKeywords.map((kw, idx) => (
                <span key={kw}>
                  <a className="hover:underline text-blue-500 cursor-pointer">{kw}</a>
                  {idx < trendingKeywords.length - 1 && <span>, </span>}
                </span>
=======
        <Col xs={24} sm={20} md={21} lg={14} flex="auto" className="px-0 md:px-8">
          <div className="flex items-center gap-2">
            {!screens.sm && (
              <Button
                type="text"
                icon={<MenuOutlined style={{ fontSize: 24, color: '#F37021' }} />}
                onClick={() => setOpen(true)}
                className="flex items-center"
              />
            )}
            <div className="flex-1">
              <AutoComplete
                value={searchValue}
                options={options}
                style={{ width: '100%' }}
                onSearch={handleSearch}
                onChange={setSearchValue}
                onSelect={handleSelect}
                className="rounded-full bg-gray-50"
                popupClassName="w-full"
                open={options.length > 0 && searchValue.length > 0}
              >
                <Input
                  size="large"
                  placeholder="Hôm nay bạn muốn tìm kiếm gì?"
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
            </div>
          </div>
          <div className="mt-6 hidden md:block">
            <span className="!text-[20px] text-[#D65312] font-normal mr-1">
              Từ khoá xu hướng
            </span>
            <span className="text-gray-500 text-xs">
              {home.trendingKeywords && home.trendingKeywords.map((keyword, idx) => (
                <a
                  key={idx}
                  className="hover:underline !text-black cursor-pointer mx-1 !text-[12px]"
                  onClick={() => {
                    setSearchValue(keyword)
                    handleSearch(keyword)
                  }}
                >
                  {keyword}
                </a>
>>>>>>> fix-admin
              ))}
            </span>
          </div>
        </Col>
        {/* Contact: chỉ hiện trên md trở lên */}
        <Col xs={0} sm={0} md={7} lg={6} className="hidden lg:block">
          <div className='!mt-[-25px]  hidden lg:block'>
            <Space>
              <Dropdown overlay={storeMenu} trigger={['click']}>
                <span className="text-[#F37021] inline-block cursor-pointer">
                  <EnvironmentOutlined style={{ color: '#F37021', fontSize: '1.125rem' }} /> Tìm cửa hàng
                </span>
              </Dropdown>
            </Space>
            <Space className='ml-4'>
              <PhoneOutlined style={{ color: '#F37021', fontSize: '1.125rem' }} />
              <a
                href="https://zalo.me/0333571236"
                target="_blank"
                rel="noopener noreferrer"
                className="!text-[#F37021] inline-block"
                style={{ textDecoration: 'none' }}
              >
                Zalo: 0333.571.236
              </a>
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