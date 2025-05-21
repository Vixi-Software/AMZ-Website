"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import BlogEditor from "./blog-editor"
import BlogRenderer from "./blog-renderer"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DialogFooter } from "@/components/ui/dialog"

export function BlogPostForm({ post, onSubmit }) {
  const [formData, setFormData] = useState({
    content: post?.content || "",
    status: post?.status || "Nháp",
  })

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
      <div className="flex w-[90vw] max-w-[90vw] gap-8">
        {/* Bên trái: Form nhập */}
        <div className="flex-1 flex flex-col gap-4">
          <div>
            <Label htmlFor="content">Nội dung bài viết</Label>
            <BlogEditor
              content={formData.content}
              onChange={(html) => setFormData((prev) => ({ ...prev, content: html }))}
            />
          </div>
          <div>
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
          <DialogFooter>
            <Button type="submit">Lưu</Button>
          </DialogFooter>
        </div>
        {/* Bên phải: Xem trước */}
        <div className="flex-1 bg-muted rounded-md p-4 overflow-auto">
          <Label className="mb-2 block">Xem trước nội dung:</Label>
          <BlogRenderer html={formData.content} />
        </div>
      </div>
    </form>
  )
}