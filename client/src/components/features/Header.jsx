import React from 'react'
import { Layout, Row, Col, Input, Button, Typography, Space } from 'antd'
import { SearchOutlined, EnvironmentOutlined, PhoneOutlined } from '@ant-design/icons'

const { Text, Link } = Typography

function Header() {
  return (
    <div style={{ background: '#fff', padding: 0, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
      <div style={{ background: '#FFF3E6', padding: '4px 0' }}>
        <Row justify="space-between" align="middle" style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px' }}>
          <Col>
            <Space size="large">
              <Text style={{ color: '#F37021', fontWeight: 500, fontSize: 14 }}>
                THU CŨ ĐỔI MỚI - LÊN ĐỜI SIÊU PHẨM
              </Text>
              <Text style={{ color: '#F37021', fontWeight: 500, fontSize: 14 }}>
                HÀNG CŨ GIÁ RẺ - BẢO HÀNH SIÊU LÂU
              </Text>
            </Space>
          </Col>
          <Col>
            <Text style={{ color: '#F37021', fontWeight: 500, fontSize: 14 }}>
              BÁN HÀNG CÓ TÂM - VẬN CHUYỂN CÓ TÂM
            </Text>
          </Col>
        </Row>
      </div>
      {/* Main header */}
      <Row justify="space-between" align="middle" style={{ maxWidth: 1400, margin: '0 auto', padding: '16px 32px' }}>
        {/* Logo */}
        <Col>
          <img src="https://png.pngtree.com/element_our/sm/20180415/sm_5ad31d9b53530.jpg" alt="Logo" style={{ width: 100, height: 100, borderRadius: '50%' }} />
        </Col>
        {/* Search bar */}
        <Col flex="auto" style={{ padding: '0 32px' }}>
          <Input
            size="large"
            placeholder="Hôm nay bạn muốn tìm kiếm gì?"
            suffix={
              <Button type="primary" icon={<SearchOutlined />} style={{ background: '#fff', color: '#F37021', border: '1px solid #F37021' }}>
                Tìm kiếm
              </Button>
            }
            style={{ borderRadius: 24, background: '#fafafa' }}
          />
          <div style={{ marginTop: 4 }}>
            <Text type="secondary" style={{ fontSize: 13 }}>
              Từ khoá xu hướng&nbsp;
              <Link> Sony WF-1000XM5 </Link>
              <Link> Sony WF-1000XM4 </Link>
              <Link> Bose QC2 </Link>
            </Text>
          </div>
        </Col>
        {/* Contact */}
        <Col>
          <Space size="large">
            <Space>
              <EnvironmentOutlined style={{ color: '#F37021', fontSize: 18 }} />
              <Text style={{ color: '#F37021' }}>Tìm cửa hàng</Text>
            </Space>
            <Space>
              <PhoneOutlined style={{ color: '#F37021', fontSize: 18 }} />
              <Text style={{ color: '#F37021' }}>Zalo: 0333.571.236</Text>
            </Space>
          </Space>
        </Col>
      </Row>
    </div>
  )
}

export default Header