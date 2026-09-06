"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Category = {
  id: number;
  name: string;
  status: string;
};

type Pizza = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  category: string;
};

export default function NewMenuItem() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);

  // Load Categories
  useEffect(() => {
    const savedCategories =
      localStorage.getItem("pizza-categories");

    if (savedCategories) {
      try {
        setCategories(JSON.parse(savedCategories));
      } catch (error) {
        console.error(
          "Failed to load categories:",
          error
        );
      }
    }
  }, []);

  // Category title
  const getCategoryTitle = (categoryName: string) => {
    if (categoryName === "Pizza") return "Pizza";
    if (categoryName === "Burgers") return "Burger";
    if (categoryName === "Drinks") return "Drink";
    if (categoryName === "Desserts") return "Dessert";

    return categoryName;
  };

  // Add Menu Item
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (
      !name ||
      !price ||
      !description ||
      !image ||
      !category
    ) {
      alert("Please fill all fields.");
      return;
    }

    const newPizza: Pizza = {
      id: `pizza-${Date.now()}`,

      name,

      price: price.startsWith("$")
        ? price
        : `$${price}`,

      description,

      image,

      category,
    };

    const savedPizzas =
      localStorage.getItem("pizza-menu");

    const pizzas: Pizza[] = savedPizzas
      ? JSON.parse(savedPizzas)
      : [];

    const updatedPizzas = [
      ...pizzas,
      newPizza,
    ];

    localStorage.setItem(
      "pizza-menu",
      JSON.stringify(updatedPizzas)
    );

    router.push(
      `/dashboard/menu/${newPizza.id}`
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="mx-auto max-w-3xl">

        {/* Back */}
        <button
          onClick={() =>
            router.push("/dashboard/menu")
          }
          className="mb-6 text-sm font-medium text-gray-600 hover:text-black"
        >
          ← Back to Menu
        </button>

        {/* Form */}
        <div className="rounded-2xl bg-white p-8 shadow-md">

          {/* Dynamic Heading */}
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            {category
              ? `Add ${getCategoryTitle(category)}`
              : "Add Menu Item"}
          </h1>

          {/* Dynamic Description */}
          <p className="mb-8 text-gray-600">
            {category
              ? `Add a new ${getCategoryTitle(
                  category
                ).toLowerCase()} item to the Pizza House menu.`
              : "Add a new item to the Pizza House menu."}
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Item Name */}
            <div>

              <label className="mb-2 block font-medium text-black">
                Item Name
              </label>

              <input
                type="text"
                placeholder="e.g. BBQ Chicken"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 p-3 text-black placeholder-gray-400 outline-none focus:border-red-500"
              />

            </div>

            {/* Price */}
            <div>

              <label className="mb-2 block font-medium text-black">
                Price
              </label>

              <input
                type="text"
                placeholder="e.g. $15.99"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 p-3 text-black placeholder-gray-400 outline-none focus:border-red-500"
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
                className="w-full rounded-lg border border-gray-300 p-3 text-black outline-none focus:border-red-500"
              >

                <option value="">
                  Select Category
                </option>

                {categories
                  .filter(
                    (item) =>
                      item.status === "Active"
                  )
                  .map((item) => (
                    <option
                      key={item.id}
                      value={item.name}
                    >
                      {item.name}
                    </option>
                  ))}

              </select>

            </div>

            {/* Image */}
            <div>

              <label className="mb-2 block font-medium text-black">
                Image URL
              </label>

              <input
                type="text"
                placeholder="Paste item image URL"
                value={image}
                onChange={(e) =>
                  setImage(e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 p-3 text-black placeholder-gray-400 outline-none focus:border-red-500"
              />

            </div>

            {/* Description */}
            <div>

              <label className="mb-2 block font-medium text-black">
                Description
              </label>

              <textarea
                placeholder="Enter item description"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                rows={5}
                className="w-full rounded-lg border border-gray-300 p-3 text-black placeholder-gray-400 outline-none focus:border-red-500"
              />

            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">

              <button
                type="submit"
                className="rounded-lg bg-red-600 px-6 py-3 font-medium text-white transition hover:bg-red-700"
              >
                Add Item
              </button>

              <button
                type="button"
                onClick={() =>
                  router.push("/dashboard/menu")
                }
                className="rounded-lg bg-gray-200 px-6 py-3 font-medium text-gray-800 transition hover:bg-gray-300"
              >
                Cancel
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}