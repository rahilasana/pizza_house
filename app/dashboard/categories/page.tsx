"use client";

import { useEffect, useState } from "react";

type Category = {
  id: number;
  name: string;
  status: string;
};

type MenuItem = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  category?: string;
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const [newCategory, setNewCategory] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");

  // Load Categories + Menu
  useEffect(() => {
    // Load categories
    const savedCategories = localStorage.getItem("pizza-categories");

    if (savedCategories) {
      try {
        setCategories(JSON.parse(savedCategories));
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    } else {
      const defaultCategories: Category[] = [
        {
          id: 1,
          name: "Pizza",
          status: "Active",
        },
        {
          id: 2,
          name: "Burgers",
          status: "Active",
        },
        {
          id: 3,
          name: "Drinks",
          status: "Active",
        },
        {
          id: 4,
          name: "Desserts",
          status: "Active",
        },
      ];

      setCategories(defaultCategories);

      localStorage.setItem(
        "pizza-categories",
        JSON.stringify(defaultCategories)
      );
    }

    // Load Menu Items
    const savedMenu = localStorage.getItem("pizza-menu");

    if (savedMenu) {
      try {
        setMenuItems(JSON.parse(savedMenu));
      } catch (error) {
        console.error("Failed to load menu:", error);
      }
    }
  }, []);

  // Count items for each category
  const getCategoryItemCount = (categoryName: string) => {
    return menuItems.filter(
      (item) =>
        item.category?.toLowerCase() === categoryName.toLowerCase()
    ).length;
  };

  // Add Category
  const handleAddCategory = () => {
    const categoryName = newCategory.trim();

    if (!categoryName) {
      alert("Please enter a category name.");
      return;
    }

    const alreadyExists = categories.some(
      (category) =>
        category.name.toLowerCase() === categoryName.toLowerCase()
    );

    if (alreadyExists) {
      alert("This category already exists.");
      return;
    }

    const category: Category = {
      id: Date.now(),
      name: categoryName,
      status: "Active",
    };

    const updatedCategories = [...categories, category];

    setCategories(updatedCategories);

    localStorage.setItem(
      "pizza-categories",
      JSON.stringify(updatedCategories)
    );

    setNewCategory("");
  };

  // Start Edit
  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setEditingName(category.name);
  };

  // Save Edit
  const handleSaveEdit = (id: number) => {
    const updatedName = editingName.trim();

    if (!updatedName) {
      alert("Category name cannot be empty.");
      return;
    }

    const duplicate = categories.some(
      (category) =>
        category.id !== id &&
        category.name.toLowerCase() === updatedName.toLowerCase()
    );

    if (duplicate) {
      alert("This category already exists.");
      return;
    }

    const updatedCategories = categories.map((category) =>
      category.id === id
        ? {
            ...category,
            name: updatedName,
          }
        : category
    );

    setCategories(updatedCategories);

    localStorage.setItem(
      "pizza-categories",
      JSON.stringify(updatedCategories)
    );

    setEditingId(null);
    setEditingName("");
  };

  // Cancel Edit
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  // Delete Category
  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) {
      return;
    }

    const updatedCategories = categories.filter(
      (category) => category.id !== id
    );

    setCategories(updatedCategories);

    localStorage.setItem(
      "pizza-categories",
      JSON.stringify(updatedCategories)
    );
  };

  return (
    <div className="text-black">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

        <div>
          <h1 className="text-3xl font-bold text-black">
            Categories
          </h1>

          <p className="text-gray-600 mt-2">
            Manage your food categories.
          </p>
        </div>

      </div>

      {/* Add Category */}
      <div className="bg-white shadow rounded-xl p-5 mb-6">

        <h2 className="text-lg font-semibold text-black mb-4">
          Add New Category
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">

          <input
            type="text"
            placeholder="Enter category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-black placeholder-gray-500 outline-none focus:ring-2 focus:ring-black"
          />

          <button
            onClick={handleAddCategory}
            className="bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            + Add Category
          </button>

        </div>

      </div>

      {/* Categories Table */}
      {categories.length === 0 ? (

        <div className="bg-white shadow rounded-xl p-10 text-center">
          <p className="text-gray-500">
            No categories found.
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
                    Category
                  </th>

                  <th className="text-left px-6 py-4 font-semibold">
                    Items
                  </th>

                  <th className="text-left px-6 py-4 font-semibold">
                    Status
                  </th>

                  <th className="text-left px-6 py-4 font-semibold">
                    Actions
                  </th>

                </tr>

              </thead>

              {/* Table Body */}
              <tbody>

                {categories.map((category) => {

                  const itemCount = getCategoryItemCount(
                    category.name
                  );

                  return (
                    <tr
                      key={category.id}
                      className="border-t border-gray-200 hover:bg-gray-50"
                    >

                      {/* Category */}
                      <td className="px-6 py-4">

                        {editingId === category.id ? (

                          <input
                            type="text"
                            value={editingName}
                            onChange={(e) =>
                              setEditingName(e.target.value)
                            }
                            className="border border-gray-300 rounded-lg px-3 py-2 text-black outline-none focus:ring-2 focus:ring-black"
                          />

                        ) : (

                          <span className="font-semibold text-black">
                            {category.name}
                          </span>

                        )}

                      </td>

                      {/* Items */}
                      <td className="px-6 py-4 text-gray-700">
                        {itemCount}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">

                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                          {category.status}
                        </span>

                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">

                        {editingId === category.id ? (

                          <div className="flex gap-3">

                            <button
                              onClick={() =>
                                handleSaveEdit(category.id)
                              }
                              className="text-green-600 hover:text-green-800 font-medium"
                            >
                              Save
                            </button>

                            <button
                              onClick={handleCancelEdit}
                              className="text-gray-600 hover:text-gray-800 font-medium"
                            >
                              Cancel
                            </button>

                          </div>

                        ) : (

                          <div className="flex gap-3">

                            <button
                              onClick={() => handleEdit(category)}
                              className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() =>
                                handleDelete(category.id)
                              }
                              className="text-red-600 hover:text-red-800 font-medium"
                            >
                              Delete
                            </button>

                          </div>

                        )}

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