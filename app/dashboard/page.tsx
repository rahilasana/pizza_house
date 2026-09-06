"use client";

import { useEffect, useState } from "react";

type MenuItem = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
};

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
    image: string;
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

export default function DashboardPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Get Menu Items
    const savedMenu = localStorage.getItem("pizza-menu");

    if (savedMenu) {
      setMenuItems(JSON.parse(savedMenu));
    }

    // Get Orders
    const savedOrders = localStorage.getItem("pizza-orders");

    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Total Menu Items
  const totalMenuItems = menuItems.length;

  // Total Orders
  const totalOrders = orders.length;

  // Total Sales
  const totalSales = orders.reduce(
    (total, order) => total + order.summary.total,
    0
  );

  return (
    <div className="p-6">

      {/* Heading */}
      <h1 className="text-3xl font-bold mb-2 mt-10 text-center text-black">
        Dashboard
      </h1>

      <p className="text-gray-600 mb-8 text-center">
        Welcome to Pizza House Admin Dashboard
      </p>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Total Orders */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-black text-lg font-semibold">
            Total Orders
          </h2>

          <p className="text-3xl font-bold mt-2 text-gray-700">
            {totalOrders}
          </p>
        </div>

        {/* Total Sales */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-black text-lg font-semibold">
            Total Sales
          </h2>

          <p className="text-3xl font-bold mt-2 text-gray-700">
            ${totalSales.toFixed(2)}
          </p>
        </div>

        {/* Menu Items */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-black text-lg font-semibold">
            Menu Items
          </h2>

          <p className="text-3xl font-bold mt-2 text-gray-700">
            {totalMenuItems}
          </p>
        </div>

      </div>
    </div>
  );
}