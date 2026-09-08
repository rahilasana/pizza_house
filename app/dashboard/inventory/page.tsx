"use client";

import { useEffect, useState } from "react";

type InventoryItem = {
  id: string;
  name: string;
  category: string;
  stock: number;
  unit: string;
  status: string;
};

const defaultInventory: InventoryItem[] = [
  {
    id: "inventory-mozzarella",
    name: "Mozzarella Cheese",
    category: "Ingredients",
    stock: 25,
    unit: "kg",
    status: "In Stock",
  },
  {
    id: "inventory-chicken",
    name: "Chicken",
    category: "Ingredients",
    stock: 8,
    unit: "kg",
    status: "Low Stock",
  },
  {
    id: "inventory-pizza-dough",
    name: "Pizza Dough",
    category: "Ingredients",
    stock: 50,
    unit: "pieces",
    status: "In Stock",
  },
  {
    id: "inventory-tomato-sauce",
    name: "Tomato Sauce",
    category: "Ingredients",
    stock: 20,
    unit: "kg",
    status: "In Stock",
  },
  {
    id: "inventory-burger-buns",
    name: "Burger Buns",
    category: "Ingredients",
    stock: 30,
    unit: "pieces",
    status: "In Stock",
  },
  {
    id: "inventory-cola",
    name: "Cola",
    category: "Drinks",
    stock: 30,
    unit: "bottles",
    status: "In Stock",
  },
  {
    id: "inventory-water",
    name: "Mineral Water",
    category: "Drinks",
    stock: 5,
    unit: "bottles",
    status: "Low Stock",
  },
  {
    id: "inventory-pizza-boxes",
    name: "Pizza Boxes",
    category: "Packaging",
    stock: 20,
    unit: "boxes",
    status: "In Stock",
  },
];

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [unit, setUnit] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);

  // Load inventory from localStorage
  useEffect(() => {
    const savedInventory = localStorage.getItem("pizza-inventory");

    if (!savedInventory) {
      setInventory(defaultInventory);

      localStorage.setItem(
        "pizza-inventory",
        JSON.stringify(defaultInventory)
      );

      return;
    }

    try {
      const savedItems: InventoryItem[] = JSON.parse(savedInventory);

      // Add any new default items that are missing
      const missingItems = defaultInventory.filter(
        (defaultItem) =>
          !savedItems.some(
            (savedItem) => savedItem.id === defaultItem.id
          )
      );

      const updatedInventory = [
        ...savedItems,
        ...missingItems,
      ];

      setInventory(updatedInventory);

      localStorage.setItem(
        "pizza-inventory",
        JSON.stringify(updatedInventory)
      );
    } catch (error) {
      console.error("Failed to load inventory:", error);

      setInventory(defaultInventory);

      localStorage.setItem(
        "pizza-inventory",
        JSON.stringify(defaultInventory)
      );
    }
  }, []);

  // Get stock status
  const getStatus = (stockValue: number) => {
    if (stockValue === 0) {
      return "Out of Stock";
    }

    if (stockValue <= 10) {
      return "Low Stock";
    }

    return "In Stock";
  };

  // Save inventory to localStorage
  const saveInventory = (
    updatedInventory: InventoryItem[]
  ) => {
    setInventory(updatedInventory);

    localStorage.setItem(
      "pizza-inventory",
      JSON.stringify(updatedInventory)
    );
  };

  // Add / Update inventory item
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!name || !category || !stock || !unit) {
      alert("Please fill all fields.");
      return;
    }

    const stockNumber = Number(stock);

    if (Number.isNaN(stockNumber)) {
      alert("Please enter a valid stock quantity.");
      return;
    }

    if (stockNumber < 0) {
      alert("Stock cannot be negative.");
      return;
    }

    const status = getStatus(stockNumber);

    // Update existing item
    if (editingId !== null) {
      const updatedInventory = inventory.map((item) =>
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

      saveInventory(updatedInventory);

      setEditingId(null);
    }

    // Add new item
    else {
      const newItem: InventoryItem = {
        id: `inventory-${Date.now()}`,
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

      saveInventory(updatedInventory);
    }

    // Clear form
    setName("");
    setCategory("");
    setStock("");
    setUnit("");
  };

  // Edit item
  const handleEdit = (item: InventoryItem) => {
    setEditingId(item.id);

    setName(item.name);
    setCategory(item.category);
    setStock(item.stock.toString());
    setUnit(item.unit);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Cancel edit
  const handleCancel = () => {
    setEditingId(null);

    setName("");
    setCategory("");
    setStock("");
    setUnit("");
  };

  // Delete item
  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!confirmDelete) {
      return;
    }

    const updatedInventory = inventory.filter(
      (item) => item.id !== id
    );

    saveInventory(updatedInventory);

    if (editingId === id) {
      handleCancel();
    }
  };

  return (
    <div className="text-black">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black">
          Inventory
        </h1>

        <p className="mt-2 text-gray-600">
          Track and manage your stock.
        </p>
      </div>

      {/* Add / Edit Form */}
      <div className="mb-8 rounded-xl bg-white p-5 shadow">
        <h2 className="mb-4 text-lg font-semibold text-black">
          {editingId !== null
            ? "Edit Inventory Item"
            : "Add Inventory Item"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          {/* Item Name */}
          <div>
            <label className="mb-2 block font-medium text-black">
              Item Name
            </label>

            <input
              type="text"
              placeholder="e.g. Mozzarella Cheese"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block font-medium text-black">
              Category
            </label>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black outline-none focus:ring-2 focus:ring-black"
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
            <label className="mb-2 block font-medium text-black">
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
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Unit */}
          <div>
            <label className="mb-2 block font-medium text-black">
              Unit
            </label>

            <select
              value={unit}
              onChange={(e) =>
                setUnit(e.target.value)
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black outline-none focus:ring-2 focus:ring-black"
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
          <div className="flex gap-3 pt-2 md:col-span-2">
            <button
              type="submit"
              className="rounded-lg bg-black px-5 py-3 text-white transition hover:bg-gray-800"
            >
              {editingId !== null
                ? "Update Item"
                : "+ Add Item"}
            </button>

            {editingId !== null && (
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-lg bg-gray-200 px-5 py-3 text-gray-800 transition hover:bg-gray-300"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {/* Total Items */}
        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm text-gray-500">
            Total Items
          </p>

          <h2 className="mt-2 text-2xl font-bold text-black">
            {inventory.length}
          </h2>
        </div>

        {/* In Stock */}
        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm text-gray-500">
            In Stock
          </p>

          <h2 className="mt-2 text-2xl font-bold text-black">
            {
              inventory.filter(
                (item) =>
                  item.status === "In Stock"
              ).length
            }
          </h2>
        </div>

        {/* Low Stock */}
        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm text-gray-500">
            Low Stock
          </p>

          <h2 className="mt-2 text-2xl font-bold text-black">
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
      <div className="overflow-hidden rounded-xl bg-white shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-black">
                  Item
                </th>

                <th className="px-6 py-4 text-left text-black">
                  Category
                </th>

                <th className="px-6 py-4 text-left text-black">
                  Stock
                </th>

                <th className="px-6 py-4 text-left text-black">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-black">
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
                        className={`rounded-full px-3 py-1 text-sm font-medium ${
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
                          className="font-medium text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(item.id)
                          }
                          className="font-medium text-red-600 hover:text-red-800"
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