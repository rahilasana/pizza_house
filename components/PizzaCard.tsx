"use client";

import { useCart } from "../app/context/CartContext";

type PizzaCardProps = {
  name: string;
  price: string;
  description: string;
  image: string;
};

export default function PizzaCard({
  name,
  price,
  description,
  image,
}: PizzaCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      name,
      price,
      description,
      image,
    });
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:-translate-y-2 transition duration-300">
      
      {/* Pizza Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-64 object-cover"
      />

      <div className="p-6">

        {/* Name + Price */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-bold text-[#1a1a1a]">
            {name}
          </h2>

          <p className="text-[#dc2626] font-bold">
            {price}
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-500 text-sm mb-5">
          {description}
        </p>

        {/* Order Details */}
        <details>
          
          <summary className="cursor-pointer list-none w-full bg-[#dc2626] text-white py-3 rounded-full font-semibold text-center hover:bg-[#b91c1c] transition">
            Order Now
          </summary>

          <div className="mt-3 rounded-2xl bg-gray-50 border p-4">

            {/* Pizza Name */}
            <h3 className="font-bold text-lg">
              {name}
            </h3>

            {/* Price */}
            <p className="text-[#dc2626] font-bold mt-1">
              {price}
            </p>

            {/* Description */}
            <p className="text-gray-500 text-sm mt-2">
              {description}
            </p>

            {/* Add To Cart */}
            <button
              onClick={handleAddToCart}
              className="mt-4 w-full bg-black text-white py-2 rounded-full font-semibold hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>

          </div>
        </details>

      </div>
    </div>
  );
}