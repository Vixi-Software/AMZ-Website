import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CTable from '../../../components/ui/table'
import { useProductService } from '../../../services/productService'
import routepath from '../../../constants/routePath'
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
    dataIndex: 'pricesBanLe',
    enableSort: true,
    enableFilter: true,
    filterType: 'numberRange',
    render: (value) =>
      value !== undefined
        ? value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
        : '',
  },
  {
    title: 'Danh mục',
    dataIndex: 'category',
    enableFilter: true,
    filterType: 'select', 
  },
  {
    title: 'Tình trạng',
    dataIndex: 'statusSell',
    enableSort: true,
    enableFilter: true,
    filterType: 'select', 
  },
]

function ProductManagement() {
  const { getAllProducts } = useProductService(); 
  const [data, setData] = React.useState([]);
  const navigate = useNavigate(); // Thêm dòng này

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await getAllProducts();
      setData(result || []);
    };
    fetchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <CTable
        columns={columns}
        dataSource={data}
        onRowSelectionChange={(selectedRowKeys) => {
          console.log('Selected row keys:', selectedRowKeys);
        }}
        actions={[
          {
            key: 'add',
            label: 'Thêm sản phẩm',
            type: 'primary',
            className: '!bg-green-500 !text-white',
            onClick: () => navigate(routepath.adminProductAdd), // Sửa lại dòng này
          },
          {
            key: 'edit',
            label: 'Sửa',
            type: 'primary',
            className: '!bg-blue-500 !text-white', // Thêm class
            onClick: () => alert('Sửa sản phẩm'),
          },
          {
            key: 'delete',
            label: 'Xóa',
            type: 'primary',
            danger: true,
            className: '!bg-red-500 !text-white', // Thêm class
            onClick: () => alert('Xóa sản phẩm'),
          },
          {
            key: 'view',
            label: 'Xem chi tiết',
            type: 'default',
            className: '!bg-gray-200 !text-black', // Thêm class
            onClick: () => alert('Xem chi tiết sản phẩm'),
          },
          {
            key: 'best-seller',
            label: 'Đánh dấu bán chạy',
            type: 'dashed',
            className: '!text-yellow-500 !border-yellow-500', // Thêm class
            onClick: () => alert('Đánh dấu sản phẩm bán chạy'),
          },
          {
            key: 'sync',
            label: 'Đồng bộ',
            type: 'default',
            className: '!bg-purple-500 !text-white', // Thêm class
            onClick: () => alert('Đồng bộ sản phẩm'),
          },
        ]}
      />
    </div>
  )
}

export default ProductManagement