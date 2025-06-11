import React, { useEffect, useState } from 'react'
import { Spin, Button, Modal, Space } from 'antd'
import CTable from '../../../components/ui/table'
import { useFirestore } from '../../../hooks/useFirestore'
import { db } from '../../../utils/firebase'
import { useNavigate } from 'react-router-dom' // Thêm dòng này
import routePath from '../../../constants/routePath' // Thêm dòng này
import { useDispatch } from 'react-redux'
import { setEditingPost } from '../../../store/features/post/postSlice'

function PostAdmin() {
  const { getAllDocs, deleteDocData } = useFirestore(db, 'posts')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalContent, setModalContent] = useState('')
  const [modalTitle, setModalTitle] = useState('')
  const [selectedPosts, setSelectedPosts] = useState([])

  const navigate = useNavigate() // Thêm dòng này
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const docs = await getAllDocs()
      // Định dạng lại ngày tạo
      const formattedDocs = docs.map(doc => ({
        ...doc,
        createdAt: doc.createdAt
          ? new Date(doc.createdAt.seconds ? doc.createdAt.seconds * 1000 : doc.createdAt).toLocaleString('vi-VN')
          : '',
      }))
      setData(formattedDocs)
      setLoading(false)
    }
    fetchData()
  }, [])

  // Định nghĩa các cột cho bảng
  const columns = [
    { title: 'Tiêu đề', dataIndex: 'title', key: 'title', enableSort: true, enableFilter: true },
    { title: 'Ngày tạo', dataIndex: 'createdAt', key: 'createdAt', enableSort: true },
  ]

  // Hàm xử lý xóa bài viết
  const handleDelete = async () => {
    if (selectedPosts.length === 0) return
    Modal.confirm({
      title: 'Xác nhận xoá',
      content: `Bạn có chắc chắn muốn xoá ${selectedPosts.length} bài viết?`,
      okText: 'Xoá',
      okType: 'danger',
      cancelText: 'Huỷ',
      onOk: async () => {
        setLoading(true)
        for (const post of selectedPosts) {
          await deleteDocData(post.id)
        }
        // Sau khi xóa, load lại dữ liệu
        const docs = await getAllDocs()
        const formattedDocs = docs.map(doc => ({
          ...doc,
          createdAt: doc.createdAt
            ? new Date(doc.createdAt.seconds ? doc.createdAt.seconds * 1000 : doc.createdAt).toLocaleString('vi-VN')
            : '',
        }))
        setData(formattedDocs)
        setSelectedPosts([])
        setLoading(false)
      },
    })
  }

  // Các action cho bảng
  const actions = [
    {
      key: 'add',
      label: 'Thêm',
      type: 'primary',
      onClick: () => {
        navigate(routePath.adminPostAdd)
      },
    },
    {
      key: 'edit',
      label: 'Sửa',
      onClick: () => {
        if (selectedPosts.length === 1) {
          dispatch(setEditingPost(selectedPosts[0]))
          navigate(`${routePath.adminPostEdit}`)
        }
      },
      disabled: selectedPosts.length !== 1,
    },
    {
      key: 'delete',
      label: 'Xoá',
      danger: true,
      onClick: handleDelete,
      disabled: selectedPosts.length === 0,
    },
    {
      key: 'view',
      label: 'Xem nội dung bài viết',
      onClick: () => {
        if (selectedPosts.length === 1) {
          setModalContent(selectedPosts[0].content)
          setModalTitle(selectedPosts[0].title)
          setModalVisible(true)
        }
      },
      disabled: selectedPosts.length !== 1,
    },
  ]

  return (
    <div>
      {loading ? (
        <Spin />
      ) : (
        <>
          <CTable
            dataSource={data}
            columns={columns}
            actions={actions}
            onRowSelectionChange={rows => setSelectedPosts(rows)}
          />
          <Modal
            open={modalVisible}
            onCancel={() => setModalVisible(false)}
            footer={null}
            title={modalTitle || "Nội dung bài viết"}
            width={800}
          >
            <div dangerouslySetInnerHTML={{ __html: modalContent }} />
          </Modal>
        </>
      )}
    </div>
  )
}

export default PostAdmin