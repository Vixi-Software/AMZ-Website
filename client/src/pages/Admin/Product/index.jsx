<<<<<<< HEAD
import { useState, useEffect, useCallback } from 'react'
import CTable from '../../../components/ui/table'
import { useFirestore } from '../../../hooks/useFirestore'
import { db } from '../../../utils/firebase'
import { Modal, Input, Form, message, Upload } from 'antd'
import { cleanAllFromFirebase, syncAllToFirebase, uploadImageToFirebase } from '../../../utils/database'
import { UploadOutlined } from '@ant-design/icons'

const columns = [
  { title: 'Tên', dataIndex: 'name', enableSort: true, enableFilter: true },
  { title: 'Danh mục', dataIndex: 'category', enableSort: true, enableFilter: true },
  { title: 'Mã danh mục', dataIndex: 'category_code', enableSort: true, enableFilter: true },
  { title: 'Thương hiệu', dataIndex: 'brand', enableSort: true, enableFilter: true },
  { title: 'Màu sắc', dataIndex: 'color', enableSort: true, enableFilter: true },
  { title: 'Tình trạng', dataIndex: 'Product_condition', enableSort: true, enableFilter: true },
  { title: 'Barcode', dataIndex: 'Barcode', enableSort: true, enableFilter: true },
  { title: 'Đà Nẵng', dataIndex: 'DaNang', enableSort: true, enableFilter: true },
  { title: 'Hà Nội', dataIndex: 'HaNoi', enableSort: true, enableFilter: true },
  { title: 'Bán lẻ', dataIndex: 'Ban_Le', enableSort: true, enableFilter: true },
  {
    title: 'Image',
    dataIndex: 'image',
    render: (url) => url ? <img src={url} alt="product" style={{ width: 40, height: 40, objectFit: 'cover' }} /> : null,
  },
]


function ProductAdmin() {
  const [selectedRows, setSelectedRows] = useState([])
  const [productsData, setProductsData] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [syncLoading, setSyncLoading] = useState(false)
  const [unsyncLoading, setUnsyncLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)

  const { getAllDocs, addDocData, updateDocData, deleteDocData } = useFirestore(db, 'products')

  useEffect(() => {
    getAllDocs()
      .then(setProductsData)
      .catch(console.error)
  }, [])

  const handleRowSelectionChange = useCallback((selectedRowKeys) => {
    console.log('selectedRowKeys changed:', selectedRowKeys)
    setSelectedRows(selectedRowKeys)
  }, [])

  // Mở modal thêm mới
  const handleAdd = () => {
    setIsEdit(false)
    form.resetFields()
    setModalOpen(true)
  }

  // Mở modal sửa
  const handleEdit = () => {
    if (selectedRows.length !== 1) {
      message.warning('Vui lòng chọn một sản phẩm để chỉnh sửa!')
      return
    }
    const id = selectedRows[0]
    const product = productsData.find(p => String(p.id) === String(id.id))
    if (!product) {
      message.error('Không tìm thấy sản phẩm!')
      return
    }
    setIsEdit(true)
    form.setFieldsValue(product)
    setModalOpen(true)
  }

  // Xử lý submit form
  const handleOk = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      let imageUrl = values.image

      // Nếu có file ảnh, upload lên Firebase Storage
      if (imageFile) {
        imageUrl = await uploadImageToFirebase(imageFile)
      }

      const submitValues = { ...values, image: imageUrl }

      if (isEdit) {
        // Lấy id đúng kiểu string
        const id = typeof selectedRows[0] === 'object' ? String(selectedRows[0].id) : String(selectedRows[0])
        console.log('Submitting values:', submitValues, 'for id:', id)
        await updateDocData(id, submitValues)
        message.success('Cập nhật thành công!')
      } else {
        await addDocData(submitValues)
        message.success('Thêm mới thành công!')
      }
      setModalOpen(false)
      setSelectedRows([])
      setImageFile(null)
      const updated = await getAllDocs()
      setProductsData(updated)
    } catch (err) {
      message.error('Có lỗi xảy ra!', err)
      console.error('Error submitting form:', err)
    } finally {
      setLoading(false)
    }
  }

  // Xóa sản phẩm
  const handleDelete = async () => {
    // Nếu selectedRows là mảng object, lấy id của từng object và ép kiểu string
    const idsToDelete = selectedRows.map(row => typeof row === 'object' ? String(row.id) : String(row))
    Modal.confirm({
      title: 'Bạn có chắc muốn xóa?',
      onOk: async () => {
        await Promise.all(idsToDelete.map(id => deleteDocData(id)))
        message.success('Đã xóa!')
        setSelectedRows([])
        const updated = await getAllDocs()
        setProductsData(updated)
      }
    })
  }

  // Đồng bộ sản phẩm
  const handleSync = async () => {
    setSyncLoading(true)
    try {
      await syncAllToFirebase()
      const updated = await getAllDocs()
      setProductsData(updated)
      message.success('Đồng bộ thành công!')
    } catch (err) {
      message.error('Lỗi khi đồng bộ!', err)
    } finally {
      setSyncLoading(false)
    }
  }

  // Xóa đồng bộ sản phẩm
  const handleUnsync = async () => {
    setUnsyncLoading(true)
    try {
      await cleanAllFromFirebase()
      const updated = await getAllDocs()
      setProductsData(updated)
      message.success('Đã xóa đồng bộ!')
    } catch (err) {
      message.error('Lỗi khi xóa đồng bộ!', err)
    } finally {
      setUnsyncLoading(false)
    }
  }

  const actions = [
    {
      key: 'add',
      label: 'Thêm mới',
      type: 'primary',
      variant: 'primary',
      size: 'large',
      onClick: handleAdd,
      disabled: false,
    },
    {
      key: 'edit',
      label: 'Chỉnh sửa',
      type: 'default',
      variant: 'default',
      size: 'middle',
      onClick: handleEdit,
      disabled: selectedRows.length !== 1,
    },
    {
      key: 'delete',
      label: 'Xóa',
      danger: true,
      variant: 'danger',
      size: 'middle',
      onClick: handleDelete,
      disabled: selectedRows.length === 0,
    },
    {
      key: 'sync',
      label: 'Đồng bộ',
      type: 'primary',
      variant: 'primary',
      size: 'middle',
      loading: syncLoading,
      onClick: handleSync,
      disabled: syncLoading,
    },
    {
      key: 'unsync',
      label: 'Xóa đồng bộ',
      danger: true,
      variant: 'danger',
      size: 'middle',
      loading: unsyncLoading,
      onClick: handleUnsync,
      disabled: unsyncLoading,
    },
  ]

  return (
    <>
      <CTable
        columns={columns}
        dataSource={productsData}
        onRowSelectionChange={handleRowSelectionChange}
        actions={actions}
      />
      <Modal
        title={isEdit ? 'Chỉnh sửa sản phẩm' : 'Thêm mới sản phẩm'}
        open={modalOpen}
        onOk={handleOk}
        onCancel={() => {
          setModalOpen(false)
          form.resetFields()
        }}
        confirmLoading={loading}
        okText={isEdit ? 'Lưu' : 'Thêm'}
        cancelText="Hủy"
      >
        <Form
          form={form}
          layout="vertical"
          className="space-y-2"
        >
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
          >
            <Input className="!rounded !border-gray-300" />
          </Form.Item>
          <Form.Item label="Danh mục" name="category">
            <Input className="!rounded !border-gray-300" />
          </Form.Item>
          <Form.Item label="Mã danh mục" name="category_code">
            <Input className="!rounded !border-gray-300" />
          </Form.Item>
          <Form.Item label="Thương hiệu" name="brand">
            <Input className="!rounded !border-gray-300" />
          </Form.Item>
          <Form.Item label="Màu sắc" name="color">
            <Input className="!rounded !border-gray-300" />
          </Form.Item>
          <Form.Item label="Tình trạng" name="Product_condition">
            <Input className="!rounded !border-gray-300" />
          </Form.Item>
          <Form.Item label="Barcode" name="Barcode">
            <Input className="!rounded !border-gray-300" />
          </Form.Item>
          <Form.Item label="Đà Nẵng" name="DaNang">
            <Input className="!rounded !border-gray-300" />
          </Form.Item>
          <Form.Item label="Hà Nội" name="HaNoi">
            <Input className="!rounded !border-gray-300" />
          </Form.Item>
          <Form.Item
            label="Bán lẻ"
            name="Ban_Le"
          >
            <Input className="!rounded !border-gray-300" />
          </Form.Item>
          <Form.Item
            label="Image URL"
            name="image"
          >
            <Input
              className="!rounded !border-gray-300"
              placeholder="Dán link ảnh sản phẩm..."
              disabled={!!imageFile}
            />
          </Form.Item>
          <Form.Item label="Hoặc tải ảnh lên">
            <Upload
              beforeUpload={file => {
                setImageFile(file)
                return false // Ngăn antd upload tự động
              }}
              showUploadList={imageFile ? [{ name: imageFile.name }] : false}
              maxCount={1}
              accept="image/*"
              onRemove={() => setImageFile(null)}
            >
              <button type="button" className="ant-btn ant-btn-default">
                <UploadOutlined /> Chọn ảnh
              </button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
=======
import React, { useEffect, useState } from 'react'
import { addProductsToFirebase, deleteSyncedProductsFromFirestore } from '../../../utils/dataHelper'
import { db } from '../../../utils/firebase'
import { useFirestore } from '../../../hooks/useFirestore'
import { Button, Table, Spin, message, Popconfirm, Space, Input, Modal } from 'antd' // Thêm Input
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import routePath from '../../../constants/routePath'
import { useNavigate } from 'react-router-dom'

function ProductAdmin() {
  const { getAllDocs, getDocById } = useFirestore(db, "products");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [syncResult, setSyncResult] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [detailVisible, setDetailVisible] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const navigate = useNavigate()


  // Lấy danh sách sản phẩm khi load trang
  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const data = await getAllDocs(); // Lấy sản phẩm từ Firebase
      setProducts(data || []);
    } catch (err) {
      message.error('Lỗi khi lấy sản phẩm', err.message)
      setProducts([])
    }
    setLoading(false)
  }

  // Hàm đồng bộ dữ liệu
  const handleSync = async () => {
    setSyncing(true)
    setSyncResult(null)
    try {
      const result = await addProductsToFirebase()
      setSyncResult(result)
      message.success('Đồng bộ thành công!')
      await fetchProducts()
    } catch (err) {
      setSyncResult({ error: err.message })
      message.error('Lỗi đồng bộ: ' + err.message)
    }
    setSyncing(false)
  }

  // Hàm xóa đồng bộ
  const handleDeleteSync = async () => {
    setDeleting(true)
    try {
      const ids = products.map(p => p.id)
      if (ids.length === 0) {
        message.info('Không có sản phẩm để xóa')
        setDeleting(false)
        return
      }
      // await deleteSyncedProductsFromFirestore(db, "products", ids)
      message.success('Đã xóa toàn bộ sản phẩm đã đồng bộ!')
      await fetchProducts() // Refresh lại bảng
    } catch (err) {
      message.error('Lỗi xóa: ' + err.message)
    }
    setDeleting(false)
  }

  // Xử lý thêm sản phẩm
  const handleAdd = () => {
    navigate(routePath.adminProductAdd)
  }

  // Xử lý sửa sản phẩm
  const handleEdit = async (record) => {
    try {
      const product = await getDocById(record.id + '')
      message.info(`Đã lấy dữ liệu sản phẩm "${product.name}".`)
      console.log('Sản phẩm:', product)
      // Lưu sản phẩm đã chọn xuống localStorage
      try {
        localStorage.setItem('selectedProduct', JSON.stringify(product))
      } catch (e) {
        console.error('Lỗi khi lưu sản phẩm vào localStorage:', e)
      }
      navigate(routePath.adminProductEdit)
    } catch (err) {
      message.error('Lỗi lấy sản phẩm: ' + err.message)
    }
  }

  // Xử lý xóa sản phẩm
  const handleDelete = async (record) => {
    try {
      await deleteSyncedProductsFromFirestore(db, "products", [record.id])
      message.success(`Đã xóa sản phẩm "${record.name}"!`)
      await fetchProducts()
    } catch (err) {
      message.error('Lỗi xóa: ' + err.message)
    }
  }

  // Hàm mở dialog chi tiết
  const showDetail = (record) => {
    setSelectedProduct(record)
    setDetailVisible(true)
    // Lưu sản phẩm đã chọn xuống localStorage
    try {
      localStorage.setItem('selectedProduct', JSON.stringify(record))
    } catch (e) {
      console.error('Lỗi khi lưu sản phẩm vào localStorage:', e)
    }
  }

  // Hàm đóng dialog
  const handleDetailClose = () => {
    setDetailVisible(false)
    setSelectedProduct(null)
  }

  // Lọc sản phẩm theo tên
  const filteredProducts = products.filter(product =>
    product.name?.toLowerCase().includes(searchText.toLowerCase())
  )

  // Chỉ hiển thị các trường cần thiết trên bảng
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
    { title: 'Tên', dataIndex: 'name', key: 'name' },
    { title: 'Danh mục', dataIndex: 'category', key: 'category' }, // Thêm cột danh mục
    { title: 'Giá bán lẻ', dataIndex: 'retailPrice', key: 'retailPrice' },
    { title: 'Trạng thái', dataIndex: 'Product_condition', key: 'status' },
    { 
      title: 'Ảnh', 
      dataIndex: 'image', 
      key: 'image', 
      render: images => Array.isArray(images) && images.length > 0 
        ? <img src={images[0]} alt="Ảnh" style={{ width: 40, height: 40, objectFit: 'cover' }} /> 
        : null 
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm
            title="Bạn chắc chắn muốn xóa sản phẩm này?"
            onConfirm={() => handleDelete(record)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
          <Button onClick={() => showDetail(record)}>Xem chi tiết</Button>
        </Space>
      ),
      width: 180,
    },
  ]

  // Thêm mapping key -> label tiếng Việt
  const productFieldLabels = {
    id: 'Mã sản phẩm',
    name: 'Tên sản phẩm',
    sku: 'SKU',
    category: 'Danh mục',
    brand: 'Thương hiệu',
    color: 'Màu sắc',
    weight: 'Khối lượng',
    retailPrice: 'Giá bán lẻ',
    wholesalePrice: 'Giá bán sỉ',
    importPrice: 'Giá nhập',
    salePrice: 'Giá sale',
    DaNang: 'Tồn ĐN',
    HaNoi: 'Tồn HN',
    Product_condition: 'Trạng thái',
    tags: 'Tags',
    description: 'Mô tả',
    image: 'Ảnh',
    // Thêm các trường khác nếu cần
  }

  return (
    <div>
      <h2>Quản lý sản phẩm</h2>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Thêm sản phẩm
        </Button>
        <Button type="primary" onClick={handleSync} loading={syncing}>
          Đồng bộ dữ liệu
        </Button>
        <Popconfirm
          title="Bạn chắc chắn muốn xóa toàn bộ sản phẩm đã đồng bộ?"
          onConfirm={handleDeleteSync}
          okText="Xóa"
          cancelText="Hủy"
        >
          <Button danger loading={deleting}>
            Xóa đồng bộ
          </Button>
        </Popconfirm>
        <Input.Search
          placeholder="Tìm kiếm theo tên sản phẩm"
          allowClear
          onChange={e => setSearchText(e.target.value)}
          style={{ width: 250 }}
        />
      </Space>
      {syncResult && (
        <div style={{ margin: '10px 0', color: syncResult.error ? 'red' : 'green' }}>
          {syncResult.error
            ? `Lỗi: ${syncResult.error}`
            : 'Đồng bộ thành công!'}
        </div>
      )}
      {loading ? (
        <Spin tip="Đang tải dữ liệu..." />
      ) : (
        <Table
          dataSource={filteredProducts}
          columns={columns}
          rowKey={record => record.id || record._id}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 'max-content' }}
        />
      )}
      <Modal
        title="Chi tiết sản phẩm"
        open={detailVisible}
        onCancel={handleDetailClose}
        footer={null}
        width={600}
      >
        {selectedProduct && (
          <div>
            {Object.entries(selectedProduct).map(([key, value]) => (
              <div key={key} style={{ marginBottom: 12, display: 'flex' }}>
                <b style={{ minWidth: 160, display: 'inline-block' }}>
                  {productFieldLabels[key] || key}:
                </b>
                <span style={{ marginLeft: 8, display: 'flex', flexWrap: 'wrap' }}>
                  {key === 'image' && Array.isArray(value) && value.length > 0
                    ? value.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt="Ảnh sản phẩm"
                          style={{ width: 60, height: 60, objectFit: 'cover', marginRight: 8, borderRadius: 4, border: '1px solid #eee' }}
                        />
                      ))
                    : Array.isArray(value)
                      ? value.join(', ')
                      : String(value)}
                </span>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
>>>>>>> fix-admin
  )
}

export default ProductAdmin