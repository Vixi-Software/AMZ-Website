import React, { useState } from 'react'
import CTable from '../../../components/ui/table'

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
]

const data = [
  {
    key: 1,
    id: 1,
    name: 'Sản phẩm A',
    category: 'Điện thoại',
    category_code: 'DT01',
    brand: 'Apple',
    color: 'Đen',
    Product_condition: 'Mới',
    Barcode: '123456789',
    DaNang: 10,
    HaNoi: 5,
    Ban_Le: 20000000,
  },
  {
    key: 2,
    id: 2,
    name: 'Sản phẩm B',
    category: 'Laptop',
    category_code: 'LT01',
    brand: 'Dell',
    color: 'Xám',
    Product_condition: 'Cũ',
    Barcode: '987654321',
    DaNang: 7,
    HaNoi: 3,
    Ban_Le: 15000000,
  },
]


function ProductAdmin() {
  const [selectedRows, setSelectedRows] = useState([])

  const handleRowSelectionChange = (rows) => {
    setSelectedRows(rows)
    console.log('Các hàng đã chọn:', rows)
  }

  const actions = [
    {
      key: 'add',
      label: 'Thêm mới',
      type: 'primary',
      onClick: () => alert('Thêm mới sản phẩm'),
      disabled: false, // luôn cho phép thêm mới
    },
    {
      key: 'edit',
      label: 'Chỉnh sửa',
      type: 'default',
      onClick: () => alert('Chỉnh sửa sản phẩm'),
      disabled: selectedRows.length !== 1, // chỉ cho phép khi chọn đúng 1 dòng
    },
    {
      key: 'delete',
      label: 'Xóa',
      danger: true,
      onClick: () => alert('Xóa sản phẩm'),
      disabled: selectedRows.length === 0, // chỉ cho phép khi có ít nhất 1 dòng được chọn
    },
  ]

  return (
    <div>
      <CTable
        columns={columns}
        dataSource={data}
        onRowSelectionChange={handleRowSelectionChange}
        actions={actions}
      />
    </div>
  )
}

export default ProductAdmin