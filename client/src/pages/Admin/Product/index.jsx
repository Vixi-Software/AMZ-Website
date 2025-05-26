import React, { useState, useEffect, useCallback } from 'react'
import CTable from '../../../components/ui/table'
import { useFirestore } from '../../../hooks/useFirestore'
import { db } from '../../../utils/firebase'

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


function ProductAdmin() {
  const [selectedRows, setSelectedRows] = useState([])
  const [productsData, setProductsData] = useState([])

  const { getAllDocs } = useFirestore(db, 'products') // 'products' là tên collection trên Firestore

  useEffect(() => {
    getAllDocs()
      .then(setProductsData)
      .catch(console.error)
  }, [getAllDocs])

  const handleRowSelectionChange = useCallback(rows => setSelectedRows(rows), [])

  const actions = [
    {
      key: 'add',
      label: 'Thêm mới',
      type: 'primary',
      onClick: () => alert('Thêm mới sản phẩm'),
      disabled: false,
    },
    {
      key: 'edit',
      label: 'Chỉnh sửa',
      type: 'default',
      onClick: () => alert('Chỉnh sửa sản phẩm'),
      disabled: selectedRows.length !== 1,
    },
    {
      key: 'delete',
      label: 'Xóa',
      danger: true,
      onClick: () => alert('Xóa sản phẩm'),
      disabled: selectedRows.length === 0,
    },
  ]

  return (
    <CTable
      columns={columns}
      dataSource={productsData}
      onRowSelectionChange={handleRowSelectionChange}
      actions={actions}
    />
  )
}

export default ProductAdmin