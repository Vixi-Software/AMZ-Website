import React from 'react'
import { Row, Col, Input, Button, Typography, Space } from 'antd'
import { SearchOutlined, EnvironmentOutlined, PhoneOutlined, ThunderboltOutlined, DollarCircleOutlined, HeartOutlined } from '@ant-design/icons'

const { Text, Link } = Typography

function Header() {
  return (
    <div className="p-0">
      <div className="bg-orange-50 py-1">
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
      <Row justify="space-between" align="middle" className="max-w-[1400px] mx-auto py-4 px-8">
        {/* Logo */}
        <Col>
          <img
            src="https://png.pngtree.com/element_our/sm/20180415/sm_5ad31d9b53530.jpg"
            alt="Logo"
            className="w-[100px] h-[100px] rounded-full object-cover"
          />
        </Col>
        {/* Search bar */}
        <Col flex="auto" className="px-8">
          <Input
            size="large"
            placeholder="Hôm nay bạn muốn tìm kiếm gì?"
            suffix={
              <Button
                type="primary"
                icon={<SearchOutlined className="text-[#F37021]" />}
                style={{ background: '#fff', color: '#F37021', border: '1px solid #F37021' }}
              >
                Tìm kiếm
              </Button>
            }
            className="rounded-full bg-gray-50"
          />
          <div className="mt-1">
            <span className="text-gray-500 text-xs">
              Từ khoá xu hướng&nbsp;
              <a className="hover:underline text-blue-500 cursor-pointer"> Sony WF-1000XM5 </a>
              <a className="hover:underline text-blue-500 cursor-pointer"> Sony WF-1000XM4 </a>
              <a className="hover:underline text-blue-500 cursor-pointer"> Bose QC2 </a>
            </span>
          </div>
        </Col>
        {/* Contact */}
        <Col>
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
    </div>
  )
}

export default Header