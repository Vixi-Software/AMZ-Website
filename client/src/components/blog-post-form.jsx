"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DialogFooter } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"

export function BlogPostForm({ post, onSubmit }) {
  const [formData, setFormData] = useState({
    title: post?.title || "",
    author: post?.author || "",
    category: post?.category || "",
    content: post?.content || "",
    status: post?.status || "Nháp",
    featured: post?.featured || false,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name, checked) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form data:", formData)
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Tiêu đề bài viết</Label>
          <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="author">Tác giả</Label>
            <Input id="author" name="author" value={formData.author} onChange={handleChange} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Danh mục</Label>
            <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Chọn danh mục" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Thời trang">Thời trang</SelectItem>
                <SelectItem value="Phụ kiện">Phụ kiện</SelectItem>
                <SelectItem value="Làm đẹp">Làm đẹp</SelectItem>
                <SelectItem value="Xu hướng">Xu hướng</SelectItem>
                <SelectItem value="Mẹo vặt">Mẹo vặt</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="content">Nội dung bài viết</Label>
          <Textarea id="content" name="content" value={formData.content} onChange={handleChange} rows={10} required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="status">Trạng thái</Label>
            <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Nháp">Nháp</SelectItem>
                <SelectItem value="Đã đăng">Đã đăng</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end gap-2 pb-2">
            <Checkbox
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) => handleCheckboxChange("featured", checked)}
            />
            <Label htmlFor="featured">Bài viết nổi bật</Label>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Lưu</Button>
      </DialogFooter>
    </form>
  )
}