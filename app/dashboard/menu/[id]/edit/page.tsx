"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

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
  category?: string;
};

export default function EditMenuItem() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);

  // Load item and categories
  useEffect(() => {
    // Load Categories
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

    // Load Menu Items
    const savedPizzas =
      localStorage.getItem("pizza-menu");

    if (!savedPizzas) return;

    try {
      const pizzas: Pizza[] = JSON.parse(savedPizzas);

      const pizza = pizzas.find(
        (pizza) => pizza.id === id
      );

      if (!pizza) return;

      setName(pizza.name);
      setPrice(pizza.price);
      setDescription(pizza.description);
      setImage(pizza.image);
      setCategory(pizza.category || "");
    } catch (error) {
      console.error(
        "Failed to load pizza:",
        error
      );
    }
  }, [id]);

  // Update Item
  const handleUpdate = (
    event: React.FormEvent
  ) => {
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

    const savedPizzas =
      localStorage.getItem("pizza-menu");

    if (!savedPizzas) return;

    try {
      const pizzas: Pizza[] =
        JSON.parse(savedPizzas);

      const updatedPizzas = pizzas.map(
        (pizza) =>
          pizza.id === id
            ? {
                ...pizza,
                name,
                price: price.startsWith("$")
                  ? price
                  : `$${price}`,
                description,
                image,
                category,
              }
            : pizza
      );

      localStorage.setItem(
        "pizza-menu",
        JSON.stringify(updatedPizzas)
      );

      router.push(
        `/dashboard/menu/${id}`
      );
    } catch (error) {
      console.error(
        "Failed to update pizza:",
        error
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="mx-auto max-w-3xl">

        {/* Back */}
        <button
          onClick={() =>
            router.push(
              `/dashboard/menu/${id}`
            )
          }
          className="mb-6 text-sm font-medium text-gray-600 hover:text-black"
        >
          ← Back to Item
        </button>

        {/* Form */}
        <div className="rounded-2xl bg-white p-8 shadow-md">

          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Edit Menu Item
          </h1>

          <p className="mb-8 text-gray-600">
            Update the menu item details.
          </p>

          <form
            onSubmit={handleUpdate}
            className="space-y-5"
          >

            {/* Name */}
            <div>

              <label className="mb-2 block font-medium text-black">
                Item Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 p-3 text-black outline-none focus:border-red-500"
              />

            </div>

            {/* Price */}
            <div>

              <label className="mb-2 block font-medium text-black">
                Price
              </label>

              <input
                type="text"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 p-3 text-black outline-none focus:border-red-500"
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
                value={image}
                onChange={(e) =>
                  setImage(e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 p-3 text-black outline-none focus:border-red-500"
              />

            </div>

            {/* Description */}
            <div>

              <label className="mb-2 block font-medium text-black">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                rows={5}
                className="w-full rounded-lg border border-gray-300 p-3 text-black outline-none focus:border-red-500"
              />

            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">

              <button
                type="submit"
                className="rounded-lg bg-red-600 px-6 py-3 font-medium text-white hover:bg-red-700"
              >
                Update Item
              </button>

              <button
                type="button"
                onClick={() =>
                  router.push(
                    `/dashboard/menu/${id}`
                  )
                }
                className="rounded-lg bg-gray-200 px-6 py-3 font-medium text-gray-800 hover:bg-gray-300"
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