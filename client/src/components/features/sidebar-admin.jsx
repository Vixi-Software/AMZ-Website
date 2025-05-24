"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { BarChart3, FileText, Home, Package, ShoppingCart, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import routePath from "@/constants/routePath"

const sidebarLinks = [
  {
    title: "Sản phẩm",
    href: routePath.adminProduct,
    icon: Package,
  },
  {
    title: "Bài viết",
    href: routePath.adminPost,
    icon: FileText,
  },
  {
    title: "Thêm bài viết",
    href: routePath.adminPostEditor,
    icon: FileText,
  },
]

export function SidebarAdmin() {
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div
      className={cn("flex flex-col border-r bg-background transition-all duration-300", isCollapsed ? "w-16" : "w-64")}
    >
      <div className="flex h-14 items-center border-b px-3">
        <Link to={routePath.adminPost} className="flex items-center gap-2 font-semibold" style={{ textDecoration: "none" }}>
          {!isCollapsed && <span>Quản lí</span>}
          {isCollapsed && <span className="sr-only">Quản lí</span>}
        </Link>
        <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          )}
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </div>
      <nav className="flex-1 overflow-auto p-2">
        <ul className="flex flex-col gap-1 p-0">
          {sidebarLinks.map((link) => (
            <li key={link.href}>
              <Link
              style={{ textDecoration: "none" }}
                to={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors no-underline",
                  location.pathname === link.href
                    ? "bg-primary text-white"
                    : "hover:bg-muted",
                )}
              >
                <link.icon className="h-4 w-4" />
                {!isCollapsed && <span>{link.title}</span>}
                {isCollapsed && <span className="sr-only">{link.title}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
