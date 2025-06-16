import React from 'react'
import CTable from '../../../components/ui/table'

const columns = [
  {
    title: 'Tên sự kiện',
    dataIndex: 'name',
    enableSort: true,
    enableFilter: true,
    filterType: 'text',
  },
  {
    title: 'Thời gian',
    dataIndex: 'date',
    enableSort: true,
    enableFilter: true,
    filterType: 'dateRange',
  },
  {
    title: 'Địa điểm',
    dataIndex: 'location',
    enableFilter: true,
    filterType: 'text',
  },
]

const dataSource = [
  { id: 1, name: 'Sale hè', date: '2024-07-01', location: 'Online' },
  { id: 2, name: 'Black Friday', date: '2024-11-29', location: 'Cửa hàng' },
  { id: 3, name: 'Tết sale', date: '2025-01-20', location: 'Online' },
]

function EventManagement() {
  return (
    <div>
      <h2>Quản lý sự kiện</h2>
      <CTable
        columns={columns}
        dataSource={dataSource}
        actions={[
          {
            key: 'add',
            label: 'Thêm sự kiện',
            type: 'primary',
            onClick: () => alert('Thêm sự kiện'),
          },
          {
            key: 'edit',
            label: 'Sửa',
            type: 'default',
            onClick: () => alert('Sửa sự kiện'),
          },
          {
            key: 'delete',
            label: 'Xóa',
            type: 'default',
            danger: true,
            onClick: () => alert('Xóa sự kiện'),
          },
        ]}
      />
    </div>
  )
}

export default EventManagement