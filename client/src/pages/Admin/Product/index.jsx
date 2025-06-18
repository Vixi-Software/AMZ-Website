import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CTable from '../../../components/ui/table'
import { useProductService } from '../../../services/productService'
import routepath from '../../../constants/routePath'
import { message, Modal, Form, Input, InputNumber, Select, Row, Col, Button, Switch } from 'antd'
import { useFirestore } from '../../../hooks/useFirestore'
import { db } from '../../../utils/firebase'
import TextArea from 'antd/es/input/TextArea'
const columns = [
  {
    title: 'Tên sản phẩm',
    dataIndex: 'name',
    enableSort: true,
    enableFilter: true,
    filterType: 'text',
    render: (text, record) =>
      record.isbestSeller ? (
        <span style={{ color: '#faad14', fontWeight: 'bold' }}>{text} <span style={{ fontSize: 12 }}>🔥</span></span>
      ) : (
        <span>{text}</span>
      ),
  },
  {
    title: 'Giá',
    dataIndex: 'pricesBanLe',
    enableSort: true,
    enableFilter: true,
    filterType: 'numberRange',
    render: (value) =>
      value !== undefined
        ? value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
        : '',
  },
  {
    title: 'Danh mục',
    dataIndex: 'category',
    enableFilter: true,
    filterType: 'select',
  },
  {
    title: 'Tình trạng',
    dataIndex: 'statusSell',
    enableSort: true,
    enableFilter: true,
    filterType: 'select',
  },
  {
    title: 'Màu sắc',
    dataIndex: 'colors',
    enableSort: true,
    enableFilter: true,
    filterType: 'select',
  },
]

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

function ProductManagement() {
  const { getAllProducts } = useProductService();
  const [data, setData] = React.useState([]);
  const navigate = useNavigate();
  const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);
  const [editModalOpen, setEditModalOpen] = React.useState(false)
  const [editProduct, setEditProduct] = React.useState(null)
  const [form] = Form.useForm(); // Thêm dòng này
  const [formFields, setFormFields] = useState([]); // Thêm state này
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewProduct, setViewProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await getAllProducts();
      setData(result || []);
    };
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Hàm parse tableInfo HTML thành mảng [{ key, value }]
  function parseTableInfo(html) {
    if (!html) return [{ key: '', value: '' }]
    const rowRegex = /<tr.*?>(.*?)<\/tr>/g
    const cellRegex = /<td.*?>(.*?)<\/td>/g
    const rows = []
    let rowMatch
    while ((rowMatch = rowRegex.exec(html))) {
      const cells = []
      let cellMatch
      while ((cellMatch = cellRegex.exec(rowMatch[1]))) {
        // Loại bỏ tag HTML nếu có
        const text = cellMatch[1].replace(/<.*?>/g, '').trim()
        cells.push(text)
      }
      if (cells.length === 2) {
        rows.push({ key: cells[0], value: cells[1] })
      }
    }
    return rows.length ? rows : [{ key: '', value: '' }]
  }

  // Khi mở modal sửa, chuyển dữ liệu sang fields
  useEffect(() => {
    if (editModalOpen && editProduct) {
      const fields = [
        { name: ['name'], value: editProduct.name || '' },
        { name: ['status'], value: editProduct.status || '' },
        { name: ['colors'], value: editProduct.colors || [] },
        { name: ['statusSell'], value: editProduct.statusSell || [] },
        { name: ['pricesBanBuon'], value: editProduct.pricesBanBuon || 0 },
        { name: ['pricesBanLe'], value: editProduct.pricesBanLe || 0 },
        { name: ['inventories'], value: editProduct.inventories || 0 },
        { name: ['brand'], value: editProduct.brand || '' },
        { name: ['category'], value: editProduct.category || '' },
        { name: ['tags'], value: Array.isArray(editProduct.tags) ? editProduct.tags.join(',') : (editProduct.tags || '') },
        { name: ['description'], value: editProduct.description || '' },
        { name: ['images'], value: editProduct.images || [] },
        { name: ['isbestSeller'], value: !!editProduct.isbestSeller }, // Thêm dòng này
        // ...thêm các field khác nếu cần...
      ];
      setFormFields(fields);

      // Parse tableInfo để set lại tableRows
      setTableRows(parseTableInfo(editProduct.tableInfo));
    }
  }, [editModalOpen, editProduct]);

  const [tableRows, setTableRows] = useState([{ key: '', value: '' }])
  const { updateDocData, deleteDocData } = useFirestore(db, 'productStore')

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
    let html = `<table style="width:100%; border-collapse:collapse; border:1px solid #ccc;">`
    tableRows.forEach((row, idx) => {
      if (row.key || row.value) {
        html += `<tr${idx % 2 === 1 ? ' style="background:#f9f9f9;"' : ''}>`
        html += `<td style="font-weight:bold; border:1px solid #ccc; padding:4px 8px;">${row.key}</td>`
        html += `<td style="border:1px solid #ccc; padding:4px 8px;">${row.value}</td>`
        html += '</tr>'
      }
    })
    html += '</table>'
    return html
  }

  const handleFinish = async (values) => {
    const result = {
      ...values,
      product_type: values.category,
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
      await updateDocData(editProduct.id, result)
      message.success('Sửa sản phẩm thành công!')
      setEditModalOpen(false)
      form.resetFields()
      // Cập nhật lại danh sách sản phẩm
      const updatedList = await getAllProducts();
      setData(updatedList || []);
      setSelectedRowKeys([]);
      setEditProduct(null);
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      message.error('Sửa sản phẩm thất bại!')
    }
  }

  return (
    <div>
      <CTable
        columns={columns}
        dataSource={data}
        onRowSelectionChange={(selectedRowKeys) => {
          setSelectedRowKeys(selectedRowKeys)
          console.log('Selected row keys:', selectedRowKeys)
        }}
        actions={[
          {
            key: 'add',
            label: 'Thêm sản phẩm',
            type: 'primary',
            className: '!bg-green-500 !text-white',
            onClick: () => navigate(routepath.adminProductAdd),
          },
          {
            key: 'edit',
            label: 'Sửa',
            type: 'primary',
            className: '!bg-blue-500 !text-white',
            disabled: selectedRowKeys.length !== 1, // Chỉ cho sửa khi chọn 1 sản phẩm
            onClick: () => {
              if (selectedRowKeys.length === 1) {
                setEditProduct(selectedRowKeys[0])
                setEditModalOpen(true)
              }
            },
          },
          {
            key: 'delete',
            label: 'Xóa',
            type: 'primary',
            danger: true,
            className: '!bg-red-500 !text-white',
            disabled: selectedRowKeys.length === 0,
            onClick: () => {
              Modal.confirm({
                title: 'Xác nhận xóa',
                content: `Bạn có chắc chắn muốn xóa ${selectedRowKeys.length} sản phẩm này không?`,
                okText: 'Xóa',
                okType: 'danger',
                cancelText: 'Hủy',
                async onOk() {
                  try {
                    for (const product of selectedRowKeys) {
                      await deleteDocData(product.id || product); // product có thể là object hoặc id
                    }
                    message.success('Xóa sản phẩm thành công!');
                    // Cập nhật lại danh sách sản phẩm
                    const updatedList = await getAllProducts();
                    setData(updatedList || []);
                    setSelectedRowKeys([]);
                  // eslint-disable-next-line no-unused-vars
                  } catch (err) {
                    message.error('Xóa sản phẩm thất bại!');
                  }
                }
              });
            },
          },
          {
            key: 'view',
            label: 'Xem chi tiết',
            type: 'default',
            className: '!bg-gray-200 !text-black',
            disabled: selectedRowKeys.length !== 1,
            onClick: () => {
              if (selectedRowKeys.length === 1) {
                setViewProduct(selectedRowKeys[0]);
                setViewModalOpen(true);
              }
            },
          },
          {
            key: 'best-seller',
            label: 'Đánh dấu bán chạy',
            type: 'dashed',
            className: '!text-yellow-500 !border-yellow-500',
            disabled: selectedRowKeys.length === 0, // Cho phép chọn nhiều
            onClick: async () => {
              if (selectedRowKeys.length > 0) {
                try {
                  for (const product of selectedRowKeys) {
                    // Nếu đã là bestSeller thì bỏ qua
                    if (product.isbestSeller === true) continue;
                    await updateDocData(product.id || product, { isbestSeller: true });
                  }
                  message.success('Đã đánh dấu sản phẩm bán chạy!');
                  // Cập nhật lại danh sách sản phẩm
                  const updatedList = await getAllProducts();
                  setData(updatedList || []);
                // eslint-disable-next-line no-unused-vars
                } catch (err) {
                  message.error('Đánh dấu bán chạy thất bại!');
                }
              }
            },
          },
          {
            key: 'sync',
            label: 'Đồng bộ',
            type: 'default',
            className: '!bg-purple-500 !text-white', // Thêm class
            onClick: () => alert('Đồng bộ sản phẩm'),
          },
        ]}
      />

      <Modal
        open={editModalOpen}
        title="Chỉnh sửa sản phẩm"
        footer={null}
        onCancel={() => {
          setEditModalOpen(false);
          form.resetFields();
          setFormFields([]); // reset fields
        }}
        destroyOnClose
        width={900}
      >
        <Form
          form={form}
          layout="vertical"
          style={{ maxWidth: 800 }}
          onFinish={handleFinish}
          fields={formFields} // Thêm dòng này
          onFieldsChange={(_, allFields) => setFormFields(allFields)} // Thêm dòng này
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

          {/* Thêm trường chỉnh sửa isbestSeller */}
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
      </Modal>

      <Modal
        open={viewModalOpen}
        title="Chi tiết sản phẩm"
        footer={null}
        onCancel={() => setViewModalOpen(false)}
        width={900}
      >
        {viewProduct && (
          <div style={{ maxWidth: 800 }}>
            <Row gutter={16}>
              <Col span={12}><b>Tên sản phẩm:</b> {viewProduct.name}</Col>
              <Col span={12}><b>Trạng thái:</b> {viewProduct.status}</Col>
            </Row>
            <Row gutter={16} style={{ marginTop: 12 }}>
              <Col span={12}>
                <b>Bán chạy:</b>{' '}
                {viewProduct.isbestSeller ? (
                  <span style={{ color: '#faad14', fontWeight: 'bold' }}>Có</span>
                ) : (
                  <span>Không</span>
                )}
              </Col>
            </Row>
            <Row gutter={16} style={{ marginTop: 12 }}>
              <Col span={12}><b>Màu sắc:</b>{' '}
                {Array.isArray(viewProduct.colors) && viewProduct.colors.length > 0
                  ? viewProduct.colors.map((color, idx) => (
                    <span key={idx} style={{
                      display: 'inline-block',
                      background: '#f0f0f0',
                      borderRadius: 8,
                      padding: '2px 10px',
                      marginRight: 6,
                      marginBottom: 4,
                      border: '1px solid #ddd',
                    }}>{color}</span>
                  ))
                  : '-'}
              </Col>
              <Col span={12}>
                <b>Tình trạng bán:</b>{' '}
                {Array.isArray(viewProduct.statusSell) && viewProduct.statusSell.length > 0
                  ? viewProduct.statusSell.map((status, idx) => (
                    <span key={idx} style={{
                      display: 'inline-block',
                      background: '#e6f7ff',
                      borderRadius: 8,
                      padding: '2px 10px',
                      marginRight: 6,
                      marginBottom: 4,
                      border: '1px solid #91d5ff',
                    }}>{status}</span>
                  ))
                  : '-'}
              </Col>
            </Row>
            <Row gutter={16} style={{ marginTop: 12 }}>
              <Col span={12}><b>Giá bán buôn:</b> {viewProduct.pricesBanBuon?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Col>
              <Col span={12}><b>Giá bán lẻ:</b> {viewProduct.pricesBanLe?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Col>
            </Row>
            <Row gutter={16} style={{ marginTop: 12 }}>
              <Col span={12}><b>Tồn kho:</b> {viewProduct.inventories}</Col>
              <Col span={12}><b>Thương hiệu:</b> {viewProduct.brand}</Col>
            </Row>
            <Row gutter={16} style={{ marginTop: 12 }}>
              <Col span={12}><b>Danh mục:</b> {viewProduct.category}</Col>
              <Col span={12}>
                <b>Tags:</b>{' '}
                {viewProduct.tags
                  ? viewProduct.tags.toString().split(',').map((tag, idx) => (
                    <span key={idx} style={{
                      display: 'inline-block',
                      background: '#fffbe6',
                      borderRadius: 8,
                      padding: '2px 10px',
                      marginRight: 6,
                      marginBottom: 4,
                      border: '1px solid #ffe58f',
                    }}>{tag.trim()}</span>
                  ))
                  : '-'}
              </Col>
            </Row>
            <Row gutter={16} style={{ marginTop: 12 }}>
              <Col span={24}><b>Mô tả:</b> {viewProduct.description}</Col>
            </Row>
            <Row gutter={16} style={{ marginTop: 12 }}>
              <Col span={24}>
                <b>Hình ảnh:</b>
                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 8 }}>
                  {viewProduct.images?.map((img, idx) => (
                    <div key={idx} style={{ marginRight: 8, marginBottom: 8 }}>
                      <img src={img} alt={`Hình ảnh sản phẩm ${idx + 1}`} style={{ maxWidth: 100, maxHeight: 100, objectFit: 'cover', borderRadius: 8, border: '1px solid #eee' }} />
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
            <Row gutter={16} style={{ marginTop: 12 }}>
              <Col span={24}>
                <b>Thông tin thêm:</b>
                <div style={{ marginTop: 8 }}>
                  {(() => {
                    const rows = parseTableInfo(viewProduct.tableInfo);
                    if (!rows.length || (rows.length === 1 && !rows[0].key && !rows[0].value)) {
                      return <span>-</span>;
                    }
                    return (
                      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ccc' }}>
                        <tbody>
                          {rows.map((row, idx) => (
                            <tr key={idx} style={idx % 2 === 1 ? { background: '#f9f9f9' } : {}}>
                              <td style={{ fontWeight: 'bold', border: '1px solid #ccc', padding: '4px 8px' }}>{row.key}</td>
                              <td style={{ border: '1px solid #ccc', padding: '4px 8px' }}>{row.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    );
                  })()}
                </div>
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default ProductManagement