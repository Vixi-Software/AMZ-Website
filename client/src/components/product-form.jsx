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
    brand: product?.brand || "",
    category: product?.category || "",
    description: product?.description || "",
    image: product?.image || "",
    price: product?.price || "",
    discount_percent: product?.discount_percent || "",
    status: product?.status || "Newseal",
    color_codes: product?.color_codes || [],
  })

  const [previewImage, setPreviewImage] = useState(product?.image || "")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleColorCodesChange = (e) => {
    const value = e.target.value
    setFormData((prev) => ({
      ...prev,
      color_codes: value.split(",").map((c) => c.trim()).filter(Boolean),
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }))
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  const handleImageUrlChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.value }))
    setPreviewImage(e.target.value)
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
            <Label htmlFor="brand">Thương hiệu</Label>
            <Input id="brand" name="brand" value={formData.brand} onChange={handleChange} required />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="category">Danh mục</Label>
            <Input id="category" name="category" value={formData.category} onChange={handleChange} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image">Hình ảnh (URL hoặc tải lên)</Label>
            <Input
              id="image"
              name="image"
              value={typeof formData.image === "string" ? formData.image : ""}
              onChange={handleImageUrlChange}
              placeholder="Dán link ảnh hoặc chọn file"
            />
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2"
            />
            {previewImage && (
              <img src={previewImage} alt="Xem trước" className="w-20 h-20 object-cover rounded mt-2" />
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="price">Giá (VNĐ)</Label>
            <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="discount_percent">Giảm giá (%)</Label>
            <Input id="discount_percent" name="discount_percent" type="number" value={formData.discount_percent} onChange={handleChange} required />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="status">Trạng thái</Label>
          <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Newseal">Newseal</SelectItem>
              <SelectItem value="Cũ">Cũ</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="color_codes">Mã màu (cách nhau bằng dấu phẩy)</Label>
          <Input
            id="color_codes"
            name="color_codes"
            value={formData.color_codes.join(",")}
            onChange={handleColorCodesChange}
            placeholder="#000000,#FFFFFF"
          />
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