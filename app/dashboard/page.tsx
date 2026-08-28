"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const totalItems = cartItems.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2 mt-20 text-center">Dashboard</h1>

      <p className="text-gray-600 mb-8 text-center">
        Welcome to Pizza House Admin Dashboard
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-gray-500">Cart Items</h2>
          <p className="text-3xl font-bold mt-2">{totalItems}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-gray-500">Cart Value</h2>
          <p className="text-3xl font-bold mt-2">
            Rs. {totalAmount}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-gray-500">Menu</h2>
          <p className="text-3xl font-bold mt-2">Pizza & BBQ</p>
        </div>
      </div>
    </div>
  );
}