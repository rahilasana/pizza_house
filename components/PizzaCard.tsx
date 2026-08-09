"use client";
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
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:-translate-y-2 transition duration-300">

      <img
        src={image}
        alt={name}
        className="w-full h-64 object-cover"
      />

      <div className="p-6">

        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-bold text-[#1a1a1a]">
            {name}
          </h2>

          <p className="text-[#dc2626] font-bold">
            {price}
          </p>
        </div>

        <p className="text-gray-500 text-sm mb-5">
          {description}
        </p>

        <details>
          <summary className="cursor-pointer list-none w-full bg-[#dc2626] text-white py-3 rounded-full font-semibold text-center">
            Order Now
          </summary>

          <div className="mt-3 rounded-2xl bg-gray-50 border p-4">

            <h3 className="font-bold text-lg">
              {name}
            </h3>

            <p className="text-[#dc2626] font-bold mt-1">
              {price}
            </p>

            <p className="text-gray-500 text-sm mt-2">
              {description}
            </p>

            <button className="mt-4 w-full bg-black text-white py-2 rounded-full font-semibold">
              Add to Cart
            </button>

          </div>
        </details>

      </div>
    </div>
  );
}