import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DialogFooter } from "@/components/ui/dialog"

export function ProductForm({ product, onSubmit }) {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    category: product?.category || "",
    price: product?.price || "",
    stock: product?.stock || "",
    description: product?.description || "",
    status: product?.status || "Còn hàng",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Tên sản phẩm</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Danh mục</Label>
            <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Chọn danh mục" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Quần áo">Quần áo</SelectItem>
                <SelectItem value="Giày dép">Giày dép</SelectItem>
                <SelectItem value="Phụ kiện">Phụ kiện</SelectItem>
                <SelectItem value="Đồng hồ">Đồng hồ</SelectItem>
                <SelectItem value="Túi xách">Túi xách</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="price">Giá (VNĐ)</Label>
            <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="stock">Số lượng tồn kho</Label>
            <Input id="stock" name="stock" type="number" value={formData.stock} onChange={handleChange} required />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="status">Trạng thái</Label>
          <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Còn hàng">Còn hàng</SelectItem>
              <SelectItem value="Sắp hết">Sắp hết</SelectItem>
              <SelectItem value="Hết hàng">Hết hàng</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Mô tả sản phẩm</Label>
          <Textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={5} />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Lưu</Button>
      </DialogFooter>
    </form>
  )
}