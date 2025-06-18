import React, { useState } from 'react'
import { Form, Input, InputNumber, Select, Button, Row, Col, message, Switch } from 'antd'
import { useProductService } from '../../../services/productService'

const { TextArea } = Input

const statusOptions = [
  { label: 'Hiển thị trên website', value: 'active' },
  { label: 'Ẩn trên website', value: 'inactive' }
]

const productTypeOptions = [
  { label: 'Loa di động cũ', value: 'Loa di động cũ' },
  { label: 'Loa karaoke cũ', value: 'Loa karaoke cũ' },
  { label: 'Loa để bàn cũ', value: 'Loa để bàn cũ' },
  { label: 'Tai nghe chụp tai cũ', value: 'Tai nghe chụp tai cũ' },
  { label: 'Tai nghe nhét tai cũ', value: 'Tai nghe nhét tai cũ' },
]

const brandOptions = [
  { label: 'Acnos', value: 'Acnos' },
  { label: 'Alpha Works', value: 'Alpha Works' },
  { label: 'Anker', value: 'Anker' },
  { label: 'Bang&Olufsen', value: 'Bang&Olufsen' },
  { label: 'Baseus', value: 'Baseus' },
  { label: 'Beats', value: 'Beats' },
  { label: 'Bose', value: 'Bose' },
  { label: 'Harman Kardon', value: 'Harman Kardon' },
  { label: 'JBL', value: 'JBL' },
  { label: 'Klipsch', value: 'Klipsch' },
  { label: 'Marshall', value: 'Marshall' },
  { label: 'Others', value: 'Others' },
  { label: 'Sennheiser', value: 'Sennheiser' },
  { label: 'Skullcandy', value: 'Skullcandy' },
  { label: 'Sony', value: 'Sony' },
  { label: 'Ultimate Ears', value: 'Ultimate Ears' },
]

const statusSellOptions = [
  { label: '99-98% Nobox', value: '99-98% Nobox' },
  { label: '99-98% Fullbox', value: '99-98% Fullbox' },
  { label: 'New Seal', value: 'New Seal' },
]

// Thêm mảng màu sắc phổ biến
const colorOptions = [
  { label: 'Đen', value: 'Đen', color: '#000000' },
  { label: 'Trắng', value: 'Trắng', color: '#FFFFFF' },
  { label: 'Đỏ', value: 'Đỏ', color: '#FF0000' },
  { label: 'Đỏ đô', value: 'Đỏ đô', color: '#8B0000' },
  { label: 'Xanh dương', value: 'Xanh dương', color: '#0074D9' },
  { label: 'Xanh navy', value: 'Xanh navy', color: '#001F3F' },
  { label: 'Xanh lá', value: 'Xanh lá', color: '#2ECC40' },
  { label: 'Xanh rêu', value: 'Xanh rêu', color: '#556B2F' },
  { label: 'Vàng', value: 'Vàng', color: '#FFDC00' },
  { label: 'Vàng gold', value: 'Vàng gold', color: '#FFD700' },
  { label: 'Cam', value: 'Cam', color: '#FF851B' },
  { label: 'Tím', value: 'Tím', color: '#B10DC9' },
  { label: 'Tím pastel', value: 'Tím pastel', color: '#D1B3FF' },
  { label: 'Hồng', value: 'Hồng', color: '#FF69B4' },
  { label: 'Hồng pastel', value: 'Hồng pastel', color: '#FFD1DC' },
  { label: 'Xám', value: 'Xám', color: '#AAAAAA' },
  { label: 'Xám đậm', value: 'Xám đậm', color: '#555555' },
  { label: 'Bạc', value: 'Bạc', color: '#C0C0C0' },
  { label: 'Nâu', value: 'Nâu', color: '#8B4513' },
  { label: 'Be', value: 'Be', color: '#F5F5DC' },
  { label: 'Xanh ngọc', value: 'Xanh ngọc', color: '#40E0D0' },
  { label: 'Xanh mint', value: 'Xanh mint', color: '#AAF0D1' },
  { label: 'Xanh lam', value: 'Xanh lam', color: '#4682B4' },
  { label: 'Xanh pastel', value: 'Xanh pastel', color: '#B2F9FC' },
  { label: 'Khác', value: 'Khác', color: '#888888' },
]

function ProductForm({ initialValues = {} }) {
  const [tableRows, setTableRows] = useState([{ key: '', value: '' }])
  const { addProduct } = useProductService()

  const handleAddRow = () => {
    setTableRows([...tableRows, { key: '', value: '' }])
  }

  const handleRowChange = (index, field, val) => {
    const newRows = [...tableRows]
    newRows[index][field] = val
    setTableRows(newRows)
  }

  const renderTableRows = () => (
    tableRows.map((row, idx) => (
      <Row gutter={8} key={idx} style={{ marginBottom: 8 }}>
        <Col span={11}>
          <Input
            placeholder="Tên thuộc tính"
            value={row.key}
            onChange={e => handleRowChange(idx, 'key', e.target.value)}
          />
        </Col>
        <Col span={11}>
          <Input
            placeholder="Giá trị"
            value={row.value}
            onChange={e => handleRowChange(idx, 'value', e.target.value)}
          />
        </Col>
      </Row>
    ))
  )

  const convertRowsToHtmlTable = () => {
    if (!tableRows.length) return ''
    let html = '<table className="w-full border border-gray-200 rounded">'
    tableRows.forEach((row, idx) => { 
      if (row.key || row.value) {
        html += `<tr${idx % 2 === 1 ? ' className="bg-gray-100"' : ''}>`
        html += `<td className="font-bold border px-2 py-1">${row.key}</td>`
        html += `<td className="border px-2 py-1">${row.value}</td>`
        html += '</tr>'
      }
    })
    html += '</table>'
    return html
  }

  const handleFinish = async (values) => {
    const result = {
      ...values,
      product_type: values.category, // Gán product_type giống category
      tags: typeof values.tags === 'string' ? values.tags : (Array.isArray(values.tags) ? values.tags.join(',') : ''),
      images: values.images || [],
      colors: values.colors || [],
      statusSell: values.statusSell || [],
      pricesBanBuon: values.pricesBanBuon || 0,
      pricesBanLe: values.pricesBanLe || 0,
      inventories: values.inventories || 0,
      sku: values.sku || '',
      tableInfo: convertRowsToHtmlTable(),
      isbestSeller: !!values.isbestSeller, // Thêm dòng này
    }
    try {
      await addProduct(result)
      message.success('Thêm sản phẩm thành công!')
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      message.error('Thêm sản phẩm thất bại!')
    }
  }

  return (
    <Form
      layout="vertical"
      initialValues={initialValues}
      style={{ maxWidth: 800 }}
      onFinish={handleFinish}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Tên sản phẩm" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Trạng thái" name="status" rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}>
            <Select options={statusOptions} />
          </Form.Item>
        </Col>
      </Row>

      {/* Thêm trường bán chạy */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Bán chạy" name="isbestSeller" valuePropName="checked">
            <Switch checkedChildren="Có" unCheckedChildren="Không" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Màu sắc" name="colors" rules={[{ required: true, message: 'Vui lòng nhập màu sắc' }]}>
            <Select
              mode="multiple"
              placeholder="Chọn màu sắc"
              optionLabelProp="label"
              options={colorOptions.map(opt => ({
                ...opt,
                label: (
                  <span>
                    <span style={{
                      display: 'inline-block',
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      background: opt.color,
                      border: '1px solid #ccc',
                      marginRight: 8,
                      verticalAlign: 'middle'
                    }} />
                    {opt.label}
                  </span>
                )
              }))}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Tình trạng bán" name="statusSell" rules={[{ required: true, message: 'Vui lòng nhập tình trạng bán' }]}>
            <Select
              mode="multiple"
              placeholder="Chọn tình trạng bán"
              options={statusSellOptions}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Giá bán buôn"
            name="pricesBanBuon"
            rules={[
              { required: true, message: 'Vui lòng nhập giá bán buôn' },
              { type: 'number', min: 0, message: 'Chỉ nhập số lớn hơn hoặc bằng 0' }
            ]}
          >
            <InputNumber
              min={0}
              style={{ width: '100%' }}
              formatter={value => `${value}`.replace(/[^0-9]/g, '')}
              parser={value => value.replace(/[^0-9]/g, '')}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Giá bán lẻ"
            name="pricesBanLe"
            rules={[
              { required: true, message: 'Vui lòng nhập giá bán lẻ' },
              { type: 'number', min: 0, message: 'Chỉ nhập số lớn hơn hoặc bằng 0' }
            ]}
          >
            <InputNumber
              min={0}
              style={{ width: '100%' }}
              formatter={value => `${value}`.replace(/[^0-9]/g, '')}
              parser={value => value.replace(/[^0-9]/g, '')}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Tồn kho" name="inventories" rules={[{ required: true, message: 'Vui lòng nhập tồn kho' }]}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Thương hiệu" name="brand" rules={[{ required: true, message: 'Vui lòng chọn thương hiệu' }]}>
            <Select options={brandOptions} showSearch placeholder="Chọn thương hiệu" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Danh mục" name="category" rules={[{ required: true, message: 'Vui lòng chọn loại sản phẩm' }]}>
            <Select options={productTypeOptions} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Tags" name="tags">
            <Input placeholder="Nhập tags, cách nhau bởi dấu phẩy" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Mô tả" name="description">
            <TextArea rows={3} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label="Hình ảnh" name="images">
        <Select
          mode="tags"
          style={{ width: '100%' }}
          placeholder="Nhập link hình ảnh, Enter để thêm"
          tokenSeparators={[',', ' ']}
        />
      </Form.Item>

      {/* Thông số kỹ thuật dạng bảng 2 cột */}
      <Form.Item label="Thông tin thêm">
        {renderTableRows()}
        <Button type="dashed" onClick={handleAddRow} style={{ marginTop: 8 }}>
          Thêm hàng
        </Button>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Lưu sản phẩm
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ProductForm