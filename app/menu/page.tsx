"use client";

import React, { useState } from "react";
import PizzaCard from "@/components/PizzaCard";

type Pizza = {
  name: string;
  price: string;
  description: string;
  image: string;
};

const pizzas: Pizza[] = [
  {
    name: "Margherita",
    price: "$12.99",
    description:
      "Fresh mozzarella, tomato sauce, basil, and olive oil.",
    image:
      "https://images.unsplash.com/photo-1564936281291-294551497d81?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8TWFyZ2hlcml0YXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Pepperoni",
    price: "$14.99",
    description:
      "Crispy pepperoni, mozzarella, tomato sauce, and herbs.",
    image:
      "https://images.unsplash.com/photo-1605478371310-a9f1e96b4ff4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFBlcHBlcm9uaXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Veggie Supreme",
    price: "$13.99",
    description:
      "Mushrooms, bell peppers, onions, olives, and mozzarella.",
    image:
      "https://media.istockphoto.com/id/2275234707/photo/spicy-jalepenoes-on-chilli-nachos-with-cheese-sour-cream-and-salsa.webp?a=1&b=1&s=612x612&w=0&k=20&c=_DlGd7ORKV6jphK0DCxifXHgtDXyJLUK8sXQwmAethY=",
  },
  {
    name: "Chicken BBQ",
    price: "$15.99",
    description:
      "Tender chicken, BBQ sauce, onions, mozzarella, and herbs.",
    image:
      "https://media.istockphoto.com/id/2250437750/photo/bbq-chicken-pizza.webp?a=1&b=1&s=612x612&w=0&k=20&c=JpUmVaBIkI1vlIONRpolS9uPBMSjFwSfPyGLTgsyElg=",
  },
  {
    name: "Four Cheese",
    price: "$16.99",
    description:
      "Mozzarella, cheddar, parmesan, and creamy cheese blend.",
    image:
      "https://images.unsplash.com/photo-1732223229355-95a1433404bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Rm91ciUyMENoZWVzZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Spicy Inferno",
    price: "$15.49",
    description:
      "Spicy chicken, jalapeños, peppers, mozzarella, and hot sauce.",
    image:
      "https://images.unsplash.com/photo-1634233822115-4eb18731fd76?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fFNwaWN5JTIwSW5mZXJub3xlbnwwfHwwfHx8MA%3D%3D",
  },
];

export default function Page() {
  const [search, setSearch] = useState("");

  const filteredPizzas = pizzas.filter((pizza) => {
    const searchText = search.toLowerCase().trim();

    return (
      pizza.name.toLowerCase().includes(searchText) ||
      pizza.description.toLowerCase().includes(searchText)
    );
  });

  return (
    <div>
      <section
        id="menu"
        className="w-full bg-white py-30 px-6"
      >
        <div className="max-w-7xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-8">

            <p className="text-[#f59e0b] uppercase tracking-widest text-sm font-semibold mb-3">
              Our Menu
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a]">
              Our Delicious Pizzas
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto mt-4">
              Fresh ingredients, rich flavors, and perfectly baked crusts
              made especially for every pizza lover.
            </p>

          </div>

          {/* Search Box */}
          <div className="max-w-xl mx-auto mb-12">

            <div className="relative">

              {/* Search Icon */}
              <i className="ri-search-line absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl"></i>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search your favorite pizza..."
                className="w-full border-2 border-gray-200 rounded-full py-4 pl-14 pr-12 outline-none focus:border-[#dc2626] transition"
              />

              {/* Clear Button */}
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#dc2626] transition"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              )}

            </div>

          </div>

          {/* Pizza Cards */}
          {filteredPizzas.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

              {filteredPizzas.map((pizza) => (
                <PizzaCard
                  key={pizza.name}
                  name={pizza.name}
                  price={pizza.price}
                  description={pizza.description}
                  image={pizza.image}
                />
              ))}

            </div>
          ) : (
            /* No Results */
            <div className="text-center py-16">

              <div className="text-6xl mb-5">
                🍕
              </div>

              <h3 className="text-2xl font-bold text-[#1a1a1a]">
                No pizzas found
              </h3>

              <p className="text-gray-500 mt-2">
                Try searching with another pizza name or ingredient.
              </p>

              <button
                onClick={() => setSearch("")}
                className="mt-6 bg-[#dc2626] text-white px-7 py-3 rounded-full font-semibold hover:bg-[#b91c1c] transition"
              >
                Show All Pizzas
              </button>

            </div>
          )}

        </div>
      </section>
    </div>
  );
}