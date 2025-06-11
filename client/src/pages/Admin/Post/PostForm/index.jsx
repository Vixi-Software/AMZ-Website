import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Button, Space, message, Modal, Form, Input } from 'antd'
import { db } from '../../../../utils/firebase'
import { useFirestore } from '../../../../hooks/useFirestore'
import { useLocation } from 'react-router-dom'
import routePath from '../../../../constants/routePath'
import { useSelector, useDispatch } from 'react-redux'
import { clearEditingPost } from '../../../../store/features/post/postSlice'

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'align': [] }],
    ['blockquote', 'code-block'],
    ['link', 'image', 'video'],
    ['clean']
  ]
}

const formats = [
  'header', 'bold', 'italic', 'underline', 'strike',
  'color', 'background',
  'list', 'bullet', 'indent',
  'align', 'blockquote', 'code-block',
  'link', 'image', 'video'
]

function PostForm() {
  const [content, setContent] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [form] = Form.useForm()
  const location = useLocation()
  const dispatch = useDispatch()
  const editingPost = useSelector(state => state.post.editingPost)

  // Giả sử routePath.adminPostEdit là '/admin/posts/edit'
  const isEditRoute = location.pathname.startsWith(routePath.adminPostEdit)

  // Hoặc nếu routePath.adminPostEdit là '/admin/posts/edit/:id'
  // const isEditRoute = /^\/admin\/posts\/edit\/[^/]+$/.test(location.pathname)

  // Sử dụng useFirestore cho collection 'posts'
  const { addDocData, updateDocData } = useFirestore(db, 'posts')

  // Khi là edit, tự động set dữ liệu vào form/editor
  React.useEffect(() => {
    if (isEditRoute && editingPost) {
      setContent(editingPost.content || '')
      form.setFieldsValue({ title: editingPost.title })
    } else {
      setContent('')
      form.resetFields()
    }
    // eslint-disable-next-line
  }, [isEditRoute, editingPost])

  const handleChange = (val) => {
    setContent(val)
  }

  const handleSave = () => {
    setModalOpen(true)
  }

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields()
      const date = new Date().toLocaleString('vi-VN')
      const postData = {
        title: values.title,
        date,
        content
      }
      if (isEditRoute && editingPost?.id) {
        // Cập nhật bài viết
        await updateDocData(editingPost.id, postData)
        message.success('Đã cập nhật bài viết!')
        dispatch(clearEditingPost())
      } else {
        // Thêm mới
        await addDocData(postData)
        message.success(
          <>
            <div>Đã lưu nội dung!</div>
            <div><b>Tiêu đề:</b> {values.title}</div>
            <div><b>Ngày viết:</b> {date}</div>
          </>
        )
      }
      setModalOpen(false)
      form.resetFields()
      setContent('')
    } catch (err) {
      console.error('Lỗi khi lưu:', err)
      message.error('Vui lòng nhập tiêu đề bài viết!')
    }
  }

  const handleModalCancel = () => {
    setModalOpen(false)
  }

  const handleClear = () => {
    setContent('')
    message.info('Đã xóa hết nội dung!')
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={handleSave}>Lưu</Button>
        <Button danger onClick={handleClear}>Xóa hết</Button>
      </Space>
      <div style={{ flex: 1, minHeight: 0 }}>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          style={{ height: '100%' }}
        />
      </div>
      <Modal
        title="Nhập tiêu đề bài viết"
        open={modalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tiêu đề"
            name="title"
            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
        <div>
          <b>Ngày viết:</b> {new Date().toLocaleString('vi-VN')}
        </div>
      </Modal>
    </div>
  )
}

export default PostForm