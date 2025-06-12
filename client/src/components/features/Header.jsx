import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Input, Button, Typography, Space, Drawer, AutoComplete, Dropdown, Menu, Grid } from 'antd'
import { MenuOutlined, SearchOutlined, EnvironmentOutlined, PhoneOutlined, ThunderboltOutlined, DollarCircleOutlined, HeartOutlined, ClockCircleOutlined, TruckOutlined } from '@ant-design/icons'
import { useProductHelper } from '../../utils/productHelper'
import { setProduct } from '../../store/features/product/productSlice'
import { useNavigate, useLocation } from 'react-router-dom'
import routePath from '../../constants/routePath' // Đường dẫn đến trang sản phẩm
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

  // Thêm menu cho dropdown
  const storeMenu = (
    <Menu>
      <Menu.Item key="danang">
        <a
          href="https://www.google.com/maps?ll=16.065962,108.230697&z=15&t=m&hl=en-US&gl=US&mapclient=embed&q=14+Nguy%E1%BB%85n+Th%C3%B4ng+An+H%E1%BA%A3i+Trung+S%C6%A1n+Tr%C3%A0+%C4%90%C3%A0+N%E1%BA%B5ng+550000"
          target="_blank"
          rel="noopener noreferrer"
        >
          Đà Nẵng
        </a>
      </Menu.Item>
      <Menu.Item key="hanoi">
        <a
          href="https://www.google.com/maps/place/Ng.+92+P.+L%C3%A1ng+H%E1%BA%A1%2F2+P.+L%C3%A1ng+H%E1%BA%A1,+L%C3%A1ng+H%E1%BA%A1,+%C4%90%E1%BB%91ng+%C4%90a,+H%C3%A0+N%E1%BB%99i+100000,+Vietnam/@21.011749,105.81131,15z/data=!4m6!3m5!1s0x3135ab61f85c5cc9:0x2da404cace140350!8m2!3d21.011749!4d105.8113096!16s%2Fg%2F11xdg2w_y1?hl=en-US&entry=ttu&g_ep=EgoyMDI1MDYwOS4wIKXMDSoASAFQAw%3D%3D"
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

  // Các phần ngoài logo và search bar
  const drawerContent = (
    <div>
      {/* Nếu đang ở /product thì hiển thị SideBarProduct */}
      {location.pathname === '/product' ? (
        <SideBarProduct brands={brands} priceRanges={priceRanges} needs={needs} forceShow={true}/>
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
              {randomProducts && randomProducts.map((item) => (
                <a
                  key={item.id}
                  className="hover:underline text-blue-500 cursor-pointer"
                  onClick={async () => {
                    const product = await getProductById(item.id)
                    dispatch(setProduct(product))
                    navigate(routePath.productDetail)
                    setOpen(false)
                  }}
                >
                  {item.name.split(' - ')[2] || item.name}
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
      )}
    </div>
  )

  return (
    <div className="p-0">
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
              BÁN HÀNG CÓ TÂM - VẬN CHUYỂN CÓ TÂM
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
              {randomProducts && randomProducts.map((item) => (
                <a
                  key={item.id}
                  className="hover:underline !text-black cursor-pointer mx-1 !text-[12px]"
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