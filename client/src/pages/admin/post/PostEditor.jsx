import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import BlogEditor from "@/components/blog-editor"
import BlogRenderer from "@/components/blog-renderer"

function PostEditor() {
  const navigate = useNavigate()
  const [content, setContent] = useState("")
  const [showPreview, setShowPreview] = useState(false) // Thêm state này

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Thêm bài viết mới</h2>
        <Button variant="outline" onClick={() => navigate(-1)}>
          Quay lại
        </Button>
      </div>

      {/* BlogEditor để nhập nội dung */}
      <BlogEditor content={content} onChange={setContent} />

      <div className="mt-8 flex gap-2">
        <Button variant="secondary" onClick={() => setShowPreview(!showPreview)}>
          {showPreview ? "Ẩn xem trước" : "Xem trước"}
        </Button>
      </div>

      {showPreview && (
        <div className="mt-8">
          <h3 className="font-semibold mb-2">Xem trước:</h3>
          {/* BlogRenderer để xem trước nội dung */}
          <BlogRenderer html={content} />
        </div>
      )}
    </div>
  )
}

export default PostEditor