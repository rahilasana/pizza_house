"use client";

import { useEffect, useState } from "react";

type InventoryItem = {
  id: number;
  name: string;
  category: string;
  stock: number;
  unit: string;
  status: string;
};

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [unit, setUnit] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);

  // Load Inventory
  useEffect(() => {
    const savedInventory =
      localStorage.getItem("pizza-inventory");

    if (!savedInventory) {
      setInventory([]);
      return;
    }

    try {
      setInventory(JSON.parse(savedInventory));
    } catch (error) {
      console.error(
        "Failed to load inventory:",
        error
      );

      setInventory([]);
    }
  }, []);

  // Get Stock Status
  const getStatus = (stockValue: number) => {
    if (stockValue === 0) {
      return "Out of Stock";
    }

    if (stockValue <= 10) {
      return "Low Stock";
    }

    return "In Stock";
  };

  // Add / Update Item
  const handleSubmit = (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    if (!name || !category || !stock || !unit) {
      alert("Please fill all fields.");
      return;
    }

    const stockNumber = Number(stock);

    if (stockNumber < 0) {
      alert("Stock cannot be negative.");
      return;
    }

    const status = getStatus(stockNumber);

    // Update existing item
    if (editingId !== null) {
      const updatedInventory = inventory.map(
        (item) =>
          item.id === editingId
            ? {
                ...item,
                name,
                category,
                stock: stockNumber,
                unit,
                status,
              }
            : item
      );

      setInventory(updatedInventory);

      localStorage.setItem(
        "pizza-inventory",
        JSON.stringify(updatedInventory)
      );

      setEditingId(null);
    }

    // Add new item
    else {
      const newItem: InventoryItem = {
        id: Date.now(),
        name,
        category,
        stock: stockNumber,
        unit,
        status,
      };

      const updatedInventory = [
        ...inventory,
        newItem,
      ];

      setInventory(updatedInventory);

      localStorage.setItem(
        "pizza-inventory",
        JSON.stringify(updatedInventory)
      );
    }

    // Clear form
    setName("");
    setCategory("");
    setStock("");
    setUnit("");
  };

  // Edit Item
  const handleEdit = (
    item: InventoryItem
  ) => {
    setEditingId(item.id);

    setName(item.name);
    setCategory(item.category);
    setStock(item.stock.toString());
    setUnit(item.unit);
  };

  // Cancel Edit
  const handleCancel = () => {
    setEditingId(null);

    setName("");
    setCategory("");
    setStock("");
    setUnit("");
  };

  // Delete Item
  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!confirmDelete) return;

    const updatedInventory =
      inventory.filter(
        (item) => item.id !== id
      );

    setInventory(updatedInventory);

    localStorage.setItem(
      "pizza-inventory",
      JSON.stringify(updatedInventory)
    );
  };

  return (
    <div className="text-black">

      {/* Header */}
      <div className="mb-8">

        <h1 className="text-3xl font-bold text-black">
          Inventory
        </h1>

        <p className="text-gray-600 mt-2">
          Track and manage your stock.
        </p>

      </div>

      {/* Add / Edit Form */}
      <div className="bg-white shadow rounded-xl p-5 mb-8">

        <h2 className="text-lg font-semibold text-black mb-4">
          {editingId !== null
            ? "Edit Inventory Item"
            : "Add Inventory Item"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >

          {/* Item Name */}
          <div>

            <label className="block mb-2 font-medium text-black">
              Item Name
            </label>

            <input
              type="text"
              placeholder="e.g. Mozzarella Cheese"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black placeholder-gray-400 outline-none focus:ring-2 focus:ring-black"
            />

          </div>

          {/* Category */}
          <div>

            <label className="block mb-2 font-medium text-black">
              Category
            </label>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black outline-none focus:ring-2 focus:ring-black"
            >

              <option value="">
                Select Category
              </option>

              <option value="Ingredients">
                Ingredients
              </option>

              <option value="Drinks">
                Drinks
              </option>

              <option value="Packaging">
                Packaging
              </option>

              <option value="Other">
                Other
              </option>

            </select>

          </div>

          {/* Stock */}
          <div>

            <label className="block mb-2 font-medium text-black">
              Stock Quantity
            </label>

            <input
              type="number"
              min="0"
              placeholder="e.g. 25"
              value={stock}
              onChange={(e) =>
                setStock(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black placeholder-gray-400 outline-none focus:ring-2 focus:ring-black"
            />

          </div>

          {/* Unit */}
          <div>

            <label className="block mb-2 font-medium text-black">
              Unit
            </label>

            <select
              value={unit}
              onChange={(e) =>
                setUnit(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black outline-none focus:ring-2 focus:ring-black"
            >

              <option value="">
                Select Unit
              </option>

              <option value="kg">
                kg
              </option>

              <option value="liters">
                liters
              </option>

              <option value="pieces">
                pieces
              </option>

              <option value="bottles">
                bottles
              </option>

              <option value="boxes">
                boxes
              </option>

            </select>

          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex gap-3 pt-2">

            <button
              type="submit"
              className="bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              {editingId !== null
                ? "Update Item"
                : "+ Add Item"}
            </button>

            {editingId !== null && (
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-200 text-gray-800 px-5 py-3 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            )}

          </div>

        </form>

      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">

        {/* Total Items */}
        <div className="bg-white shadow rounded-xl p-5">

          <p className="text-gray-500 text-sm">
            Total Items
          </p>

          <h2 className="text-2xl font-bold mt-2 text-black">
            {inventory.length}
          </h2>

        </div>

        {/* In Stock */}
        <div className="bg-white shadow rounded-xl p-5">

          <p className="text-gray-500 text-sm">
            In Stock
          </p>

          <h2 className="text-2xl font-bold mt-2 text-black">
            {
              inventory.filter(
                (item) =>
                  item.status === "In Stock"
              ).length
            }
          </h2>

        </div>

        {/* Low Stock */}
        <div className="bg-white shadow rounded-xl p-5">

          <p className="text-gray-500 text-sm">
            Low Stock
          </p>

          <h2 className="text-2xl font-bold mt-2 text-black">
            {
              inventory.filter(
                (item) =>
                  item.status === "Low Stock"
              ).length
            }
          </h2>

        </div>

      </div>

      {/* Inventory Table */}
      <div className="bg-white shadow rounded-xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="text-left px-6 py-4 text-black">
                  Item
                </th>

                <th className="text-left px-6 py-4 text-black">
                  Category
                </th>

                <th className="text-left px-6 py-4 text-black">
                  Stock
                </th>

                <th className="text-left px-6 py-4 text-black">
                  Status
                </th>

                <th className="text-left px-6 py-4 text-black">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {inventory.length === 0 ? (

                <tr>

                  <td
                    colSpan={5}
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    No inventory items found.
                  </td>

                </tr>

              ) : (

                inventory.map((item) => (

                  <tr
                    key={item.id}
                    className="border-t hover:bg-gray-50"
                  >

                    {/* Item */}
                    <td className="px-6 py-4 font-semibold text-black">
                      {item.name}
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4 text-gray-600">
                      {item.category}
                    </td>

                    {/* Stock */}
                    <td className="px-6 py-4 text-black">
                      {item.stock} {item.unit}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          item.status === "In Stock"
                            ? "bg-green-100 text-green-700"
                            : item.status === "Low Stock"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.status}
                      </span>

                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">

                      <div className="flex gap-3">

                        <button
                          onClick={() =>
                            handleEdit(item)
                          }
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(item.id)
                          }
                          className="text-red-600 hover:text-red-800 font-medium"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}