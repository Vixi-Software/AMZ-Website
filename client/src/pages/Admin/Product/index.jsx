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
  )
}

export default ProductAdmin