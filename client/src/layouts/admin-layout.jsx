import React from 'react';
import { Row, Col, Layout, Avatar, Typography } from 'antd';
import SidebarAdmin from '../components/features/SidebarAdmin';

const { Header, Content } = Layout;
const { Text } = Typography;

function AdminLayout({ children }) {
  const userName = "Nguyễn Văn A";
  const avatarUrl = "https://i.pravatar.cc/40";

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: '0 24px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', boxShadow: '0 2px 8px #f0f1f2' }}>
        <Text style={{ marginRight: 12 }}>{userName}</Text>
        <Avatar src={avatarUrl} />
      </Header>
      <Layout>
        <Row style={{ flex: 1, minHeight: 'calc(100vh - 64px)' }}>
          <Col xs={24} sm={6} md={5} lg={4}>
            <SidebarAdmin />
          </Col>
          <Col xs={24} sm={18} md={19} lg={20}>
            <Content style={{ padding: 24 }}>
              {children}
            </Content>
          </Col>
        </Row>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;