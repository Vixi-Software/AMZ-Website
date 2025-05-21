
import { useState, useEffect } from "react"
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
import { ProductForm } from "@/components/product-form"
import { useFirestore } from "@/hooks/useFirestore"
import { db } from "@/lib/firebase"

// Firestore hooks
export default function ProductsPage() {
  const { getAllDocs, addDocData, updateDocData, deleteDocData } = useFirestore(db, "products")
  const [products, setProducts] = useState([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  // Fetch products from Firestore
  useEffect(() => {
    getAllDocs().then(setProducts)
  }, [getAllDocs])

  // Add product
  const handleAdd = async (data) => {
    await addDocData(data)
    setIsAddDialogOpen(false)
    setProducts(await getAllDocs())
  }

  // Edit product
  const handleEditSubmit = async (data) => {
    await updateDocData(selectedProduct.id, data)
    setIsEditDialogOpen(false)
    setProducts(await getAllDocs())
  }

  // Delete product
  const handleDeleteConfirm = async () => {
    await deleteDocData(selectedProduct.id)
    setIsDeleteDialogOpen(false)
    setProducts(await getAllDocs())
  }

  const handleEdit = (product) => {
    setSelectedProduct(product)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (product) => {
    setSelectedProduct(product)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Input type="search" placeholder="Tìm kiếm sản phẩm..." className="w-full pl-8 md:w-[300px]" />
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Thêm sản phẩm
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Thêm sản phẩm mới</DialogTitle>
                <DialogDescription>Điền thông tin sản phẩm mới vào form dưới đây</DialogDescription>
              </DialogHeader>
              <ProductForm onSubmit={handleAdd} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">ID</TableHead>
              <TableHead>Hình ảnh</TableHead>
              <TableHead>Tên sản phẩm</TableHead>
              <TableHead>Thương hiệu</TableHead>
              <TableHead>Danh mục</TableHead>
              <TableHead className="text-right">Giá</TableHead>
              <TableHead className="text-right">Giảm (%)</TableHead>
              <TableHead className="text-center">Trạng thái</TableHead>
              <TableHead>Màu sắc</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.id}</TableCell>
                <TableCell>
                  <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="text-right">{product.price.toLocaleString()}đ</TableCell>
                <TableCell className="text-right">{product.discount_percent}%</TableCell>
                <TableCell className="text-center">{product.status}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {product.color_codes.map((color, idx) => (
                      <span key={idx} className="inline-block w-4 h-4 rounded-full border" style={{ background: color }} />
                    ))}
                  </div>
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
                      <DropdownMenuItem onClick={() => handleEdit(product)}>Chỉnh sửa</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(product)} className="text-red-600">
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

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa sản phẩm</DialogTitle>
            <DialogDescription>Cập nhật thông tin sản phẩm</DialogDescription>
          </DialogHeader>
          {selectedProduct && <ProductForm product={selectedProduct} onSubmit={handleEditSubmit} />}
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa sản phẩm này? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
