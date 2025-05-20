"use client"

import { useState } from "react"
import { Bell, Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "../ui/sidebar"

export function HeaderAdmin() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <Sidebar />
        </SheetContent>
      </Sheet>

      {isSearchOpen ? (
        <div className="relative flex flex-1 items-center">
          <Input
            type="search"
            placeholder="Tìm kiếm..."
            className="w-full pl-2"
            autoFocus
            onBlur={() => setIsSearchOpen(false)}
          />
        </div>
      ) : (
        <>
          <Button variant="outline" size="icon" className="ml-auto sm:hidden" onClick={() => setIsSearchOpen(true)}>
            <span className="sr-only">Tìm kiếm</span>
          </Button>
          <div className="relative hidden flex-1 sm:block">
            <Input type="search" placeholder="Tìm kiếm..." className="w-full max-w-[300px] pl-2" />
          </div>
        </>
      )}

      <Button variant="outline" size="icon">
        <Bell className="h-4 w-4" />
        <span className="sr-only">Thông báo</span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full">
            <User className="h-4 w-4" />
            <span className="sr-only">Tài khoản</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Hồ sơ</DropdownMenuItem>
          <DropdownMenuItem>Cài đặt</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Đăng xuất</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
