import React, { useState, useEffect } from 'react'
import ReactQuill from 'react-quill'
import { Button, Modal, message, Input, Alert } from 'antd'
import 'react-quill/dist/quill.snow.css'
import 'antd/dist/reset.css'
import { db } from '../../../../utils/firebase'
import { useFirestore } from '../../../../hooks/useFirestore'

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

function PostForm({ value, onChange, titleValue, onTitleChange }) {
  // Xác định action dựa vào pathname
  const pathname = window.location.pathname
  const isEdit = pathname.includes('/admin/posts/edit')

  // Lấy bài viết từ localStorage nếu là edit
  const editingPost = isEdit ? JSON.parse(localStorage.getItem('editingPost') || '{}') : null

  // Khởi tạo state với dữ liệu từ localStorage nếu có
  const [content, setContent] = useState(
    isEdit && editingPost?.content ? editingPost.content : ''
  )
  const [title, setTitle] = useState(
    isEdit && editingPost?.title ? editingPost.title : ''
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { addDocData, updateDocData } = useFirestore(db, 'posts')

  // Khi vào trang edit, tự động đưa nội dung lên form
  useEffect(() => {
    if (isEdit && editingPost) {
      setContent(editingPost.content || '')
      setTitle(editingPost.title || '')
    } else {
      setContent('')
      setTitle('')
    }
  }, [isEdit])

  // Xóa editingPost khỏi localStorage khi rời khỏi trang edit
  useEffect(() => {
    if (!isEdit) {
      localStorage.removeItem('editingPost')
    }
  }, [isEdit])

  const handleChange = (val) => {
    setContent(val)
    if (onChange) onChange(val)
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
    if (onTitleChange) onTitleChange(e.target.value)
  }

  const handleSave = () => {
    setIsModalOpen(true)
  }

  const handleConfirmSave = async () => {
    setIsModalOpen(false)
    try {
      if (isEdit && editingPost?.id) {
        await updateDocData(editingPost.id, { title, content })
        message.success('Đã cập nhật bài viết!')
      } else {
        await addDocData({ title, content, createdAt: new Date() })
        message.success('Đã lưu bài viết!')
      }
      if (onChange) onChange(content)
      if (onTitleChange) onTitleChange(title)
      // Xóa editingPost khỏi localStorage sau khi lưu
      if (isEdit) localStorage.removeItem('editingPost')
    } catch (error) {
      message.error('Lưu bài viết thất bại!', error.message)
    }
  }

  const handleCancel = () => {
    setContent(value || '')
    setTitle(titleValue || '')
    message.info('Đã hủy thay đổi')
  }

  const handlePreview = (val) => {
    Modal.info({
      title: 'Xem trước bài viết',
      content: (
        <div>
          <h2>{title}</h2>
          <div className="ql-editor" dangerouslySetInnerHTML={{ __html: val }} />
        </div>
      ),
      width: 1000,
    })
  }

  // Hiển thị Alert nếu không có editingPost khi đang ở trang edit
  if (isEdit && (!editingPost || !editingPost.id)) {
    return (
      <Alert
        message="Vui lòng chọn bài viết trên danh sách bài viết để sửa!"
        type="warning"
        showIcon
        style={{ margin: 24 }}
      />
    )
  }

  return (
    <div className="post-form-container h-full flex flex-col gap-4">
      <div className="flex gap-2 mb-2">
        <Button type="primary" onClick={handleSave} className="bg-blue-600">
          Lưu bài viết
        </Button>
        <Button onClick={() => handlePreview(content)} className="bg-gray-200">
          Xem trước
        </Button>
        <Button danger onClick={handleCancel}>
          Hủy
        </Button>
      </div>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        style={{ height: '100%', minHeight: 400, display: 'flex', flexDirection: 'column' }}
      />
      <Modal
        title="Xác nhận lưu bài viết"
        open={isModalOpen}
        onOk={handleConfirmSave}
        onCancel={() => setIsModalOpen(false)}
        okText="Lưu"
        cancelText="Hủy"
        okButtonProps={{ disabled: !title.trim() }} // Chỉ cho lưu khi có tiêu đề
      >
        <p>Bạn có chắc chắn muốn lưu bài viết này không?</p>
        <Input
          placeholder="Nhập tiêu đề bài viết"
          value={title}
          onChange={handleTitleChange}
          style={{ marginTop: 12, fontWeight: 'bold', fontSize: 16 }}
          autoFocus
        />
        {!title.trim() && (
          <div style={{ color: 'red', marginTop: 8 }}>
            Vui lòng nhập tiêu đề bài viết trước khi lưu.
          </div>
        )}
      </Modal>
    </div>
  )
}

export default PostForm