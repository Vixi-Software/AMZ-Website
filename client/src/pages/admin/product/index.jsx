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
import { MoreHorizontal, Plus, ChevronLeft, ChevronRight, Filter, SortAsc } from "lucide-react"
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
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterBrand, setFilterBrand] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterPriceMin, setFilterPriceMin] = useState("")
  const [filterPriceMax, setFilterPriceMax] = useState("")

  // Fetch products from Firestore
  useEffect(() => {
    getAllDocs().then(setProducts)
  }, []) // chỉ chạy 1 lần khi mount

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

  // Lấy danh sách brand và category duy nhất từ products
  const brands = Array.from(new Set(products.map(p => p.brand))).filter(Boolean)
  const categories = Array.from(new Set(products.map(p => p.category))).filter(Boolean)

  // Filter, search, sort
  const filteredProducts = products
    .filter((p) =>
      (filterStatus === "all" || p.status === filterStatus) &&
      (filterBrand === "all" || p.brand === filterBrand) &&
      (filterCategory === "all" || p.category === filterCategory) &&
      (filterPriceMin === "" || p.price >= Number(filterPriceMin)) &&
      (filterPriceMax === "" || p.price <= Number(filterPriceMax)) &&
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      let aValue = a[sortBy]
      let bValue = b[sortBy]
      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1
      return 0
    })

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / rowsPerPage)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  )

  // Handle rows per page change
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value))
    setCurrentPage(1)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 sm:gap-6">
        {/* Thanh điều khiển trên cùng */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Bên trái: Nút thêm sản phẩm */}
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
          {/* Bên phải: Search + Filter */}
          <div className="flex items-center gap-2">
            <Input
              type="search"
              placeholder="Tìm kiếm tên sản phẩm..."
              className="w-full pl-8 md:w-[220px]"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setCurrentPage(1)
              }}
            />
            {/* Nút mở dialog filter/sort với icon */}
            <Button
              variant="outline"
              className="flex items-center justify-center"
              onClick={() => setIsFilterDialogOpen(true)}
              title="Bộ lọc & Sắp xếp"
            >
              <Filter className="w-5 h-5" />
              <SortAsc className="w-5 h-5 ml-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* Dialog filter/sort */}
      <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Bộ lọc & Sắp xếp</DialogTitle>
          </DialogHeader>
          {/* --- FILTER SECTION --- */}
          <div className="mb-6">
            <div className="font-semibold mb-3 text-base">Bộ lọc sản phẩm</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <label className="flex flex-col text-sm font-medium gap-1">
                Thương hiệu
                <select
                  value={filterBrand}
                  onChange={(e) => {
                    setFilterBrand(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="border rounded px-2 py-1"
                >
                  <option value="all">Tất cả thương hiệu</option>
                  {brands.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col text-sm font-medium gap-1">
                Danh mục
                <select
                  value={filterCategory}
                  onChange={(e) => {
                    setFilterCategory(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="border rounded px-2 py-1"
                >
                  <option value="all">Tất cả danh mục</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col text-sm font-medium gap-1">
                Trạng thái
                <select
                  value={filterStatus}
                  onChange={(e) => {
                    setFilterStatus(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="border rounded px-2 py-1"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="Cũ">Cũ</option>
                  <option value="Newseal">Newseal</option>
                </select>
              </label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex flex-col text-sm font-medium gap-1">
                Giá từ
                <Input
                  type="number"
                  placeholder="Tối thiểu"
                  className="w-full"
                  value={filterPriceMin}
                  onChange={(e) => {
                    setFilterPriceMin(e.target.value)
                    setCurrentPage(1)
                  }}
                  min={0}
                />
              </label>
              <label className="flex flex-col text-sm font-medium gap-1">
                Giá đến
                <Input
                  type="number"
                  placeholder="Tối đa"
                  className="w-full"
                  value={filterPriceMax}
                  onChange={(e) => {
                    setFilterPriceMax(e.target.value)
                    setCurrentPage(1)
                  }}
                  min={0}
                />
              </label>
            </div>
          </div>
          {/* --- SORT SECTION --- */}
          <div className="mb-4">
            <div className="font-semibold mb-3 text-base">Sắp xếp sản phẩm</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="name">Tên sản phẩm</option>
                  <option value="price">Giá</option>
                  <option value="discount_percent">Giảm giá (%)</option>
                </select>
                              <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="asc">Tăng dần</option>
                  <option value="desc">Giảm dần</option>
                </select> 
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFilterDialogOpen(false)}>
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
            {paginatedProducts.map((product) => (
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

      {/* Pagination controls */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <span>Hiển thị</span>
          <select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="border rounded px-2 py-1"
          >
            {[5, 10, 20, 50].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
          <span>sản phẩm/trang</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span>
            Trang {currentPage} / {totalPages || 1}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
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
