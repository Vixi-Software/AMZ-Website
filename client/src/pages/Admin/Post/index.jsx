import React from 'react'
import CTable from '../../../components/ui/table'

const columns = [
  {
    title: 'Tiêu đề',
    dataIndex: 'title',
    enableSort: true,
    enableFilter: true,
    filterType: 'text',
  },
  {
    title: 'Nội dung',
    dataIndex: 'content',
    enableFilter: true,
    filterType: 'text',
  },
  {
    title: 'Ngày đăng',
    dataIndex: 'createdAt',
    enableSort: true,
    enableFilter: true,
    filterType: 'dateRange',
  },
]

const dataSource = [
  { id: 1, title: 'Hướng dẫn mua hàng', content: 'Chi tiết cách mua hàng trên website...', createdAt: '2024-06-01' },
  { id: 2, title: 'Khuyến mãi tháng 6', content: 'Nhiều ưu đãi hấp dẫn trong tháng 6...', createdAt: '2024-06-10' },
  { id: 3, title: 'Tin tức thị trường', content: 'Cập nhật tin tức thị trường mới nhất...', createdAt: '2024-06-15' },
]

function PostManagement() {
  return (
    <div>
      <h2>Quản lý bài viết</h2>
      <CTable
        columns={columns}
        dataSource={dataSource}
        actions={[
          {
            key: 'add',
            label: 'Thêm bài viết',
            type: 'primary',
            onClick: () => alert('Thêm bài viết'),
          },
          {
            key: 'edit',
            label: 'Sửa',
            type: 'default',
            onClick: () => alert('Sửa bài viết'),
          },
          {
            key: 'delete',
            label: 'Xóa',
            type: 'default',
            danger: true,
            onClick: () => alert('Xóa bài viết'),
          },
        ]}
      />
    </div>
  )
}

export default PostManagement