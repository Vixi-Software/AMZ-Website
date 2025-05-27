import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Drawer, Button } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import routePath from '../constants/routePath';

const { Header, Content, Footer, Sider } = Layout;

// Custom hook để check mobile
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isMobile;
}

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Trang chủ', 'home', <PieChartOutlined />),
  getItem('Sản phẩm', 'products', <DesktopOutlined />),
  getItem('Bài viết', 'posts', <FileOutlined />, [
    getItem('Danh sách bài viết', 'post-list'),
    getItem('Thêm bài viết', 'add-post'),
    getItem('Sửa bài viết', 'edit-post'),
  ]),
];

function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate(); // Thêm dòng này
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Hàm xử lý chuyển trang
  const handleMenuClick = ({ key }) => {
    // Tùy chỉnh đường dẫn theo key
    switch (key) {
      case 'home':
        navigate(routePath.admin);
        break;
      case 'products':
        navigate(routePath.adminProduct);
        break;
      case 'posts':
        navigate(routePath.adminPost);
        break;
      case 'add-post':
        navigate(routePath.adminPostAdd);
        break;
      case 'edit-post':
        navigate(routePath.adminPostEdit);
        break;
      case 'post-list':
        navigate(routePath.adminPost);
        break;
      default:
        break;
    }
    if (isMobile) setDrawerOpen(false);
  };

  // Map pathname sang breadcrumb
  const breadcrumbMap = {
    [routePath.admin]: [{ title: 'Trang chủ' }],
    [routePath.adminProduct]: [{ title: 'Sản phẩm' }],
    [routePath.adminPost]: [{ title: 'Bài viết' }],
    [routePath.adminPostAdd]: [{ title: 'Bài viết' }, { title: 'Thêm bài viết' }],
    [routePath.adminPostEdit]: [{ title: 'Bài viết' }, { title: 'Sửa bài viết' }],
  };

  const breadcrumbs = breadcrumbMap[location.pathname] || [{ title: 'Trang chủ' }];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar cho desktop */}
      {!isMobile && (
        <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
          <div
            className={`demo-logo-vertical flex p-2 items-center transition-all duration-300 ${
              collapsed ? 'justify-center' : ''
            }`}
          >
            <img
              src="https://png.pngtree.com/element_our/sm/20180415/sm_5ad31d9b53530.jpg"
              alt="logo"
              className={`rounded-full object-cover ${
                collapsed ? 'w-[40px] h-[40px]' : 'w-[30px] h-[30px] md:w-[50px] md:h-[50px]'
              }`}
            />
            {!collapsed && (
              <span className="text-white text-lg font-bold ml-2 hidden md:block">AMZ</span>
            )}
          </div>
          <Menu
            theme="dark"
            defaultSelectedKeys={['1']}
            mode="inline"
            items={items}
            onClick={handleMenuClick} // Thêm dòng này
          />
        </Sider>
      )}

      {/* Drawer cho mobile */}
      {isMobile && (
        <Drawer
          title={
            <div className="flex items-center">
              <img
                src="https://png.pngtree.com/element_our/sm/20180415/sm_5ad31d9b53530.jpg"
                alt="logo"
                className="w-[30px] h-[30px] rounded-full object-cover mr-2"
              />
              <span className="font-bold">AMZ</span>
            </div>
          }
          placement="left"
          onClose={() => setDrawerOpen(false)}
          open={drawerOpen}
          bodyStyle={{ padding: 0 }}
        >
          <Menu
            theme="light"
            defaultSelectedKeys={['1']}
            mode="inline"
            items={items}
            onClick={handleMenuClick} // Thêm dòng này
          />
        </Drawer>
      )}

      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', alignItems: 'center' }}>
          {/* Nút mở Drawer trên mobile */}
          {isMobile && (
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setDrawerOpen(true)}
              style={{ fontSize: 20, marginLeft: 16 }}
            />
          )}
        </Header>
        <Content
          style={{
            margin: '0 16px',
            height: 'calc(100vh - 64px)',
            overflow: 'hidden',
          }}
        >
          <Breadcrumb style={{ margin: '16px 0' }} items={breadcrumbs} />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              height: 'calc(100% - 56px)',
              overflow: 'auto',
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;