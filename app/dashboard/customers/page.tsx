"use client";

import { useEffect, useState } from "react";

type Customer = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postal: string;
};

type Order = {
  id: string;
  customer: Customer;
  summary: {
    total: number;
  };
  orderDate: string;
};

type CustomerData = {
  customer: Customer;
  ordersCount: number;
  totalSpent: number;
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const savedOrders = localStorage.getItem("pizza-orders");

    if (!savedOrders) {
      setCustomers([]);
      return;
    }

    try {
      const orders: Order[] = JSON.parse(savedOrders);

      const customerMap = new Map<string, CustomerData>();

      orders.forEach((order) => {
        const customer = order.customer;

        const customerKey = customer.email.toLowerCase().trim();

        if (customerMap.has(customerKey)) {
          const existingCustomer = customerMap.get(customerKey)!;

          existingCustomer.ordersCount += 1;
          existingCustomer.totalSpent += order.summary.total;
        } else {
          customerMap.set(customerKey, {
            customer: customer,
            ordersCount: 1,
            totalSpent: order.summary.total,
          });
        }
      });

      setCustomers(Array.from(customerMap.values()));
    } catch (error) {
      console.error("Failed to load customers:", error);
      setCustomers([]);
    }
  }, []);

  // Search customers
  const filteredCustomers = customers.filter((item) => {
    const customer = item.customer;

    return `${customer.name} ${customer.email} ${customer.phone}`
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  return (
    <div className="text-black">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black">
          Customers
        </h1>

        <p className="text-gray-600 mt-2">
          Manage your customers.
        </p>
      </div>

      {/* Search */}
      <div className="bg-white shadow rounded-xl p-5 mb-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">

        <input
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 border border-gray-300 rounded-lg px-4 py-3 text-black placeholder-gray-500 outline-none focus:ring-2 focus:ring-black"
        />

        <div className="text-gray-700">
          Total Customers:{" "}
          <span className="font-bold text-black">
            {customers.length}
          </span>
        </div>

      </div>

      {/* Customers Table */}
      {filteredCustomers.length === 0 ? (

        <div className="bg-white shadow rounded-xl p-10 text-center">
          <p className="text-gray-500">
            No customers found.
          </p>
        </div>

      ) : (

        <div className="bg-white shadow rounded-xl overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full text-black">

              {/* Table Header */}
              <thead className="bg-gray-100 text-black">

                <tr>

                  <th className="text-left px-6 py-4 font-semibold">
                    Customer
                  </th>

                  <th className="text-left px-6 py-4 font-semibold">
                    Email
                  </th>

                  <th className="text-left px-6 py-4 font-semibold">
                    Phone
                  </th>

                  <th className="text-left px-6 py-4 font-semibold">
                    Orders
                  </th>

                  <th className="text-left px-6 py-4 font-semibold">
                    Total Spent
                  </th>

                  <th className="text-left px-6 py-4 font-semibold">
                    Address
                  </th>

                </tr>

              </thead>

              {/* Table Body */}
              <tbody>

                {filteredCustomers.map((item) => {
                  const customer = item.customer;

                  return (
                    <tr
                      key={customer.email}
                      className="border-t border-gray-200 hover:bg-gray-50"
                    >

                      {/* Customer Name */}
                      <td className="px-6 py-4 text-black">
                        <p className="font-semibold text-black">
                          {customer.name}
                        </p>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-4 text-gray-700">
                        {customer.email}
                      </td>

                      {/* Phone */}
                      <td className="px-6 py-4 text-gray-700">
                        {customer.phone}
                      </td>

                      {/* Orders Count */}
                      <td className="px-6 py-4 text-black">
                        <span className="font-semibold">
                          {item.ordersCount}
                        </span>
                      </td>

                      {/* Total Spent */}
                      <td className="px-6 py-4 text-black">
                        <span className="font-semibold">
                          ${item.totalSpent.toFixed(2)}
                        </span>
                      </td>

                      {/* Address */}
                      <td className="px-6 py-4 text-gray-700">

                        <p className="text-gray-700">
                          {customer.address}
                        </p>

                        <p className="text-sm text-gray-500">
                          {customer.city} - {customer.postal}
                        </p>

                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>

          </div>

        </div>

      )}

    </div>
  );
}