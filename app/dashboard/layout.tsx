import Link from "next/link";
import { Pizza } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className=" w-64 min-h-screen bg-[#111111] text-white ">
        {/* Logo / Title */}
        <div className="mb-10 mt-4 pl-2">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-[#c89b6d]">
            
            <Pizza size={24} strokeWidth={2} />
            <span>Pizza House</span>
          </h2>

          <p className="text-sm text-gray-400 mt-6">Admin Panel</p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          <Link
            href="/dashboard"
            className="px-4 py-3 rounded-lg hover:bg-white/10 transition"
          >
            Dashboard
          </Link>

          <Link
            href="/dashboard/menu"
            className="px-4 py-3 rounded-lg hover:bg-white/10 transition"
          >
            Menu
          </Link>

          <Link
            href="/dashboard/orders"
            className="px-4 py-3 rounded-lg hover:bg-white/10 transition"
          >
            Orders
          </Link>

          <Link
            href="/dashboard/customers"
            className="px-4 py-3 rounded-lg hover:bg-white/10 transition"
          >
            Customers
          </Link>

          <Link
            href="/dashboard/categories"
            className="px-4 py-3 rounded-lg hover:bg-white/10 transition"
          >
            Categories
          </Link>

          <Link
            href="/dashboard/inventory"
            className="px-4 py-3 rounded-lg hover:bg-white/10 transition"
          >
            Inventory
          </Link>

          <Link
            href="/dashboard/offers"
            className="px-4 py-3 rounded-lg hover:bg-white/10 transition"
          >
            Offers
          </Link>

          <Link
            href="/dashboard/reviews"
            className="px-4 py-3 rounded-lg hover:bg-white/10 transition"
          >
            Reviews
          </Link>

          <Link
            href="/dashboard/reports"
            className="px-4 py-3 rounded-lg hover:bg-white/10 transition"
          >
            Reports
          </Link>

          <div className="border-t border-white/10 my-5" />

          <Link
            href="/dashboard/settings"
            className="px-4 py-3 rounded-lg hover:bg-white/10 transition"
          >
            Settings
          </Link>

          <Link
            href="/"
            className="px-4 py-3 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition"
          >
            ← Back to Website
          </Link>
        </nav>
      </aside>

      {/* Right Side Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
