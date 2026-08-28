"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Pizza = {
  name: string;
  price: string;
  description: string;
  image: string;
};

export default function DashboardMenu() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    const savedPizzas = localStorage.getItem("pizza-menu");

    if (savedPizzas) {
      try {
        setPizzas(JSON.parse(savedPizzas));
      } catch (error) {
        console.error("Failed to load menu:", error);
      }
    }
  }, []);

  const savePizzas = (updatedPizzas: Pizza[]) => {
    setPizzas(updatedPizzas);

    localStorage.setItem(
      "pizza-menu",
      JSON.stringify(updatedPizzas)
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!name || !price || !description || !image) {
      alert("Please fill all fields.");
      return;
    }

    const newPizza: Pizza = {
      name,
      price: price.startsWith("$") ? price : `$${price}`,
      description,
      image,
    };

    if (editingIndex !== null) {
      const updatedPizzas = [...pizzas];

      updatedPizzas[editingIndex] = newPizza;

      savePizzas(updatedPizzas);

      setEditingIndex(null);
    } else {
      savePizzas([...pizzas, newPizza]);
    }

    setName("");
    setPrice("");
    setDescription("");
    setImage("");
  };

  const handleEdit = (index: number) => {
    const pizza = pizzas[index];

    setName(pizza.name);
    setPrice(pizza.price);
    setDescription(pizza.description);
    setImage(pizza.image);

    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this menu item?"
    );

    if (!confirmDelete) return;

    const updatedPizzas = pizzas.filter(
      (_, pizzaIndex) => pizzaIndex !== index
    );

    savePizzas(updatedPizzas);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setName("");
    setPrice("");
    setDescription("");
    setImage("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Menu Management
            </h1>

            <p className="mt-2 text-gray-600">
              Add, edit, and delete Pizza House menu items.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-700"
          >
            Back to Dashboard
          </Link>

        </div>

        <div className="mb-8 rounded-2xl bg-white p-8 shadow-md">

          <h2 className="mb-6 text-2xl font-bold">
            {editingIndex !== null
              ? "Edit Menu Item"
              : "Add Menu Item"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-5 md:grid-cols-2"
          >

            <input
              type="text"
              placeholder="Pizza name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-lg border p-3 outline-none focus:border-red-500"
            />

            <input
              type="text"
              placeholder="Price e.g. $15.99"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="rounded-lg border p-3 outline-none focus:border-red-500"
            />

            <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="rounded-lg border p-3 outline-none focus:border-red-500 md:col-span-2"
            />

            <textarea
              placeholder="Pizza description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="rounded-lg border p-3 outline-none focus:border-red-500 md:col-span-2"
            />

            <div className="flex gap-3 md:col-span-2">

              <button
                type="submit"
                className="rounded-lg bg-red-600 px-6 py-3 font-medium text-white transition hover:bg-red-700"
              >
                {editingIndex !== null
                  ? "Update Item"
                  : "Add Item"}
              </button>

              {editingIndex !== null && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="rounded-lg bg-gray-200 px-6 py-3 font-medium text-gray-800"
                >
                  Cancel
                </button>
              )}

            </div>

          </form>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

          {pizzas.map((pizza, index) => (

            <div
              key={`${pizza.name}-${index}`}
              className="overflow-hidden rounded-2xl bg-white shadow-md"
            >

              <img
                src={pizza.image}
                alt={pizza.name}
                className="h-52 w-full object-cover"
              />

              <div className="p-5">

                <div className="mb-2 flex items-center justify-between">

                  <h3 className="text-xl font-bold">
                    {pizza.name}
                  </h3>

                  <span className="font-bold text-red-600">
                    {pizza.price}
                  </span>

                </div>

                <p className="mb-5 text-sm text-gray-600">
                  {pizza.description}
                </p>

                <div className="flex gap-3">

                  <button
                    onClick={() => handleEdit(index)}
                    className="flex-1 rounded-lg bg-gray-900 py-2 text-white hover:bg-gray-700"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(index)}
                    className="flex-1 rounded-lg bg-red-600 py-2 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
}