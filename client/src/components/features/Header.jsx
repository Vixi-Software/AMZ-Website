import React, { useState, useRef, useEffect } from 'react'
import { Row, Col, Input, Button, Typography, Space, Drawer, AutoComplete, Spin } from 'antd'
import { MenuOutlined, SearchOutlined, EnvironmentOutlined, PhoneOutlined, ThunderboltOutlined, DollarCircleOutlined, HeartOutlined } from '@ant-design/icons'
import { searchProductsByName } from '../../utils/database'
import { useFirestore } from '../../hooks/useFirestore'
import { db } from '../../utils/firebase'

const { Text, Link } = Typography

function Header() {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [selectedOption, setSelectedOption] = useState(null)
  const debounceRef = useRef(null)

  const { getDocById } = useFirestore(db, "products"); // <-- Pass db and collection name

  // Lấy từ khóa xu hướng từ localStorage
  const trendingKeywords = JSON.parse(localStorage.getItem("top5ProductNames")) || []

  // Debounce thủ công
  const handleSearch = (value) => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (!value) {
      setOptions([])
      return
    }
    setLoading(true)
    debounceRef.current = setTimeout(async () => {
      try {
        const results = await searchProductsByName(value)
        setOptions(
          results.map(item => ({
            value: item.name,
            id: String(item.id), // Đảm bảo id là string
            label: (
              <div className="flex items-center gap-2">
                {/* <img src={item.image} alt={item.name} className="w-8 h-8 object-cover rounded" /> */}
                <span>{item.name}</span>
              </div>
            ),
          }))
        )
      } catch {
        setOptions([])
      }
      setLoading(false)
    }, 400)
  }

  useEffect(() => {
    if (selectedOption && selectedOption.id) {
      getDocById(selectedOption.id)
        .then(doc => {
          // Xử lý doc ở đây nếu cần
          console.log(doc)
        })
        .catch(() => {
          // Xử lý lỗi nếu cần
        })
    }
  }, [getDocById, selectedOption])

  const handleSelect = (value) => {
    const selected = options.find(opt => opt.value === value)
    setSelectedOption(selected || null)
  }

  const handleSearchButton = async () => {
    const selected = options.find(opt => opt.value === searchValue)
    if (selected && selected.id) {
      const doc = await getDocById(selected.id)
      console.log(doc)
    } else {
      // Nếu không có id, có thể log tên sản phẩm
      console.log("Search:", searchValue)
    }
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
            src="https://png.pngtree.com/element_our/sm/20180415/sm_5ad31d9b53530.jpg"
            alt="Logo"
            className="w-[60px] h-[60px] md:w-[100px] md:h-[100px] rounded-full object-cover"
          />
        </Col>
        {/* Search bar */}
        <Col flex="auto" className="px-4 md:px-8">
          <AutoComplete
            style={{ width: '100%' }}
            options={options}
            onSearch={handleSearch}
            onSelect={handleSelect}
            value={searchValue}
            onChange={setSearchValue}
            notFoundContent={loading ? <Spin size="small" /> : null}
            placeholder="Hôm nay bạn muốn tìm kiếm gì?"
            className="rounded-full bg-gray-50 shadow-sm"
          >
            <Input
              size="large"
              suffix={
                <Button
                  type="text"
                  icon={<SearchOutlined className="text-[#F37021]" />}
                  style={{ background: '#fff', color: '#F37021' }}
                  onClick={handleSearchButton}
                >
                  <span className="hidden md:inline">Tìm kiếm</span>
                </Button>
              }
              style={{
                border: '1px solid #F37021',
                outline: 'none',
                boxShadow: 'none',
                paddingTop: 10,
                paddingBottom: 10,
                height: 48
              }}
            />
          </AutoComplete>
          <div className="mt-4 hidden md:block">
            <span className="text-[#F37021] font-bold text-base" >
              Từ khoá xu hướng&nbsp;
            </span>
            <span className="text-gray-500 text-xs">
              {trendingKeywords.map((kw, idx) => (
                <span key={kw}>
                  <a className="hover:underline text-blue-500 cursor-pointer">{kw}</a>
                  {idx < trendingKeywords.length - 1 && <span>, </span>}
                </span>
              ))}
            </span>
          </div>
        </Col>
        {/* Contact: chỉ hiện trên md trở lên */}
        <Col className="hidden md:block">
          <Space size="large">
            <Space>
              <EnvironmentOutlined style={{ color: '#F37021', fontSize: '1.125rem' }} />
              <span className="text-[#F37021]">Tìm cửa hàng</span>
            </Space>
            <Space>
              <PhoneOutlined style={{ color: '#F37021', fontSize: '1.125rem' }} />
              <span className="text-[#F37021]">Zalo: 0333.571.236</span>
            </Space>
          </Space>
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