import React, { useState } from 'react';
import { Row, Col, Layout, Avatar, Typography, Modal, Form, Input, Button, message } from 'antd';
import SidebarAdmin from '../components/features/SidebarAdmin';
import { useSelector, useDispatch } from 'react-redux';
import { login, clearUser } from '../store/features/auth/authSlice';

<<<<<<< HEAD
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
=======
const { Header, Content } = Layout;
const { Text } = Typography;
>>>>>>> fix-admin

function AdminLayout({ children }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

<<<<<<< HEAD
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
=======
  const [open, setOpen] = useState(!user);

  const [form] = Form.useForm();

  const handleLogin = async () => {
    try {
      const values = await form.validateFields();
      dispatch(login(values));
      setTimeout(() => {
        if (values.username === 'adminAMZ' && values.password === 'adminAMZ') {
          setOpen(false);
          message.success('Đăng nhập thành công!');
        } else {
          message.error('Sai tài khoản hoặc mật khẩu!');
        }
      }, 300);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      // Do nothing
>>>>>>> fix-admin
    }
  };

  const handleLogout = () => {
    dispatch(clearUser());
    setOpen(true);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: '0 24px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', boxShadow: '0 2px 8px #f0f1f2' }}>
        {user && (
          <>
            <Text style={{ marginRight: 12 }}>{user.username}</Text>
            <Avatar src="https://i.pravatar.cc/40" />
            <Button type="link" onClick={handleLogout} style={{ marginLeft: 16 }}>Đăng xuất</Button>
          </>
        )}
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
      <Modal
        open={open}
        title="Đăng nhập Admin"
        closable={false}
        footer={null}
        maskClosable={false}
      >
        <Form form={form} layout="vertical" onFinish={handleLogin}>
          <Form.Item
            label="Tài khoản"
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tài khoản!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
}

export default AdminLayout;