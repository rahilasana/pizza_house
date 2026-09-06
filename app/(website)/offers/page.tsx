"use client";

import { useEffect, useState } from "react";

type Offer = {
  id: number;
  title: string;
  description: string;
  originalPrice: string;
  offerPrice: string;
  discount: string;
  status: string;
};

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [discount, setDiscount] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    const savedOffers = localStorage.getItem("pizza-offers");

    if (savedOffers) {
      try {
        setOffers(JSON.parse(savedOffers));
      } catch (error) {
        console.error("Failed to load offers:", error);
      }

      return;
    }

    const defaultOffers: Offer[] = [
      {
        id: 1,
        title: "Family Feast",
        description:
          "Get 2 large pizzas with garlic bread and a bottle of soft drink.",
        originalPrice: "$39.99",
        offerPrice: "$29.99",
        discount: "25% OFF",
        status: "Active",
      },
      {
        id: 2,
        title: "Weekend Special",
        description:
          "Buy one large pizza and get your second pizza at 50% off.",
        originalPrice: "",
        offerPrice: "",
        discount: "50% OFF",
        status: "Active",
      },
      {
        id: 3,
        title: "Free Delivery",
        description:
          "Enjoy free delivery on all orders above $25. Hot pizza, delivered right to your door.",
        originalPrice: "",
        offerPrice: "",
        discount: "FREE DELIVERY",
        status: "Active",
      },
    ];

    setOffers(defaultOffers);

    localStorage.setItem(
      "pizza-offers",
      JSON.stringify(defaultOffers)
    );
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || !description || !discount) {
      alert("Please fill all required fields.");
      return;
    }

    if (editingId !== null) {
      const updatedOffers = offers.map((offer) =>
        offer.id === editingId
          ? {
              ...offer,
              title,
              description,
              originalPrice,
              offerPrice,
              discount,
            }
          : offer
      );

      setOffers(updatedOffers);

      localStorage.setItem(
        "pizza-offers",
        JSON.stringify(updatedOffers)
      );

      setEditingId(null);
    } else {
      const newOffer: Offer = {
        id: Date.now(),
        title,
        description,
        originalPrice,
        offerPrice,
        discount,
        status: "Active",
      };

      const updatedOffers = [...offers, newOffer];

      setOffers(updatedOffers);

      localStorage.setItem(
        "pizza-offers",
        JSON.stringify(updatedOffers)
      );
    }

    setTitle("");
    setDescription("");
    setOriginalPrice("");
    setOfferPrice("");
    setDiscount("");
  };

  const handleEdit = (offer: Offer) => {
    setEditingId(offer.id);

    setTitle(offer.title);
    setDescription(offer.description);
    setOriginalPrice(offer.originalPrice);
    setOfferPrice(offer.offerPrice);
    setDiscount(offer.discount);
  };

  const handleCancel = () => {
    setEditingId(null);

    setTitle("");
    setDescription("");
    setOriginalPrice("");
    setOfferPrice("");
    setDiscount("");
  };

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this offer?"
    );

    if (!confirmDelete) return;

    const updatedOffers = offers.filter(
      (offer) => offer.id !== id
    );

    setOffers(updatedOffers);

    localStorage.setItem(
      "pizza-offers",
      JSON.stringify(updatedOffers)
    );
  };

  return (
    <div className="text-black mt-25">

      {/* Header */}

      <div className="mb-8 pl-6">
        <h1 className="text-3xl font-bold text-black">
          Offers
        </h1>

        <p className="text-gray-600 mt-2">
          Create and manage promotional offers.
        </p>
      </div>


      {/* Add / Edit Form */}

      <div className="bg-white shadow rounded-xl p-5 mb-8">

        <h2 className="text-lg font-semibold text-black mb-4">
          {editingId !== null
            ? "Edit Offer"
            : "Add New Offer"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >

          {/* Title */}

          <div>
            <label className="block mb-2 font-medium text-black">
              Offer Title
            </label>

            <input
              type="text"
              placeholder="e.g. Family Feast"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black placeholder-gray-400 outline-none focus:ring-2 focus:ring-black"
            />
          </div>


          {/* Discount */}

          <div>
            <label className="block mb-2 font-medium text-black">
              Discount
            </label>

            <input
              type="text"
              placeholder="e.g. 25% OFF"
              value={discount}
              onChange={(e) =>
                setDiscount(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black placeholder-gray-400 outline-none focus:ring-2 focus:ring-black"
            />
          </div>


          {/* Original Price */}

          <div>
            <label className="block mb-2 font-medium text-black">
              Original Price
            </label>

            <input
              type="text"
              placeholder="e.g. $39.99"
              value={originalPrice}
              onChange={(e) =>
                setOriginalPrice(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black placeholder-gray-400 outline-none focus:ring-2 focus:ring-black"
            />
          </div>


          {/* Offer Price */}

          <div>
            <label className="block mb-2 font-medium text-black">
              Offer Price
            </label>

            <input
              type="text"
              placeholder="e.g. $29.99"
              value={offerPrice}
              onChange={(e) =>
                setOfferPrice(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black placeholder-gray-400 outline-none focus:ring-2 focus:ring-black"
            />
          </div>


          {/* Description */}

          <div className="md:col-span-2">
            <label className="block mb-2 font-medium text-black">
              Description
            </label>

            <textarea
              placeholder="Enter offer description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black placeholder-gray-400 outline-none focus:ring-2 focus:ring-black"
            />
          </div>


          {/* Buttons */}

          <div className="md:col-span-2 flex gap-3 pt-2">

            <button
              type="submit"
              className="bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              {editingId !== null
                ? "Update Offer"
                : "+ Add Offer"}
            </button>

            {editingId !== null && (
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-200 text-gray-800 px-5 py-3 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            )}

          </div>

        </form>
      </div>


      {/* Summary Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">

        <div className="bg-white shadow rounded-xl p-5">
          <p className="text-gray-500 text-sm">
            Total Offers
          </p>

          <h2 className="text-2xl font-bold mt-2 text-black">
            {offers.length}
          </h2>
        </div>


        <div className="bg-white shadow rounded-xl p-5">
          <p className="text-gray-500 text-sm">
            Active Offers
          </p>

          <h2 className="text-2xl font-bold mt-2 text-black">
            {
              offers.filter(
                (offer) => offer.status === "Active"
              ).length
            }
          </h2>
        </div>


        <div className="bg-white shadow rounded-xl p-5">
          <p className="text-gray-500 text-sm">
            Inactive Offers
          </p>

          <h2 className="text-2xl font-bold mt-2 text-black">
            {
              offers.filter(
                (offer) => offer.status !== "Active"
              ).length
            }
          </h2>
        </div>

      </div>


      {/* Offers Table */}

      <div className="bg-white shadow rounded-xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="text-left px-6 py-4 text-black">
                  Offer
                </th>

                <th className="text-left px-6 py-4 text-black">
                  Discount
                </th>

                <th className="text-left px-6 py-4 text-black">
                  Price
                </th>

                <th className="text-left px-6 py-4 text-black">
                  Status
                </th>

                <th className="text-left px-6 py-4 text-black">
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {offers.length === 0 ? (

                <tr>

                  <td
                    colSpan={5}
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    No offers found.
                  </td>

                </tr>

              ) : (

                offers.map((offer) => (

                  <tr
                    key={offer.id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="px-6 py-4">

                      <p className="font-semibold text-black">
                        {offer.title}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        {offer.description}
                      </p>

                    </td>


                    <td className="px-6 py-4 font-semibold text-black">
                      {offer.discount}
                    </td>


                    <td className="px-6 py-4">

                      {offer.originalPrice &&
                      offer.offerPrice ? (
                        <div>

                          <span className="text-gray-400 line-through mr-2">
                            {offer.originalPrice}
                          </span>

                          <span className="font-bold text-red-600">
                            {offer.offerPrice}
                          </span>

                        </div>
                      ) : (
                        <span className="text-gray-500">
                          Special Deal
                        </span>
                      )}

                    </td>


                    <td className="px-6 py-4">

                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                        {offer.status}
                      </span>

                    </td>


                    <td className="px-6 py-4">

                      <div className="flex gap-3">

                        <button
                          onClick={() =>
                            handleEdit(offer)
                          }
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(offer.id)
                          }
                          className="text-red-600 hover:text-red-800 font-medium"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}