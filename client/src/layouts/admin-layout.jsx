import React, { useState } from 'react';
import { Row, Col, Layout, Avatar, Typography, Modal, Form, Input, Button, message } from 'antd';
import SidebarAdmin from '../components/features/SidebarAdmin';
import { useSelector, useDispatch } from 'react-redux';
import { login, clearUser } from '../store/features/auth/authSlice';

const { Header, Content } = Layout;
const { Text } = Typography;

function AdminLayout({ children }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

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