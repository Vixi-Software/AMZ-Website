import React from 'react'
import CTable from '../../../components/ui/table'

const columns = [
  {
    title: 'Tên sản phẩm',
    dataIndex: 'name',
    enableSort: true,
    enableFilter: true,
    filterType: 'text',
  },
  {
    title: 'Giá',
    dataIndex: 'price',
    enableSort: true,
    enableFilter: true,
    filterType: 'numberRange',
  },
  {
    title: 'Danh mục',
    dataIndex: 'category',
    enableFilter: true,
    filterType: 'select', 
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createdAt',
    enableSort: true,
    enableFilter: true,
    filterType: 'dateRange', 
  },
]

const dataSource = [
  { id: 1, name: 'Áo thun', price: 120000, category: 'Thời trang', createdAt: '2024-06-01' },
  { id: 2, name: 'Giày thể thao', price: 350000, category: 'Giày dép', createdAt: '2024-06-10' },
  { id: 3, name: 'Balo', price: 200000, category: 'Phụ kiện', createdAt: '2024-06-15' },
]

function ProductManagement() {
  return (
    <div>
      <h2>Quản lý sản phẩm</h2>
      <CTable
        columns={columns}
        dataSource={dataSource}
        actions={[
          {
            key: 'add',
            label: 'Thêm sản phẩm',
            type: 'primary',
            onClick: () => alert('Thêm sản phẩm'),
          },
          {
            key: 'edit',
            label: 'Sửa',
            type: 'default',
            onClick: () => alert('Sửa sản phẩm'),
          },
          {
            key: 'delete',
            label: 'Xóa',
            type: 'default',
            danger: true,
            onClick: () => alert('Xóa sản phẩm'),
          },
        ]}
      />
    </div>
  )
}

export default ProductManagement