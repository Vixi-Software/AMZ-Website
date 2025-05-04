import { Search, MapPin, Phone, RotateCcw, Shield, Truck, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if screen is mobile/tablet
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  const keywords = ["Sony WF-1000XM5", "Sony WF-1000XM4", "Bose QC1", "Bose QC2"]

  return (
    <header className="w-full">
      <div className="hidden lg:flex bg-orange-100 text-orange-600 py-2 px-4">
        <div className="container mx-auto flex lg:flex-row justify-between items-center text-sm">
          <div className="flex items-center mb-2 lg:mb-0">
            <RotateCcw className="h-4 w-4 mr-2" />
            <span>THU CŨ ĐỔI MỚI - LÊN ĐỜI SIÊU PHẨM</span>
          </div>
          <div className="flex items-center mb-2 lg:mb-0">
            <Shield className="h-4 w-4 mr-2" />
            <span>HÀNG CŨ GIÁ RẺ - BẢO HÀNH SIÊU LÂU</span>
          </div>
          <div className="flex items-center">
            <Truck className="h-4 w-4 mr-2" />
            <span>BÁN HÀNG CÓ TÂM - VẬN CHUYỂN CÓ TÂM</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="py-2">
        <div className="md:container md:mx-auto flex items-center justify-between">
          {/* Mobile menu button */}
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDrawer}
              className="md:hidden mr-2"
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5 text-orange-500" />
            </Button>
          )}

          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full border-2 border-gray-200 overflow-hidden">
              <img
                src="https://png.pngtree.com/element_our/sm/20180415/sm_5ad31d9b53530.jpg"
                alt="Logo"
                width={100}
                height={100}
                className="object-cover"
              />
            </div>
          </div>

          {/* Search bar and trending keywords - center column */}
          <div className="hidden md:block flex-grow mx-4 lg:mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Hôm nay bạn muốn tìm kiếm gì?"
                style={{ border: '1px solid #f97316' }}
                className="w-full py-2 px-4 rounded-md focus:outline-none"
              />
              <Button
                variant="ghost"
                className="absolute right-0 top-0 h-full px-4 text-orange-500 hover:bg-transparent rounded-r-md"
              >
                <Search className="h-4 w-4 mr-1" />
                <span>Tìm kiếm</span>
              </Button>
            </div>

            {/* Trending keywords below search */}
            <div className="mt-2 flex flex-wrap items-center">
              <div className="text-orange-500 mr-2 text">Từ khoá xu hướng </div>
              <div className="flex flex-wrap gap-3">
                {keywords.map((keyword) => (
                  <Link
                    to={`/search?q=${encodeURIComponent(keyword)}`}
                    key={keyword}
                    className="text-sm text-black hover:text-orange-500 transition-colors"
                    style={{ textDecoration: "none" }}
                  >
                    {keyword}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile search button */}
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="text-orange-500 md:hidden hover:bg-transparent"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>
          )}

          {/* Contact info */}
          <div className="hidden md:flex items-center divide-x divide-gray-200 space-x-0">
            <Button
              variant="ghost"
              asChild
              className="flex items-center text-orange-500 hover:bg-transparent px-3 py-1  hidden lg:block"
            >
              <div className="lg:flex items-center">
                <MapPin className="h-5 w-5 mr-1" />
                <span className="hidden lg:inline">Tìm cửa hàng</span>
              </div>
            </Button>
            <Button
              variant="ghost"
              asChild
              className="flex items-center text-orange-500 hover:bg-transparent px-3 py-1 hidden lg:block"
            >
              <div className="lg:flex items-center">
                <Phone className="h-5 w-5 mr-1 hidden lg:block" />
                <span className="hidden lg:inline">Zalo: 0333.571.236</span>
              </div>
            </Button>
          </div>
        </div>
      </div>

      {isMobile && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <div
            className={`fixed top-0 left-0 h-full w-3/4 max-w-xs bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="font-bold text-lg">Menu</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDrawer}
                aria-label="Close menu"
                className="hover:bg-transparent"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            <div className="p-4">
              {/* Mobile search */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Hôm nay bạn muốn tìm kiếm gì?"
                    className="w-full py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />

                </div>
                <div className="mt-3">
                  <div className="text-orange-500 mb-2 text-sm">Từ khoá xu hướng:</div>
                  <div className="flex flex-wrap gap-2">
                    {keywords.map((keyword) => (
                      <Link
                        to={`/search?q=${encodeURIComponent(keyword)}`}
                        key={keyword}
                        className="text-sm text-black hover:text-orange-500 transition-colors"

                      >
                        {keyword}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact links in drawer */}
              <div className="space-y-4">
                <Button
                  variant="ghost"
                  asChild
                  className="flex items-center text-orange-500 w-full justify-start hover:bg-transparent "
                >
                  <Link to="/stores" >
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>Tìm cửa hàng</span>
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="flex items-center text-orange-500 w-full justify-start hover:bg-transparent "
                >
                  <Phone className="h-5 w-5 mr-2" />
                  <span>Zalo: 0333.571.236</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}