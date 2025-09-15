import AdminProtect from "@/components/admin/AdminProtects"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"

import "./../globals.css"

export default function DashboardLayout({ children }) {
  return (
    <AdminProtect>
      <SidebarProvider
        defaultOpen={true}
        style={{
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        }}
      >
        {/* Sidebar (persistent) */}
        <AppSidebar variant="inset" />

        {/* Main content area */}
        <SidebarInset>
          <SiteHeader /> {/* ✅ Only once here */}
          <div className="flex flex-1 flex-col p-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </AdminProtect>
  )
}
