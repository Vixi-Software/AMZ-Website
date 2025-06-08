import React, { useEffect, useState } from 'react'
import { useProductHelper } from '../../../utils/productHelper'
import { addProductsToFirebase, deleteSyncedProductsFromFirestore } from '../../../utils/dataHelper'
import { db } from '../../../utils/firebase'
import { Button, Table, Spin, message, Popconfirm, Space, Input } from 'antd' // Thêm Input
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import routePath from '../../../constants/routePath'
import { useNavigate } from 'react-router-dom'

function ProductAdmin() {
  const { getAllProducts, getProductById } = useProductHelper()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [syncResult, setSyncResult] = useState(null)
  const [searchText, setSearchText] = useState('')
   const navigate = useNavigate()

  // Lấy danh sách sản phẩm khi load trang
  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const data = await getAllProducts()
      setProducts(data || [])
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
      const product = await getProductById(record.id+'')
      console.log('Sản phẩm lấy theo ID:', product)
      message.info(`Đã lấy dữ liệu sản phẩm "${product.name}".`)
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

  // Lọc sản phẩm theo tên
  const filteredProducts = products.filter(product =>
    product.name?.toLowerCase().includes(searchText.toLowerCase())
  )

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
    { title: 'Tên', dataIndex: 'name', key: 'name' },
    { title: 'SKU', dataIndex: 'sku', key: 'sku' },
    { title: 'Danh mục', dataIndex: 'category', key: 'category' },
    { title: 'Thương hiệu', dataIndex: 'brand', key: 'brand' },
    { title: 'Màu sắc', dataIndex: 'color', key: 'color', render: color => Array.isArray(color) ? color.join(', ') : color },
    { title: 'Khối lượng', dataIndex: 'weight', key: 'weight' },
    { title: 'Giá bán lẻ', dataIndex: 'retailPrice', key: 'retailPrice' },
    { title: 'Giá bán sỉ', dataIndex: 'wholesalePrice', key: 'wholesalePrice' },
    { title: 'Giá nhập', dataIndex: 'importPrice', key: 'importPrice' },
    { title: 'Giá sale', dataIndex: 'salePrice', key: 'salePrice' },
    { title: 'Tồn ĐN', dataIndex: 'DaNang', key: 'DaNang' },
    { title: 'Tồn HN', dataIndex: 'HaNoi', key: 'HaNoi' },
    { title: 'Trạng thái', dataIndex: 'Product_condition', key: 'status' },
    { title: 'Tags', dataIndex: 'tags', key: 'tags', render: tags => Array.isArray(tags) ? tags.join(', ') : tags },
    { title: 'Mô tả', dataIndex: 'description', key: 'description', ellipsis: true },
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
        </Space>
      ),
      width: 120,
    },
  ]


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
          scroll={{ x: 'max-content' }} // Thêm dòng này để bảng cuộn ngang khi cần
        />
      )}
    </div>
  )
}

export default ProductAdmin