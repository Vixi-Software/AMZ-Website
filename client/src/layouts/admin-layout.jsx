import { HeaderAdmin } from "@/components/features/header-admin"
import { SidebarAdmin } from "@/components/features/sidebar-admin"
import React from "react"

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <SidebarAdmin />
      <div className="flex flex-col flex-1">
        <HeaderAdmin />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
