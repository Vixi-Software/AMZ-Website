import { useState, useEffect, useCallback, useMemo } from 'react'
import CTable from '../../../components/ui/table'
import { useFirestore } from '../../../hooks/useFirestore'
import { db } from '../../../utils/firebase'
import { Modal, Input, Form, message, Row, Col, AutoComplete } from 'antd'
import { cleanAllFromFirebase, syncAllToFirebase } from '../../../utils/database'
import { PlusOutlined } from '@ant-design/icons'


const COLOR_MAP = {
    "Đen": "#000000",
    "Trắng": "#FFFFFF",
    "Đỏ": "#FF0000",
    "Xám": "#808080",
    "Vàng": "#FFD700",
    "Nâu": "#8B4513",
    "Xanh Lục": "#008000",
    "Xanh Navy": "#001F5B",
    "Xanh blue nhạt": "#ADD8E6",
    "Xanh lá cây": "#32CD32",
    "Xanh mint": "#AAF0D1",
    "Hồng": "#FFC0CB",
    "Tím": "#800080",
    "Kem": "#FFFDD0",
    "Camo": "#78866B",
    "Multicolor": "linear-gradient(90deg, #FF0000, #00FF00, #0000FF)",
    "Vàng đen": "linear-gradient(90deg, #FFD700, #000000)",
    "Đen cam": "linear-gradient(90deg, #000000, #FFA500)",
    "Đồng đen": "#3D2B1F",
};


// Tách component cho màu sắc
const ColorDots = ({ colors }) => {
  if (!colors) return null
  const arr = Array.isArray(colors) ? colors : [colors]
  const chunkSize = 4
  const rows = []
  for (let i = 0; i < arr.length; i += chunkSize) {
    rows.push(arr.slice(i, i + chunkSize))
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {rows.map((row, rowIdx) => (
        <div key={rowIdx} style={{ display: 'flex', gap: 8 }}>
          {row.map((color, idx) => (
            <span
              key={idx}
              style={{
                display: 'inline-block',
                width: 18,
                height: 18,
                borderRadius: '50%',
                border: '1px solid #ccc',
                background: COLOR_MAP[color] || '#eee',
                marginRight: 4,
              }}
              title={color}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

// Tách component cho ảnh
const ImagePreview = ({ images, onViewAll }) => {
  if (!images) return null
  const arr = Array.isArray(images) ? images : [images]
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      {arr.slice(0, 2).map((url, idx) => (
        <img
          key={idx}
          src={url}
          alt="product"
          style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }}
        />
      ))}
      {arr.length > 2 && (
        <button
          type="button"
          className="ant-btn ant-btn-link"
          style={{ padding: 0, marginLeft: 4 }}
          onClick={onViewAll}
        >
          Xem thêm
        </button>
      )}
    </div>
  )
}

function ProductAdmin() {
  const [selectedRows, setSelectedRows] = useState([])
  const [productsData, setProductsData] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [syncLoading, setSyncLoading] = useState(false)
  const [unsyncLoading, setUnsyncLoading] = useState(false)
  const [imageLinks, setImageLinks] = useState([''])
  const [viewImages, setViewImages] = useState([])
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [categoryOptions, setCategoryOptions] = useState([])
  const [brandOptions, setBrandOptions] = useState([])
  const [colorOptions, setColorOptions] = useState([])

  const { getAllDocs, addDocData, updateDocData, deleteDocData } = useFirestore(db, 'products')
  const { getAllDocs: getAllDocsCategories } = useFirestore(db, 'categories')
  const { getAllDocs: getAllDocsBrands } = useFirestore(db, 'brands'  )
  const { getAllDocs: getAllDocsColors } = useFirestore(db, 'colors')


  // useMemo cho columns
  const columns = useMemo(() => [
    { title: 'Tên', dataIndex: 'name', enableSort: true, enableFilter: true },
    { title: 'Danh mục', dataIndex: 'category', enableSort: true, enableFilter: true },
    { title: 'Mã danh mục', dataIndex: 'category_code', enableSort: true, enableFilter: true },
    { title: 'Thương hiệu', dataIndex: 'brand', enableSort: true, enableFilter: true },
    {
      title: 'Màu sắc',
      dataIndex: 'color',
      enableSort: true,
      enableFilter: true,
      render: (colors) => <ColorDots colors={colors} />
    },
    { title: 'Tình trạng', dataIndex: 'Product_condition', enableSort: true, enableFilter: true },
    { title: 'Barcode', dataIndex: 'Barcode', enableSort: true, enableFilter: true },
    { title: 'Đà Nẵng', dataIndex: 'DaNang', enableSort: true, enableFilter: true },
    { title: 'Hà Nội', dataIndex: 'HaNoi', enableSort: true, enableFilter: true },
    { title: 'Bán lẻ', dataIndex: 'Ban_Le', enableSort: true, enableFilter: true },
    {
      title: 'Image',
      dataIndex: 'image',
      render: (images) => (
        <ImagePreview
          images={images}
          onViewAll={e => {
            e.stopPropagation()
            setViewImages(Array.isArray(images) ? images : [images])
            setViewModalOpen(true)
          }}
        />
      ),
    },
  ], [])

  useEffect(() => {
    getAllDocs()
      .then(setProductsData)
      .catch(console.error)
  }, [])

  useEffect(() => {
    // Lấy danh mục
    getAllDocsCategories().then(data => {
      setCategoryOptions(
        data.map(item => ({
          value: item.name || item.value || '',
          label: item.name || item.value || '',
        }))
      )
    })
    // Lấy thương hiệu
    getAllDocsBrands().then(data => {
      setBrandOptions(
        data.map(item => ({
          value: item.name || item.value || '',
          label: item.name || item.value || '',
        }))
      )
    })
    // Lấy màu sắc
    getAllDocsColors().then(data => {
      setColorOptions(
        data.map(item => ({
          value: item.name || item.value || '',
          label: item.name || item.value || '',
        }))
      )
    })
  }, [])

  const handleRowSelectionChange = useCallback((selectedRowKeys) => {
    setSelectedRows(selectedRowKeys)
  }, [])

  const handleAdd = useCallback(() => {
    setIsEdit(false)
    form.resetFields()
    setModalOpen(true)
  }, [form])

  const handleEdit = useCallback(() => {
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
  }, [selectedRows, productsData, form])

  // Reset imageLinks khi mở modal mới
  useEffect(() => {
    if (modalOpen && !isEdit) setImageLinks([''])
    if (modalOpen && isEdit) {
      const product = productsData.find(p => String(p.id) === String(selectedRows[0]?.id))
      if (product && Array.isArray(product.image)) setImageLinks(product.image)
      else setImageLinks([''])
    }
  }, [modalOpen, isEdit, productsData, selectedRows])

  // Xử lý submit form
  const handleOk = useCallback(async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()

      // Xử lý color: chuyển chuỗi thành mảng (ngăn cách bởi dấu phẩy)
      let colorArr = []
      if (typeof values.color === 'string') {
        colorArr = values.color.split(',').map(c => c.trim()).filter(Boolean)
      } else if (Array.isArray(values.color)) {
        colorArr = values.color
      }

      // Xử lý image: luôn là mảng
      let imageArr = []
      if (imageLinks.some(link => link)) {
        imageArr = imageLinks.filter(Boolean)
      } else if (typeof values.image === 'string' && values.image) {
        imageArr = [values.image]
      } else if (Array.isArray(values.image)) {
        imageArr = values.image
      }

      const submitValues = { 
        ...values, 
        color: colorArr,
        image: imageArr
      }

      if (isEdit) {
        const id = typeof selectedRows[0] === 'object' ? String(selectedRows[0].id) : String(selectedRows[0])
        await updateDocData(id, submitValues)
        message.success('Cập nhật thành công!')
      } else {
        await addDocData(submitValues)
        message.success('Thêm mới thành công!')
      }
      setModalOpen(false)
      setSelectedRows([])
      const updated = await getAllDocs()
      setProductsData(updated)
    } catch (err) {
      message.error('Có lỗi xảy ra!', err)
      console.error('Error submitting form:', err)
    } finally {
      setLoading(false)
    }
  }, [form, imageLinks, isEdit, selectedRows, updateDocData, addDocData, getAllDocs])

  // Xóa sản phẩm
  const handleDelete = useCallback(async () => {
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
  }, [selectedRows, deleteDocData, getAllDocs])

  // Đồng bộ sản phẩm
  const handleSync = useCallback(async () => {
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
  }, [getAllDocs])

  // Xóa đồng bộ sản phẩm
  const handleUnsync = useCallback(async () => {
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
  }, [getAllDocs])

  const actions = useMemo(() => [
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
  ], [handleAdd, handleEdit, handleDelete, handleSync, handleUnsync, selectedRows.length, syncLoading, unsyncLoading])

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
        width={{
          xs: '90%',
          sm: '90%',
          md: '90%',
          lg: '90%',
          xl: '90%',
          xxl: '90%',
        }}
      >
        <Form
          form={form}
          layout="vertical"
          className="space-y-2"
        >
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Tên sản phẩm" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}>
                <Input className="!rounded !border-gray-300" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Danh mục" name="category">
                <AutoComplete
                  options={categoryOptions}
                  className="!rounded !border-gray-300"
                  placeholder="Chọn danh mục"
                  filterOption={(inputValue, option) =>
                    option.value.toLowerCase().includes(inputValue.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Mã danh mục" name="category_code">
                <Input className="!rounded !border-gray-300" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Thương hiệu" name="brand">
                <AutoComplete
                  options={brandOptions}
                  className="!rounded !border-gray-300"
                  placeholder="Chọn thương hiệu"
                  filterOption={(inputValue, option) =>
                    option.value.toLowerCase().includes(inputValue.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Màu sắc" name="color">
                <AutoComplete
                  mode="tags"
                  options={colorOptions}
                  className="!rounded !border-gray-300"
                  placeholder="Chọn màu sắc (có thể nhập nhiều, cách nhau dấu phẩy)"
                  filterOption={(inputValue, option) =>
                    option.value.toLowerCase().includes(inputValue.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Tình trạng" name="Product_condition">
                <Input className="!rounded !border-gray-300" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Barcode" name="Barcode">
                <Input className="!rounded !border-gray-300" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Đà Nẵng" name="DaNang">
                <Input className="!rounded !border-gray-300" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Hà Nội" name="HaNoi">
                <Input className="!rounded !border-gray-300" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Bán lẻ"
                name="Ban_Le"
              >
                <Input className="!rounded !border-gray-300" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Image URL">
            {imageLinks.map((link, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <Input
                  className="!rounded !border-gray-300"
                  placeholder="Dán link ảnh sản phẩm..."
                  value={link}
                  onChange={e => {
                    const arr = [...imageLinks]
                    arr[idx] = e.target.value
                    setImageLinks(arr)
                  }}
                />
                {imageLinks.length > 1 && (
                  <button
                    type="button"
                    className="ant-btn ant-btn-danger"
                    onClick={() => setImageLinks(imageLinks.filter((_, i) => i !== idx))}
                  >
                    Xóa
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="ant-btn ant-btn-dashed"
              onClick={() => setImageLinks([...imageLinks, ''])}
            >
              <PlusOutlined /> Thêm
            </button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Tất cả ảnh sản phẩm"
        open={viewModalOpen}
        onCancel={() => setViewModalOpen(false)}
        footer={null}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {viewImages.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt={`product-${idx}`}
              style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 4 }}
            />
          ))}
        </div>
      </Modal>
    </>
  )
}

export default ProductAdmin