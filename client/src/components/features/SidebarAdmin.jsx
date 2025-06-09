import React from 'react'
import { Layout, Menu } from 'antd'
import {
  AppstoreOutlined,
  FileTextOutlined,
  CalendarOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import routePath from '../../constants/routePath'

const { Sider } = Layout

function SidebarAdmin() {
  const navigate = useNavigate()

  // Map key to route
  const menuKeyToRoute = {
    '1': routePath.adminProductAdd,
    '2': routePath.adminProductEdit,
    '10': routePath.adminProduct, 

    '4': routePath.adminPostAdd,
    '5': routePath.adminPostEdit,
    '11': routePath.adminPost, 

    '7': '/admin/events/add', 
    '8': '/admin/events/edit',
    '12': '/admin/events',
  }

  const handleMenuClick = ({ key }) => {
    const route = menuKeyToRoute[key]
    if (route) {
      navigate(route)
    }
  }

  return (
    <Sider width={300} style={{ minHeight: '100vh', background: '#fff' }}>
      <div className="logo" style={{ margin: 24, fontWeight: 'bold', fontSize: 24 }}>
        AMZ TECH
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1', 'sub2', 'sub3']}
        style={{ fontSize: 16 }}
        onClick={handleMenuClick}
      >
        <Menu.SubMenu key="sub1" icon={<AppstoreOutlined />} title="Quản lý sản phẩm">
          <Menu.Item key="10">Xem sản phẩm</Menu.Item>
          <Menu.Item key="1">Thêm sản phẩm</Menu.Item>
          <Menu.Item key="2">Sửa sản phẩm</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="sub2" icon={<FileTextOutlined />} title="Quản lý bài đăng">
          <Menu.Item key="11">Xem bài đăng</Menu.Item>
          <Menu.Item key="4">Thêm bài đăng</Menu.Item>
          <Menu.Item key="5">Sửa bài đăng</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="sub3" icon={<CalendarOutlined />} title="Quản lý sự kiện">
          <Menu.Item key="12">Xem sự kiện</Menu.Item>
          <Menu.Item key="7">Thêm sự kiện</Menu.Item>
          <Menu.Item key="8">Sửa sự kiện</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Sider>
  )
}

export default SidebarAdmin