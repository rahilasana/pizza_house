export type InventoryItem = {
  id: string;
  name: string;
  category: string;
  stock: number;
  unit: string;
  status: "In Stock" | "Low Stock" | "Out of Stock";
};

export type RecipeIngredient = {
  inventoryName: string;
  quantity: number;
};

/*
  Recipes must match the EXACT names
  used in your menu.
*/

export const recipes: Record<string, RecipeIngredient[]> = {
  // Pizzas
  Margherita: [
    {
      inventoryName: "Mozzarella Cheese",
      quantity: 0.2,
    },
    {
      inventoryName: "Pizza Dough",
      quantity: 1,
    },
    {
      inventoryName: "Tomato Sauce",
      quantity: 0.1,
    },
  ],

  Pepperoni: [
    {
      inventoryName: "Mozzarella Cheese",
      quantity: 0.2,
    },
    {
      inventoryName: "Pizza Dough",
      quantity: 1,
    },
    {
      inventoryName: "Tomato Sauce",
      quantity: 0.1,
    },
  ],

  "Veggie Supreme": [
    {
      inventoryName: "Mozzarella Cheese",
      quantity: 0.2,
    },
    {
      inventoryName: "Pizza Dough",
      quantity: 1,
    },
    {
      inventoryName: "Tomato Sauce",
      quantity: 0.1,
    },
  ],

  "Chicken BBQ": [
    {
      inventoryName: "Mozzarella Cheese",
      quantity: 0.2,
    },
    {
      inventoryName: "Pizza Dough",
      quantity: 1,
    },
    {
      inventoryName: "Chicken",
      quantity: 0.15,
    },
  ],

  // Burgers
  "Crispy Chicken Burger": [
    {
      inventoryName: "Chicken",
      quantity: 0.15,
    },
    {
      inventoryName: "Burger Buns",
      quantity: 1,
    },
  ],

  "BBQ Chicken Burger": [
    {
      inventoryName: "Chicken",
      quantity: 0.15,
    },
    {
      inventoryName: "Burger Buns",
      quantity: 1,
    },
  ],

  // Drinks
  Cola: [
    {
      inventoryName: "Cola",
      quantity: 1,
    },
  ],

  "Mineral Water": [
    {
      inventoryName: "Mineral Water",
      quantity: 1,
    },
  ],
};


// Get stock status
export function getStockStatus(
  stock: number
): InventoryItem["status"] {
  if (stock <= 0) {
    return "Out of Stock";
  }

  if (stock <= 10) {
    return "Low Stock";
  }

  return "In Stock";
}


// Get inventory from localStorage
export function getInventory(): InventoryItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  const savedInventory =
    localStorage.getItem("pizza-inventory");

  if (!savedInventory) {
    return [];
  }

  try {
    const parsed = JSON.parse(savedInventory);

    return Array.isArray(parsed)
      ? parsed
      : [];
  } catch (error) {
    console.error(
      "Failed to load inventory:",
      error
    );

    return [];
  }
}


// Check whether enough inventory is available
export function checkInventory(cart: any[]) {
  const inventory = getInventory();

  for (const item of cart) {
    const recipe = recipes[item.name];

    // If this menu item has no recipe,
    // skip it.
    if (!recipe) {
      continue;
    }

    for (const ingredient of recipe) {
      const inventoryItem = inventory.find(
        (inv) =>
          inv.name.toLowerCase() ===
          ingredient.inventoryName.toLowerCase()
      );

      if (!inventoryItem) {
        return {
          available: false,
          message: `${ingredient.inventoryName} is not available in inventory.`,
        };
      }

      const required =
        ingredient.quantity *
        item.quantity;

      if (
        inventoryItem.stock < required
      ) {
        return {
          available: false,
          message: `Not enough ${inventoryItem.name}. Available: ${inventoryItem.stock} ${inventoryItem.unit}.`,
        };
      }
    }
  }

  return {
    available: true,
    message: "",
  };
}


// Reduce inventory after successful order
export function reduceInventory(cart: any[]) {
  const inventory = getInventory();

  const updatedInventory =
    inventory.map((inventoryItem) => {
      let newStock =
        inventoryItem.stock;

      for (const item of cart) {
        const recipe =
          recipes[item.name];

        if (!recipe) {
          continue;
        }

        for (const ingredient of recipe) {
          if (
            ingredient.inventoryName.toLowerCase() ===
            inventoryItem.name.toLowerCase()
          ) {
            const used =
              ingredient.quantity *
              item.quantity;

            newStock -= used;
          }
        }
      }

      const finalStock =
        Math.max(0, newStock);

      return {
        ...inventoryItem,

        stock: finalStock,

        status:
          getStockStatus(finalStock),
      };
    });

  localStorage.setItem(
    "pizza-inventory",
    JSON.stringify(updatedInventory)
  );
}