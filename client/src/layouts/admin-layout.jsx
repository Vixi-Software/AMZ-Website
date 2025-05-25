import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [
    getItem('Team 1', '6'),
    getItem('Team 2', '8'),
  ]),
  getItem('Files', '9', <FileOutlined />),
];

function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div className="min-h-screen flex">
      <aside className={`transition-all duration-300 bg-[#001529] ${collapsed ? 'w-16' : 'w-64'} flex flex-col`}>
        <div className="flex p-2 items-center">
          <img
            src="https://png.pngtree.com/element_our/sm/20180415/sm_5ad31d9b53530.jpg"
            alt="logo"
            className="w-[30px] h-[30px] md:w-[50px] md:h-[50px] rounded-full object-cover"
          />
          <span className="text-white text-lg font-bold ml-2 hidden md:block">AMZ</span>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
          className="flex-1"
        />
        <button
          className="text-white p-2 focus:outline-none"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? '>' : '<'}
        </button>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="h-16 px-0" style={{ background: colorBgContainer }} />
        <main className="flex-1 mx-4 overflow-hidden" style={{ height: 'calc(100vh - 64px)' }}>
          <Breadcrumb
            style={{ margin: '16px 0' }}
            items={[{ title: 'User' }, { title: 'Bill' }]}
          />
          <div
            className="p-6 rounded-lg overflow-auto"
            style={{
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              height: 'calc(100% - 56px)',
            }}
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;