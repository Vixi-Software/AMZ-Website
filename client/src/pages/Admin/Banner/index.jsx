import React from 'react'
import { Form, Input, Button, Space, Card, Row, Col } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

function BannerAdmin() {
  const [form] = Form.useForm()

  const onFinish = (values) => {
    console.log('Form values:', values)
    // Xử lý gửi dữ liệu lên server tại đây
  }

  return (
    <div>
      <Form form={form} name="banner_form" onFinish={onFinish} layout="vertical" autoComplete="off">
        {/* Đặt nút Lưu ở trên cùng */}
        <Form.Item style={{ textAlign: '', marginBottom: 24 }}>
          <Button type="primary" htmlType="submit">
            Lưu thay đổi
          </Button>
        </Form.Item>
        <Row gutter={16}>
          {/* Section: Trang chủ */}
          <Col span={8}>
            <Card type="inner" title="Trang chủ" style={{ marginBottom: 16 }}>
              <Form.List name={['home', 'carousel']}>
                {(fields, { add, remove }) => (
                  <div>
                    <label><b>Ảnh Carousel Trang chủ (nhiều ảnh):</b></label>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                          {...restField}
                          name={name}
                          rules={[{ required: true, message: 'Nhập link ảnh carousel trang chủ!' }]}
                        >
                          <Input placeholder="Link ảnh carousel trang chủ" />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Thêm ảnh carousel trang chủ
                      </Button>
                    </Form.Item>
                  </div>
                )}
              </Form.List>
              <Form.Item
                label="Ảnh Banner 1"
                name={['home', 'banner1']}
                rules={[{ required: true, message: 'Nhập link ảnh Banner 1!' }]}
              >
                <Input placeholder="Link ảnh Banner 1" />
              </Form.Item>
              <Form.Item
                label="Ảnh Banner 2"
                name={['home', 'banner2']}
                rules={[{ required: true, message: 'Nhập link ảnh Banner 2!' }]}
              >
                <Input placeholder="Link ảnh Banner 2" />
              </Form.Item>
            </Card>
          </Col>

          {/* Section: Trang sản phẩm */}
          <Col span={8}>
            <Card type="inner" title="Trang sản phẩm" style={{ marginBottom: 16 }}>
              <Form.List name={['product', 'carousel']}>
                {(fields, { add, remove }) => (
                  <div>
                    <label><b>Ảnh Carousel Trang sản phẩm (nhiều ảnh):</b></label>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                          {...restField}
                          name={name}
                          rules={[{ required: true, message: 'Nhập link ảnh carousel trang sản phẩm!' }]}
                        >
                          <Input placeholder="Link ảnh carousel trang sản phẩm" />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Thêm ảnh carousel trang sản phẩm
                      </Button>
                    </Form.Item>
                  </div>
                )}
              </Form.List>
              <Form.Item
                label="Ảnh Banner Trang sản phẩm"
                name={['product', 'banner']}
                rules={[{ required: true, message: 'Nhập link ảnh Banner trang sản phẩm!' }]}
              >
                <Input placeholder="Link ảnh Banner trang sản phẩm" />
              </Form.Item>
            </Card>
          </Col>

          {/* Section: Trang thu cũ đổi mới */}
          <Col span={8}>
            <Card type="inner" title="Trang thu cũ đổi mới" style={{ marginBottom: 16 }}>
              <Form.List name={['exchange', 'carousel']}>
                {(fields, { add, remove }) => (
                  <div>
                    <label><b>Ảnh Carousel Trang thu cũ đổi mới (nhiều ảnh):</b></label>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                          {...restField}
                          name={name}
                          rules={[{ required: true, message: 'Nhập link ảnh carousel trang thu cũ đổi mới!' }]}
                        >
                          <Input placeholder="Link ảnh carousel trang thu cũ đổi mới" />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Thêm ảnh carousel trang thu cũ đổi mới
                      </Button>
                    </Form.Item>
                  </div>
                )}
              </Form.List>
              <Form.Item
                label="Ảnh Banner Trang thu cũ đổi mới"
                name={['exchange', 'banner']}
                rules={[{ required: true, message: 'Nhập link ảnh Banner trang thu cũ đổi mới!' }]}
              >
                <Input placeholder="Link ảnh Banner trang thu cũ đổi mới" />
              </Form.Item>
            </Card>
          </Col>
        </Row>
        {/* Xóa nút Lưu ở cuối form */}
        {/* <Form.Item style={{ textAlign: 'center', marginTop: 24 }}>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </Form.Item> */}
      </Form>
    </div>
  )
}

export default BannerAdmin