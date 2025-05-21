"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MoreHorizontal, Plus } from "lucide-react"
import { BlogPostForm } from "@/components/blog-post-form"

// Dữ liệu mẫu
const blogPosts = [
  {
    id: "1",
    title: "Top 10 xu hướng thời trang mùa hè 2023",
    status: "Đã đăng",
    date: "15/04/2023",
    content: "<p>Đây là nội dung <b>HTML</b> mẫu.</p>",
  },
  {
    id: "2",
    title: "Cách phối đồ cho nam giới công sở",
    status: "Đã đăng",
    date: "22/04/2023",
    content: "<p>Hướng dẫn phối đồ <i>cho nam</i>.</p>",
  },
  {
    id: "3",
    title: "Bí quyết chọn giày phù hợp với dáng người",
    author: "Lê Văn C",
    category: "Phụ kiện",
    status: "Đã đăng",
    date: "05/05/2023",
    views: 750,
  },
  {
    id: "4",
    title: "Chăm sóc túi xách da đúng cách",
    author: "Phạm Thị D",
    category: "Phụ kiện",
    status: "Nháp",
    date: "12/05/2023",
    views: 0,
  },
  {
    id: "5",
    title: "Xu hướng thời trang bền vững",
    author: "Hoàng Văn E",
    category: "Thời trang",
    status: "Nháp",
    date: "20/05/2023",
    views: 0,
  },
]

export default function BlogPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)

  // Xử lý khi nhấn chỉnh sửa
  const handleEdit = (post) => {
    setSelectedPost(post)
    setIsEditDialogOpen(true)
  }

  // Xử lý khi nhấn xóa
  const handleDelete = (post) => {
    setSelectedPost(post)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Header và thanh tìm kiếm */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Quản lý bài viết</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Input
              type="search"
              placeholder="Tìm kiếm bài viết..."
              className="w-full pl-8 md:w-[300px]"
            />
          </div>
          {/* Nút thêm bài viết */}
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Thêm bài viết
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Thêm bài viết mới</DialogTitle>
                <DialogDescription>
                  Điền thông tin bài viết mới vào form dưới đây
                </DialogDescription>
              </DialogHeader>
              <BlogPostForm onSubmit={() => setIsAddDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Bảng danh sách bài viết */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">ID</TableHead>
              <TableHead>Tiêu đề</TableHead>
              <TableHead className="text-center">Trạng thái</TableHead>
              <TableHead>Ngày đăng</TableHead>
              <TableHead>Nội dung</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.id}</TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell className="text-center">
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      post.status === "Đã đăng"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {post.status}
                  </div>
                </TableCell>
                <TableCell>{post.date}</TableCell>
                <TableCell>
                  <div
                    className="prose max-w-xs"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Mở menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleEdit(post)}>
                        Chỉnh sửa
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(post)}
                        className="text-red-600"
                      >
                        Xóa
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Dialog chỉnh sửa */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa bài viết</DialogTitle>
            <DialogDescription>Cập nhật thông tin bài viết</DialogDescription>
          </DialogHeader>
          {selectedPost && (
            <BlogPostForm
              post={selectedPost}
              onSubmit={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog xác nhận xóa */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa bài viết này? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(false)}>
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
