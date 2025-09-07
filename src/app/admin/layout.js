// app/dashboard/layout.js
import AdminProtect from "@/components/admin/AdminProtects";
import "./../globals.css";

export default function DashboardLayout({ children }) {
  return (
    <AdminProtect>
      <div className="flex min-h-screen bg-gray-100">
        {/* Main content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </AdminProtect>
  );
}