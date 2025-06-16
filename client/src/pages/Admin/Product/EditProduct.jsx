import React, { useState } from 'react'
import { Form, Input, Select, Button, message } from 'antd'
import { useSelector } from 'react-redux'
import { useProductHelper } from '../../../utils/productHelper'
import { useFirestore } from '../../../hooks/useFirestore'
import { db } from '../../../utils/firebase'

const { Option } = Select

function EditProduct() {
  const reduxProduct = useSelector(state => state.product.product)
  const product = reduxProduct || (() => {
    try {
      const local = localStorage.getItem('selectedProduct')
      return local ? JSON.parse(local) : null
    } catch {
      return null
    }
  })()
  const [form] = Form.useForm()
  const [imageLinks, setImageLinks] = useState(product?.image?.length ? product.image : [''])
  const { updateProduct } = useProductHelper()
  const { getAllDocs: getBrands } = useFirestore(db, 'brands')
  const { getAllDocs: getColors } = useFirestore(db, 'colors')
  const { getAllDocs: getCategories } = useFirestore(db, 'categories')

  const [brands, setBrands] = useState([])
  const [colors, setColors] = useState([])
  const [categories, setCategories] = useState([])

  const handleImageLinkChange = (index, value) => {
    const newLinks = [...imageLinks]
    newLinks[index] = value
    setImageLinks(newLinks)
  }

  const handleAddImageLink = () => {
    setImageLinks([...imageLinks, ''])
  }

  const handleSave = async () => {
    try {
      const values = await form.validateFields()
      // Tìm tên danh mục dựa trên id đã chọn
      const selectedCategory = categories.find(cat => cat.id === values.category)
      const updatedProduct = {
        ...product,
        ...values,
        category: selectedCategory ? selectedCategory.name : '', // Lưu tên danh mục
        image: imageLinks,
      }
      await updateProduct(product.id, updatedProduct)
      message.success('Cập nhật sản phẩm thành công!', updatedProduct.name)
    } catch (err) {
      message.error('Cập nhật thất bại!', err.message)
    }
  }

  // Gán dữ liệu vào form
  React.useEffect(() => {
    if (product) {
      form.setFieldsValue({
        name: product.name || '',
        category: product.category_code || '', // dùng category_code nếu là id
        sku: product.Barcode || '',
        weight: product.weight || '', // nếu có
        retailPrice: product.Ban_Le_Value || '',
        wholesalePrice: product.wholesalePrice || '', // nếu có
        importPrice: product.importPrice || '', // nếu có
        salePrice: product.salePrice || '', // nếu có
        brand: product.brand || '',
        color: product.color?.[0] || '',
        Product_condition: product.Product_condition || '',
        tags: product.tags || '',
        description: product.description || '',
      })
      setImageLinks(product.image?.length ? product.image : [''])
    }
  }, [])

  React.useEffect(() => {
    getBrands().then(setBrands)
    getColors().then(setColors)
    getCategories().then(setCategories)
  }, [getBrands, getColors, getCategories])

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Thông tin chung</h2>
        <div>
          <Button className="mr-2 border-orange-300 text-orange-500" ghost>Thoát</Button>
          <Button type="primary" className="bg-orange-500 border-orange-500" onClick={handleSave}>Lưu</Button>
        </div>
      </div>
      <Form layout="vertical" form={form}>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 grid grid-cols-2 gap-4">
            <Form.Item label="Tên sản phẩm" name="name">
              <Input placeholder="Nhập tên sản phẩm" />
            </Form.Item>
            <Form.Item label="Loại sản phẩm" name="category">
              <Select placeholder="Chọn loại sản phẩm" allowClear>
                {categories.map(cat => (
                  <Option key={cat.id} value={cat.id}>{cat.name}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Mã sản phẩm / SKU" name="sku">
              <Input />
            </Form.Item>
            <Form.Item label="Khối lượng" name="weight">
              <div className="flex">
                <Input className="w-2/3" />
                <Select className="w-1/3 ml-2" defaultValue="g">
                  <Option value="g">g</Option>
                  <Option value="kg">kg</Option>
                </Select>
              </div>
            </Form.Item>
            <Form.Item label="Giá bán lẻ" name="retailPrice">
              <Input />
            </Form.Item>
            <Form.Item label="Giá bán sỉ" name="wholesalePrice">
              <Input />
            </Form.Item>
            <Form.Item label="Giá nhập" name="importPrice">
              <Input />
            </Form.Item>
            <Form.Item label="Giá sale" name="salePrice">
              <Input />
            </Form.Item>
            <Form.Item label="Nhãn hiệu" name="brand">
              <Select placeholder="Chọn nhãn hiệu" allowClear>
                {brands.map(brand => (
                  <Option key={brand.id} value={brand.id}>{brand.name}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Chọn màu" name="color">
              <Select placeholder="Chọn màu" allowClear>
                {colors.map(color => (
                  <Option key={color.id} value={color.id}>{color.name}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Tình trạng sản phẩm" name="Product_condition">
              <Select placeholder="Chọn tình trạng" allowClear>
                <Option value="99-98% Nobox">99-98% Nobox</Option>
                <Option value="available">Còn hàng</Option>
                <Option value="out_of_stock">Hết hàng</Option>
                <Option value="coming_soon">Sắp về</Option>
              </Select>
            </Form.Item>
          </div>
          <div className="col-span-1">
            <Form.Item label="Ảnh sản phẩm">
              {imageLinks.map((link, idx) => (
                <div key={idx} className="flex mb-2">
                  <Input
                    placeholder="Dán link ảnh"
                    value={link}
                    onChange={e => handleImageLinkChange(idx, e.target.value)}
                  />
                  <Button
                    danger
                    type="link"
                    onClick={() => setImageLinks(imageLinks.filter((_, i) => i !== idx))}
                    style={{ marginLeft: 8 }}
                    disabled={imageLinks.length === 1}
                  >
                    Xóa
                  </Button>
                </div>
              ))}
              <Button type="dashed" onClick={handleAddImageLink} className="mt-2 w-full">
                Thêm link ảnh
              </Button>
            </Form.Item>
            <Form.Item label="Tags" name="tags">
              <Input.TextArea rows={8} />
            </Form.Item>
            <Form.Item label="Mô tả sản phẩm" name="description">
              <Input.TextArea rows={4} placeholder="Nhập mô tả sản phẩm" />
            </Form.Item>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block font-medium mb-2">Chi nhánh</label>
            <div className="flex flex-col gap-2">
              <span>ĐÀ NẴNG</span>
              <span>HÀ NỘI</span>
            </div>
          </div>
          <div>
            <label className="block font-medium mb-2">Tồn kho ban đầu</label>
            <div className="flex flex-col gap-2">
              <Input defaultValue={product?.DaNang || 0} />
              <Input defaultValue={product?.HaNoi || 0} />
            </div>
          </div>
          <div>
            <label className="block font-medium mb-2">Giá vốn</label>
            <div className="flex flex-col gap-2">
              <Input defaultValue={0} />
              <Input defaultValue={0} />
            </div>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default EditProduct