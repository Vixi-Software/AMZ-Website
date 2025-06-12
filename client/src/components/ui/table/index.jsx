import React, { useState } from 'react'
import { Table, Input, Button, Space, Modal, Select, Row, Col, InputNumber } from 'antd'
import { SearchOutlined, FilterOutlined } from '@ant-design/icons'

function CTable({ dataSource, columns, onRowSelectionChange, actions = [] }) {
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState(dataSource)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [filterValues, setFilterValues] = useState({})

  React.useEffect(() => {
    setFilteredData(dataSource)
  }, [dataSource])

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchText(value)
    applyFilterAndSearch(filterValues, value)
  }

  const handleFilter = () => {
    setIsFilterModalOpen(true)
  }

  const getColumnOptions = (col) => {
    if (col.options) return col.options
    const values = dataSource.map(item => item[col.dataIndex]).filter(Boolean)
    return [...new Set(values)]
  }

  const applyFilterAndSearch = (filters, search) => {
    let data = dataSource
    Object.entries(filters).forEach(([key, val]) => {
      if (val && Array.isArray(val) && val.length > 0) {
        data = data.filter(item => val.includes(item[key]))
      } else if (val) {
        data = data.filter(item =>
          String(item[key] || '').toLowerCase().includes(String(val).toLowerCase())
        )
      }
    })
    if (search) {
      data = data.filter(item =>
        columns.some(col =>
          String(item[col.dataIndex] || '')
            .toLowerCase()
            .includes(search.toLowerCase())
        )
      )
    }
    setFilteredData(data)
  }

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filterValues, [key]: value }
    setFilterValues(newFilters)
  }

  const handleApplyFilter = () => {
    setIsFilterModalOpen(false)
    applyFilterAndSearch(filterValues, searchText)
  }

  const handleClearFilter = () => {
    setFilterValues({})
    setIsFilterModalOpen(false)
    applyFilterAndSearch({}, searchText)
  }

  const enhancedColumns = columns.map(col => {
    let newCol = { ...col }
    if (col.enableSort) {
      newCol.sorter = (a, b) => {
        if (typeof a[col.dataIndex] === 'number' && typeof b[col.dataIndex] === 'number') {
          return a[col.dataIndex] - b[col.dataIndex]
        }
        return String(a[col.dataIndex] || '').localeCompare(String(b[col.dataIndex] || ''))
      }
    }
    if (col.enableFilter) {
      newCol.filterDropdown = ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder={`Search ${col.title}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      )
      newCol.onFilter = (value, record) =>
        String(record[col.dataIndex] || '').toLowerCase().includes(String(value).toLowerCase())
    }
    return newCol
  })

  // Thêm state để lưu các hàng đã chọn (nếu muốn)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  // Xử lý khi chọn hàng
  const onSelectChange = (selectedRowKeys, selectedRows) => {
    setSelectedRowKeys(selectedRowKeys)
    if (onRowSelectionChange) {
      onRowSelectionChange(selectedRows)
    }
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  return (
    <div>
      {/* Row 1: Filter & Search (căn phải) */}
      <div className="mb-4 flex justify-end">
        <Space>
          <Button
            icon={<FilterOutlined />}
            onClick={handleFilter}
          >
          </Button>
          <Input
            placeholder="Tìm kiếm"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={handleSearch}
            allowClear
            className="w-52"
          />
        </Space>
      </div>
      {/* Row 2: Action buttons (ở dưới) */}
      <div className="mb-2">
        <Space>
          {actions.map((btn, idx) => (
            <Button
              key={btn.key || idx}
              type={btn.type}
              icon={btn.icon}
              onClick={btn.onClick}
              danger={btn.danger}
              disabled={btn.disabled}
              loading={btn.loading}
              style={btn.style}
              variant={btn.variant}
              className={btn.className}
              size={btn.size || 'middle'}
            >
              {btn.label}
            </Button>
          ))}
        </Space>
      </div>
      <Table
        dataSource={filteredData}
        columns={enhancedColumns}
        pagination={{ pageSize: 5 }}
        rowKey={record => record.id || record.key}
        rowSelection={rowSelection}
      />

      {/* Modal filter nâng cao */}
      <Modal
        title="Lọc nâng cao"
        open={isFilterModalOpen}
        onOk={handleApplyFilter}
        onCancel={() => setIsFilterModalOpen(false)}
        footer={[
          <Button key="clear" onClick={handleClearFilter}>
            Xóa lọc
          </Button>,
          <Button key="cancel" onClick={() => setIsFilterModalOpen(false)}>
            Hủy
          </Button>,
          <Button key="ok" type="primary" onClick={handleApplyFilter}>
            Áp dụng
          </Button>,
        ]}
      >
        <Row gutter={[8, 8]}>
          {columns.map(col => (
            <Col span={24} key={col.dataIndex}>
              <div style={{ marginBottom: 8 }}>
                <b>{col.title}</b>
                {/* Nếu có enum/option hoặc lấy từ data thì dùng Select multi, không thì dùng Input */}
                {col.enableFilter ? (
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    allowClear
                    placeholder={`Chọn ${col.title}`}
                    value={filterValues[col.dataIndex] || []}
                    onChange={val => handleFilterChange(col.dataIndex, val)}
                    options={getColumnOptions(col).map(opt => ({ label: opt, value: opt }))}
                  />
                ) : (
                  // Nếu là số thì dùng InputNumber, không thì Input thường
                  typeof dataSource[0]?.[col.dataIndex] === 'number' ? (
                    <InputNumber
                      placeholder={`Lọc ${col.title}`}
                      value={filterValues[col.dataIndex] || ''}
                      onChange={val => handleFilterChange(col.dataIndex, val)}
                      style={{ width: '100%' }}
                      allowClear
                    />
                  ) : (
                    <Input
                      placeholder={`Lọc ${col.title}`}
                      value={filterValues[col.dataIndex] || ''}
                      onChange={e => handleFilterChange(col.dataIndex, e.target.value)}
                    />
                  )
                )}
              </div>
            </Col>
          ))}
        </Row>
      </Modal>
    </div>
  )
}

export default CTable