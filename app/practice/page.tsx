"use client";

import { useEffect, useMemo, useState } from "react";

export default function Page() {

  // useState:
  // quantity ki current value store karta hai
  // aur setQuantity quantity ko update karta hai
  const [quantity, setQuantity] = useState(1);

  // Pizza ki fixed price
  const price = 500;


  // useMemo:
  // price aur quantity se total calculate karta hai
  // quantity change hone par total dobara calculate hoga
  const totalPrice = useMemo(() => {
    return price * quantity;
  }, [quantity]);


  // useEffect:
  // quantity change hone ke baad localStorage mein
  // current quantity save karta hai
  useEffect(() => {
    localStorage.setItem("pizzaQuantity", quantity.toString());
  }, [quantity]);


  return (
    <div className="min-h-screen bg-[#fff7ed] flex items-center justify-center px-5">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 text-center">

        {/* Pizza */}
        <div className="text-7xl mb-4">
          🍕
        </div>

        <h1 className="text-3xl font-bold text-gray-800">
          Chicken Pizza
        </h1>

        <p className="text-gray-500 mt-2">
          Rs. {price} / Pizza
        </p>


        {/* Quantity Section */}
        <div className="mt-8">

          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Quantity
          </h2>

          <div className="flex justify-center items-center gap-6">

            {/* Decrease */}
            <button
              onClick={() => {
                if (quantity > 1) {
                  setQuantity(quantity - 1);
                }
              }}
              className="w-12 h-12 rounded-full bg-red-500 text-white text-2xl font-bold hover:bg-red-600"
            >
              −
            </button>


            {/* Current Quantity */}
            <span className="text-3xl font-bold text-gray-800">
              {quantity}
            </span>


            {/* Increase */}
            <button
              onClick={() => {
                setQuantity(quantity + 1);
              }}
              className="w-12 h-12 rounded-full bg-green-500 text-white text-2xl font-bold hover:bg-green-600"
            >
              +
            </button>

          </div>
        </div>


        {/* Total */}
        <div className="mt-8 bg-orange-100 rounded-2xl p-5">

          <p className="text-gray-600">
            Total Price
          </p>

          <h2 className="text-4xl font-bold text-orange-600 mt-2">
            Rs. {totalPrice}
          </h2>

        </div>


        {/* LocalStorage Info */}
        <p className="text-sm text-gray-400 mt-5">
          Quantity automatically saved in your browser
        </p>

      </div>

    </div>
  );
}