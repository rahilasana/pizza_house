import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-8 pt-26">Admin Dashboard</h2>

        <nav className="flex flex-col gap-4">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/dashboard/menu">Menu</Link>
          <Link href="/dashboard/orders">Orders</Link>
          <Link href="/">Back to Website</Link>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}