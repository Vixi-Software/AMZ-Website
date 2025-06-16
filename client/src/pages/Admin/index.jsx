import React, { useState } from 'react'
import { Table, Input, Button, Pagination, Checkbox } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'

const data = Array.from({ length: 30 }).map((_, i) => ({
  key: i,
  name: 'Bose - Tai nghe True Wireless - Ultra Open Earbuds - Xanh nh...',
  sold: 1,
  stock: 1,
}))

const columns = [
  {
    title: <Checkbox />,
    dataIndex: 'checkbox',
    render: () => <Checkbox />,
    width: 40,
  },
  {
    title: 'Tên sản phẩm',
    dataIndex: 'name',
    key: 'name',
    render: (text) => (
      <span className="whitespace-nowrap overflow-hidden text-ellipsis block max-w-[320px]">{text}</span>
    ),
  },
  {
    title: 'Có thể bán',
    dataIndex: 'sold',
    key: 'sold',
    align: 'center',
    width: 100,
  },
  {
    title: 'Tồn kho',
    dataIndex: 'stock',
    key: 'stock',
    align: 'center',
    width: 100,
  },
]

function Admin() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  return (
    <div className="p-6 bg-white rounded shadow min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Input
            className="w-full sm:w-80"
            placeholder="Tìm kiếm theo tên sản phẩm, mã sản phẩm, SKU"
            prefix={<SearchOutlined />}
            value={search}
            onChange={e => setSearch(e.target.value)}
            allowClear
          />
          <Button
            type="default"
            icon={<SearchOutlined />}
            className="hidden sm:inline-flex !bg-orange-500 hover:!bg-orange-600 !text-white border-none"
          >
            Tìm kiếm
          </Button>
        </div>
        <Button
          type="default"
          icon={<PlusOutlined />}
          className="!bg-orange-500 hover:!bg-orange-600 !text-white border-none"
        >
          Thêm sản phẩm
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data.slice((page - 1) * 10, page * 10)}
        pagination={false}
        rowSelection={false}
        bordered={false}
        className="mb-4"
      />
      <div className="flex justify-end">
        <Pagination
          current={page}
          total={data.length}
          pageSize={10}
          onChange={setPage}
          showSizeChanger={false}
        />
      </div>
    </div>
  )
}

export default Admin