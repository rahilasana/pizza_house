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

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem("pizza-orders");

    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (error) {
        console.error("Failed to load orders:", error);
      }
    }
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">
        Orders
      </h1>

      <p className="text-gray-600 mb-8">
        Manage customer orders.
      </p>

      {orders.length === 0 ? (
        <div className="bg-white shadow rounded-xl p-8 text-center">
          <p className="text-gray-500">
            No orders found.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div
              key={order.id || `order-${index}`}
              className="bg-white shadow rounded-xl p-6"
            >
              <div className="flex justify-between items-center mb-5">
                <div>
                  <h2 className="text-xl font-bold">
                    {order.id}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {new Date(order.orderDate).toLocaleString()}
                  </p>
                </div>

                <span className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold">
                  {order.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">
                    Customer
                  </h3>

                  <p>{order.customer.name}</p>
                  <p className="text-gray-500">
                    {order.customer.email}
                  </p>
                  <p className="text-gray-500">
                    {order.customer.phone}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">
                    Delivery
                  </h3>

                  <p>{order.customer.address}</p>
                  <p>
                    {order.customer.city} -{" "}
                    {order.customer.postal}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">
                    Payment
                  </h3>

                  <p>{order.paymentMethod}</p>

                  <p className="text-xl font-bold mt-2">
                    ${order.summary.total.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="border-t mt-6 pt-5">
                <h3 className="font-semibold mb-3">
                  Items
                </h3>

                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between"
                    >
                      <span>
                        {item.name} × {item.quantity}
                      </span>

                      <span>
                        $
                        {(
                          parseFloat(
                            item.price.replace("$", "")
                          ) * item.quantity
                        ).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {order.customer.notes && (
                <div className="border-t mt-5 pt-5">
                  <h3 className="font-semibold mb-1">
                    Order Notes
                  </h3>

                  <p className="text-gray-600">
                    {order.customer.notes}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}