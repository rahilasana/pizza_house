"use client";

import { useEffect, useState } from "react";

type Order = {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postal: string;
    notes: string;
  };
  paymentMethod: string;
  items: {
    name: string;
    price: string;
    quantity: number;
  }[];
  summary: {
    subtotal: number;
    delivery: number;
    tax: number;
    total: number;
  };
  status: string;
  orderDate: string;
};

type MonthlyReport = {
  id: number;
  month: string;
  orders: number;
  revenue: number;
  customers: number;
  status: string;
};

export default function ReportsPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedOrders = localStorage.getItem("pizza-orders");

    if (savedOrders) {
      try {
        const parsedOrders: Order[] = JSON.parse(savedOrders);
        setOrders(parsedOrders);
      } catch (error) {
        console.error("Failed to load orders:", error);
        setOrders([]);
      }
    }

    setIsLoaded(true);
  }, []);

  // Total Orders
  const totalOrders = orders.length;

  // Total Revenue
  const totalRevenue = orders.reduce(
    (total, order) => total + Number(order.summary.total || 0),
    0
  );

  // Unique Customers
  const uniqueCustomers = new Set(
    orders.map((order) => order.customer.email)
  );

  const totalCustomers = uniqueCustomers.size;

  // Monthly Reports
  const monthlyData: Record<
    string,
    {
      orders: number;
      revenue: number;
      customers: Set<string>;
    }
  > = {};

  orders.forEach((order) => {
    const date = new Date(order.orderDate);

    const month = date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    if (!monthlyData[month]) {
      monthlyData[month] = {
        orders: 0,
        revenue: 0,
        customers: new Set(),
      };
    }

    monthlyData[month].orders += 1;

    monthlyData[month].revenue += Number(
      order.summary.total || 0
    );

    monthlyData[month].customers.add(
      order.customer.email
    );
  });

  const reports: MonthlyReport[] = Object.entries(monthlyData)
    .map(([month, data], index) => ({
      id: index + 1,
      month,
      orders: data.orders,
      revenue: data.revenue,
      customers: data.customers.size,
      status: "Completed",
    }))
    .sort(
      (a, b) =>
        new Date(`1 ${b.month}`).getTime() -
        new Date(`1 ${a.month}`).getTime()
    );

  const maxOrders =
    reports.length > 0
      ? Math.max(...reports.map((report) => report.orders))
      : 1;

  const handleGenerateReport = () => {
    alert(
      `Report generated successfully!\n\nOrders: ${totalOrders}\nRevenue: $${totalRevenue.toFixed(
        2
      )}\nCustomers: ${totalCustomers}`
    );
  };

  return (
    <div>
      {/* Header */}

      <div className="flex flex-col gap-4 mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Reports
          </h1>

          <p className="text-gray-600 mt-2">
            View your sales and business performance.
          </p>
        </div>

        <button
          onClick={handleGenerateReport}
          className="bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Generate Report
        </button>
      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {/* Total Orders */}

        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-gray-500 text-sm">
            Total Orders
          </p>

          <h2 className="text-3xl font-bold mt-2 text-gray-900">
            {isLoaded ? totalOrders : "..."}
          </h2>

          <p className="text-sm text-green-600 mt-2">
            All time orders
          </p>
        </div>

        {/* Total Revenue */}

        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-gray-500 text-sm">
            Total Revenue
          </p>

          <h2 className="text-3xl font-bold mt-2 text-gray-900">
            ${totalRevenue.toFixed(2)}
          </h2>

          <p className="text-sm text-green-600 mt-2">
            Total sales
          </p>
        </div>

        {/* Customers */}

        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-gray-500 text-sm">
            Customers
          </p>

          <h2 className="text-3xl font-bold mt-2 text-gray-900">
            {isLoaded ? totalCustomers : "..."}
          </h2>

          <p className="text-sm text-green-600 mt-2">
            Unique customers
          </p>
        </div>
      </div>

      {/* Monthly Performance */}

      <div className="bg-white shadow rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold mb-6 text-gray-900">
          Monthly Performance
        </h2>

        {reports.length > 0 ? (
          <div className="space-y-6">
            {reports.map((report) => {
              const width =
                (report.orders / maxOrders) * 100;

              return (
                <div key={report.id}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-gray-900">
                      {report.month}
                    </span>

                    <span className="text-gray-500">
                      {report.orders} orders
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-black h-3 rounded-full transition-all"
                      style={{
                        width: `${width}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-10 text-center">
            <p className="text-gray-500">
              No order data available yet.
            </p>
          </div>
        )}
      </div>

      {/* Reports Table */}

      <div className="bg-white shadow rounded-xl overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900">
            Sales Reports
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-6 py-4">
                  Month
                </th>

                <th className="text-left px-6 py-4">
                  Orders
                </th>

                <th className="text-left px-6 py-4">
                  Revenue
                </th>

                <th className="text-left px-6 py-4">
                  Customers
                </th>

                <th className="text-left px-6 py-4">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {reports.map((report) => (
                <tr
                  key={report.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-semibold">
                    {report.month}
                  </td>

                  <td className="px-6 py-4">
                    {report.orders}
                  </td>

                  <td className="px-6 py-4 font-semibold">
                    ${report.revenue.toFixed(2)}
                  </td>

                  <td className="px-6 py-4">
                    {report.customers}
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                      {report.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {reports.length === 0 && (
            <div className="p-10 text-center">
              <p className="text-gray-500">
                No sales reports available yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}