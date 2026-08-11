// "use client";
import PizzaCard from "@/components/PizzaCard";
import React from "react";


export default function page() {
  return (
    <div>
      <section id="menu" className="w-full bg-white py-25 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12">
            <p className="text-[#f59e0b] uppercase tracking-widest text-sm font-semibold mb-3">
              Our Menu
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a]">
              Our Delicious Pizzas
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto mt-4">
              Fresh ingredients, rich flavors, and perfectly baked crusts made
              especially for every pizza lover.
            </p>
          </div>

          {/* Pizza Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <PizzaCard
              name="Margherita"
              price="$12.99"
              description="Fresh mozzarella, tomato sauce, basil, and olive oil."
              image="https://images.unsplash.com/photo-1564936281291-294551497d81?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8TWFyZ2hlcml0YXxlbnwwfHwwfHx8MA%3D%3D"
            />

            {/* Card 2 */}
            <PizzaCard
              name="Pepperoni"
              price="$14.99"
              description="Crispy pepperoni, mozzarella, tomato sauce, and herbs."
              image="https://images.unsplash.com/photo-1605478371310-a9f1e96b4ff4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFBlcHBlcm9uaXxlbnwwfHwwfHx8MA%3D%3D"
            />

            {/* Card 3 */}
            <PizzaCard
              name="Veggie Supreme"
              price="$13.99"
              description="Mushrooms, bell peppers, onions, olives, and mozzarella."
              image="https://media.istockphoto.com/id/2275234707/photo/spicy-jalepenoes-on-chilli-nachos-with-cheese-sour-cream-and-salsa.webp?a=1&b=1&s=612x612&w=0&k=20&c=_DlGd7ORKV6jphK0DCxifXHgtDXyJLUK8sXQwmAethY="
            />

            {/* Card 4 */}
            <PizzaCard
              name="Chicken BBQ"
              price="$15.99"
              description="Tender chicken, BBQ sauce, onions, mozzarella, and herbs."
              image="https://images.unsplash.com/photo-1645066803665-d16a79a21566?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fENoaWNrZW4lMjBCQlF8ZW58MHx8MHx8fDA%3D"
            />

            {/* Card 5 */}
            <PizzaCard
              name="Four Cheese"
              price="$16.99"
              description="Mozzarella, cheddar, parmesan, and creamy cheese blend."
              image="https://images.unsplash.com/photo-1732223229355-95a1433404bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Rm91ciUyMENoZWVzZXxlbnwwfHwwfHx8MA%3D%3D"
            />

            {/* Card 6 */}
            <PizzaCard
              name="Spicy Inferno"
              price="$15.49"
              description="Spicy chicken, jalapeños, peppers, mozzarella, and hot sauce."
              image="https://images.unsplash.com/photo-1634233822115-4eb18731fd76?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fFNwaWN5JTIwSW5mZXJub3xlbnwwfHwwfHx8MA%3D%3D"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
