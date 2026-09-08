"use client";

import React, { useEffect, useMemo, useState } from "react";

import PizzaCard from "@/components/PizzaCard";
import DealCard from "@/components/DealCard";

type Category =
  | "pizza"
  | "burger"
  | "pasta"
  | "sides"
  | "drinks"
  | "deal";

type MenuItem = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  category: Category;
  available?: boolean;
};

type DealItem = {
  name: string;
  quantity: number;
  icon: string;
};

type Deal = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  originalPrice: string;
  badge: string;
  category: "deal";
  dealItems: DealItem[];
  available?: boolean;
};

type MenuData = MenuItem | Deal;

const categories = [
  {
    id: "pizza",
    name: "Pizzas",
    icon: "ri-pizza-fill",
  },
  {
    id: "burger",
    name: "Burgers",
    icon: "ri-restaurant-2-fill",
  },
  {
    id: "pasta",
    name: "Pasta",
    icon: "ri-bowl-fill",
  },
  {
    id: "sides",
    name: "Sides",
    icon: "ri-fries-fill",
  },
  {
    id: "drinks",
    name: "Drinks",
    icon: "ri-goblet-fill",
  },
  {
    id: "deal",
    name: "Deals",
    icon: "ri-price-tag-3-fill",
  },
];

const defaultPizzas: MenuItem[] = [
  {
    id: "pizza-margherita",
    name: "Margherita",
    price: "$12.99",
    description: "Classic tomato sauce, mozzarella and fresh basil.",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80",
    category: "pizza",
    available: true,
  },
  {
    id: "pizza-pepperoni",
    name: "Pepperoni",
    price: "$14.99",
    description: "Loaded with spicy pepperoni and melted mozzarella.",
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=900&q=80",
    category: "pizza",
    available: true,
  },
  {
    id: "pizza-veggie-supreme",
    name: "Veggie Supreme",
    price: "$13.99",
    description: "Fresh vegetables, mozzarella and our signature sauce.",
    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=80",
    category: "pizza",
    available: true,
  },
  {
    id: "pizza-chicken-bbq",
    name: "Chicken BBQ",
    price: "$15.99",
    description: "Grilled chicken, BBQ sauce, onions and mozzarella.",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80",
    category: "pizza",
    available: true,
  },
  {
    id: "pizza-four-cheese",
    name: "Four Cheese",
    price: "$16.99",
    description: "A rich blend of four delicious cheeses.",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80",
    category: "pizza",
    available: true,
  },
  {
    id: "pizza-spicy-inferno",
    name: "Spicy Inferno",
    price: "$15.49",
    description: "Spicy chicken, jalapeños, peppers and hot sauce.",
    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=80",
    category: "pizza",
    available: true,
  },
];

const defaultBurgers: MenuItem[] = [
  {
    id: "burger-beef-classic",
    name: "Beef Classic",
    price: "$9.99",
    description: "Juicy beef patty with cheese, lettuce and special sauce.",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
    category: "burger",
    available: true,
  },
  {
    id: "burger-double-cheese",
    name: "Double Cheese Burger",
    price: "$12.99",
    description: "Double beef patties with double cheese and special sauce.",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80",
    category: "burger",
    available: true,
  },
  {
    id: "burger-chicken-crispy",
    name: "Crispy Chicken Burger",
    price: "$10.99",
    description: "Crispy chicken fillet with lettuce and creamy mayo.",
    image:
      "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=900&q=80",
    category: "burger",
    available: true,
  },
  {
    id: "burger-bbq-chicken",
    name: "BBQ Chicken Burger",
    price: "$11.99",
    description: "Crispy chicken, smoky BBQ sauce and fresh vegetables.",
    image:
      "https://images.unsplash.com/photo-1655895176036-bf1a11326e5c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8QkJRJTIwQ2hpY2tlbiUyMEJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D",
    category: "burger",
    available: true,
  },
];

const defaultPasta: MenuItem[] = [
  {
    id: "pasta-alfredo",
    name: "Chicken Alfredo",
    price: "$13.99",
    description: "Creamy Alfredo pasta with grilled chicken.",
    image:
      "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=900&q=80",
    category: "pasta",
    available: true,
  },
  {
    id: "pasta-arrabbiata",
    name: "Arrabbiata",
    price: "$11.99",
    description: "Pasta tossed in spicy tomato and garlic sauce.",
    image:
      "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=900&q=80",
    category: "pasta",
    available: true,
  },
  {
    id: "pasta-chicken-pesto",
    name: "Chicken Pesto",
    price: "$14.99",
    description: "Creamy pesto pasta with grilled chicken.",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80",
    category: "pasta",
    available: true,
  },
];

const defaultSides: MenuItem[] = [
  {
    id: "side-garlic-bread",
    name: "Garlic Bread",
    price: "$5.99",
    description: "Freshly baked garlic bread with herbs and butter.",
    image:
      "https://media.istockphoto.com/id/2164771915/photo/three-slices-of-garlic-bread-with-fresh-parsley-on-a-white-ceramic-plate-isolated-on-white.webp?a=1&b=1&s=612x612&w=0&k=20&c=US_ZpGWnVGreFPvUoe3xgoRIpttGNHLuDWo_tgI9Kvk=",
    category: "sides",
    available: true,
  },
  {
    id: "side-loaded-fries",
    name: "Loaded Fries",
    price: "$7.99",
    description: "Crispy fries topped with cheese and sauces.",
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=80",
    category: "sides",
    available: true,
  },
  {
    id: "side-chicken-wings",
    name: "Chicken Wings",
    price: "$9.99",
    description: "Crispy chicken wings tossed in your choice of sauce.",
    image:
      "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=900&q=80",
    category: "sides",
    available: true,
  },
];

const defaultDrinks: MenuItem[] = [
  {
    id: "drink-cola",
    name: "Cola",
    price: "$2.49",
    description: "Chilled refreshing cola.",
    image:
      "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=900&q=80",
    category: "drinks",
    available: true,
  },
  {
    id: "drink-orange",
    name: "Orange Soda",
    price: "$2.49",
    description: "Refreshing orange flavored soda.",
    image:
      "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?auto=format&fit=crop&w=900&q=80",
    category: "drinks",
    available: true,
  },
  {
    id: "drink-lemonade",
    name: "Fresh Lemonade",
    price: "$3.99",
    description: "Freshly prepared sweet and tangy lemonade.",
    image:
      "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=900&q=80",
    category: "drinks",
    available: true,
  },
  {
    id: "drink-water",
    name: "Mineral Water",
    price: "$1.49",
    description: "Chilled bottled mineral water.",
    image:
      "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=900&q=80",
    category: "drinks",
    available: true,
  },
];

const defaultDeals: Deal[] = [
  {
    id: "deal-solo-combo",
    name: "Solo Combo",
    description: "Everything you need for a delicious meal for one.",
    image:
      "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=900&q=80",
    price: "$14.99",
    originalPrice: "$18.47",
    badge: "BEST VALUE",
    category: "deal",
    available: true,
    dealItems: [
      {
        name: "Small Pizza",
        quantity: 1,
        icon: "ri-pizza-fill",
      },
      {
        name: "Chicken Burger",
        quantity: 1,
        icon: "ri-restaurant-2-fill",
      },
      {
        name: "Soft Drink",
        quantity: 1,
        icon: "ri-goblet-fill",
      },
    ],
  },
  {
    id: "deal-couple-combo",
    name: "Couple Combo",
    description: "A perfect combo for two pizza lovers.",
    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=80",
    price: "$24.99",
    originalPrice: "$31.96",
    badge: "POPULAR",
    category: "deal",
    available: true,
    dealItems: [
      {
        name: "Large Pizza",
        quantity: 1,
        icon: "ri-pizza-fill",
      },
      {
        name: "Beef Burger",
        quantity: 1,
        icon: "ri-restaurant-2-fill",
      },
      {
        name: "Fries",
        quantity: 1,
        icon: "ri-fries-fill",
      },
      {
        name: "Soft Drink",
        quantity: 2,
        icon: "ri-goblet-fill",
      },
    ],
  },
  {
    id: "deal-friends-combo",
    name: "Friends Combo",
    description: "A generous feast designed for a group of friends.",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80",
    price: "$34.99",
    originalPrice: "$45.95",
    badge: "SAVE MORE",
    category: "deal",
    available: true,
    dealItems: [
      {
        name: "Large Pizza",
        quantity: 2,
        icon: "ri-pizza-fill",
      },
      {
        name: "Beef Burger",
        quantity: 2,
        icon: "ri-restaurant-2-fill",
      },
      {
        name: "Soft Drink",
        quantity: 3,
        icon: "ri-goblet-fill",
      },
      {
        name: "Loaded Fries",
        quantity: 1,
        icon: "ri-fries-fill",
      },
    ],
  },
  {
    id: "deal-family-feast",
    name: "Family Feast",
    description: "A complete family meal packed with everyone's favorites.",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80",
    price: "$44.99",
    originalPrice: "$57.94",
    badge: "FAMILY FAVORITE",
    category: "deal",
    available: true,
    dealItems: [
      {
        name: "Large Pizza",
        quantity: 2,
        icon: "ri-pizza-fill",
      },
      {
        name: "Chicken Burger",
        quantity: 2,
        icon: "ri-restaurant-2-fill",
      },
      {
        name: "Soft Drink",
        quantity: 4,
        icon: "ri-goblet-fill",
      },
      {
        name: "Garlic Bread",
        quantity: 1,
        icon: "ri-bread-fill",
      },
      {
        name: "Chicken Wings",
        quantity: 1,
        icon: "ri-restaurant-fill",
      },
    ],
  },
  {
    id: "deal-mega-feast",
    name: "Mega Feast",
    description: "A massive combination for big gatherings and celebrations.",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80",
    price: "$54.99",
    originalPrice: "$71.93",
    badge: "MEGA DEAL",
    category: "deal",
    available: true,
    dealItems: [
      {
        name: "Large Pizza",
        quantity: 3,
        icon: "ri-pizza-fill",
      },
      {
        name: "Burger",
        quantity: 3,
        icon: "ri-restaurant-2-fill",
      },
      {
        name: "Soft Drink",
        quantity: 4,
        icon: "ri-goblet-fill",
      },
      {
        name: "Loaded Fries",
        quantity: 1,
        icon: "ri-fries-fill",
      },
      {
        name: "Garlic Bread",
        quantity: 1,
        icon: "ri-bread-fill",
      },
    ],
  },
  {
    id: "deal-ultimate-party",
    name: "Ultimate Party Combo",
    description: "The ultimate party package with everything your group needs.",
    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=80",
    price: "$69.99",
    originalPrice: "$91.91",
    badge: "ULTIMATE",
    category: "deal",
    available: true,
    dealItems: [
      {
        name: "Large Pizza",
        quantity: 3,
        icon: "ri-pizza-fill",
      },
      {
        name: "Burger",
        quantity: 3,
        icon: "ri-restaurant-2-fill",
      },
      {
        name: "Pasta",
        quantity: 2,
        icon: "ri-bowl-fill",
      },
      {
        name: "Soft Drink",
        quantity: 5,
        icon: "ri-goblet-fill",
      },
      {
        name: "Chicken Wings",
        quantity: 1,
        icon: "ri-restaurant-fill",
      },
      {
        name: "Loaded Fries",
        quantity: 1,
        icon: "ri-fries-fill",
      },
      {
        name: "Garlic Bread",
        quantity: 1,
        icon: "ri-bread-fill",
      },
    ],
  },
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] =
    useState<Category>("pizza");

  const [menuItems, setMenuItems] = useState<MenuData[]>([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const savedMenu = localStorage.getItem("pizza-menu");

    if (savedMenu) {
      try {
        const parsed = JSON.parse(savedMenu);

        if (Array.isArray(parsed)) {
          const normalized = parsed.map((item: any) => ({
            ...item,
            id:
              item.id ||
              `item-${Date.now()}-${Math.random()
                .toString(36)
                .substring(2, 8)}`,
            category: item.category || "pizza",
            available:
              item.available === undefined ? true : item.available,
          }));

          setMenuItems(normalized);

          return;
        }
      } catch {
        console.log("Invalid menu data");
      }
    }

    const initialMenu: MenuData[] = [
      ...defaultPizzas,
      ...defaultBurgers,
      ...defaultPasta,
      ...defaultSides,
      ...defaultDrinks,
      ...defaultDeals,
    ];

    setMenuItems(initialMenu);

    localStorage.setItem(
      "pizza-menu",
      JSON.stringify(initialMenu)
    );
  }, []);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      if (item.category !== activeCategory) {
        return false;
      }

      const searchText = search.toLowerCase().trim();

      if (!searchText) {
        return true;
      }

      return (
        item.name.toLowerCase().includes(searchText) ||
        item.description.toLowerCase().includes(searchText)
      );
    });
  }, [menuItems, activeCategory, search]);

  const currentCategory = categories.find(
    (category) => category.id === activeCategory
  );

  const normalItems = filteredItems.filter(
    (item): item is MenuItem =>
      item.category !== "deal"
  );

  const deals = filteredItems.filter(
    (item): item is Deal =>
      item.category === "deal"
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <section className=" px-6 py-20 text-white mt-10">
        <div className="mx-auto max-w-7xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-yellow-600">
            Pizza House
          </p>

          <h1 className="mb-5 text-4xl text-red-600 font-extrabold md:text-6xl">
            Our Menu
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-7 text-gray-400 md:text-lg">
            Fresh ingredients, bold flavors and delicious meals
            made for every occasion.
          </p>
        </div>
      </section>

      <section className="flex justify-center sticky top-0 z-30 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex gap-3 overflow-x-auto pb-1">
            {categories.map((category) => {
              const isActive =
                activeCategory === category.id;

              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(
                      category.id as Category
                    );

                    setSearch("");
                  }}
                  className={`flex min-w-fit items-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition ${
                    isActive
                      ? "bg-red-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <i className={category.icon}></i>

                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <i
                className={`${currentCategory?.icon} text-3xl text-red-600`}
              ></i>

              <h2 className="text-3xl font-extrabold text-gray-900">
                {currentCategory?.name}
              </h2>
            </div>

            <p className="text-gray-500">
              {activeCategory === "deal"
                ? "Save more with our specially designed meal combos."
                : `Explore our delicious ${currentCategory?.name.toLowerCase()}.`}
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400"></i>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${currentCategory?.name}...`}
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-4 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
            />
          </div>
        </div>

        {activeCategory !== "deal" ? (
          normalItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {normalItems.map((item) => (
                <PizzaCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  description={item.description}
                  image={item.image}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-white px-6 py-20 text-center shadow-sm">
              <i className="ri-search-line mb-4 block text-5xl text-gray-300"></i>

              <h3 className="mb-2 text-xl font-bold text-gray-800">
                No items found
              </h3>

              <p className="text-gray-500">
                Try searching with another name.
              </p>
            </div>
          )
        ) : deals.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {deals.map((deal) => (
              <DealCard
                key={deal.id}
                deal={deal}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-white px-6 py-20 text-center shadow-sm">
            <i className="ri-price-tag-3-line mb-4 block text-5xl text-gray-300"></i>

            <h3 className="mb-2 text-xl font-bold text-gray-800">
              No deals found
            </h3>

            <p className="text-gray-500">
              Try another search.
            </p>
          </div>
        )}
      </section>

      <section className="bg-red-600 px-6 py-16">
        <div className="mx-auto max-w-5xl text-center text-white">
          <i className="ri-shopping-bag-3-fill mb-4 block text-5xl"></i>

          <h2 className="mb-4 text-3xl font-extrabold md:text-4xl">
            Hungry Already?
          </h2>

          <p className="mb-7 text-red-100">
            Choose your favorite food and enjoy a delicious
            Pizza House meal.
          </p>

          <a
            href="/cart"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 font-bold text-red-600 transition hover:bg-gray-100"
          >
            <i className="ri-shopping-cart-2-line"></i>
            View Cart
          </a>
        </div>
      </section>
    </main>
  );
}