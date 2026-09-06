"use client";

import { useEffect, useState } from "react";

type Offer = {
  id: number;
  title: string;
  code: string;
  discount: string;
  validUntil: string;
  status: string;
};

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);

  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [validUntil, setValidUntil] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);

  // Load offers from localStorage
  useEffect(() => {
    const savedOffers = localStorage.getItem("pizza-offers");

    if (!savedOffers) {
      setOffers([]);
      return;
    }

    try {
      setOffers(JSON.parse(savedOffers));
    } catch (error) {
      console.error("Failed to load offers:", error);
      setOffers([]);
    }
  }, []);

  // Automatically determine status
  const getStatus = (date: string) => {
    const today = new Date();
    const validDate = new Date(date);

    if (validDate < today) {
      return "Expired";
    }

    return "Active";
  };

  // Add / Update Offer
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || !code || !discount || !validUntil) {
      alert("Please fill all fields.");
      return;
    }

    const status = getStatus(validUntil);

    if (editingId !== null) {
      const updatedOffers = offers.map((offer) =>
        offer.id === editingId
          ? {
              ...offer,
              title,
              code: code.toUpperCase(),
              discount,
              validUntil,
              status,
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
        code: code.toUpperCase(),
        discount,
        validUntil,
        status,
      };

      const updatedOffers = [...offers, newOffer];

      setOffers(updatedOffers);

      localStorage.setItem(
        "pizza-offers",
        JSON.stringify(updatedOffers)
      );
    }

    setTitle("");
    setCode("");
    setDiscount("");
    setValidUntil("");
  };

  // Edit
  const handleEdit = (offer: Offer) => {
    setEditingId(offer.id);

    setTitle(offer.title);
    setCode(offer.code);
    setDiscount(offer.discount);
    setValidUntil(offer.validUntil);
  };

  // Cancel Edit
  const handleCancel = () => {
    setEditingId(null);

    setTitle("");
    setCode("");
    setDiscount("");
    setValidUntil("");
  };

  // Delete
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
    <div className="text-black">

      {/* Header */}

      <div className="mb-8">
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
              placeholder="e.g. Weekend Special"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black placeholder-gray-400 outline-none focus:ring-2 focus:ring-black"
            />
          </div>


          {/* Code */}

          <div>
            <label className="block mb-2 font-medium text-black">
              Offer Code
            </label>

            <input
              type="text"
              placeholder="e.g. WEEKEND20"
              value={code}
              onChange={(e) =>
                setCode(e.target.value)
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
              placeholder="e.g. 20%"
              value={discount}
              onChange={(e) =>
                setDiscount(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black placeholder-gray-400 outline-none focus:ring-2 focus:ring-black"
            />
          </div>


          {/* Valid Until */}

          <div>
            <label className="block mb-2 font-medium text-black">
              Valid Until
            </label>

            <input
              type="date"
              value={validUntil}
              onChange={(e) =>
                setValidUntil(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black outline-none focus:ring-2 focus:ring-black"
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
            Expired Offers
          </p>

          <h2 className="text-2xl font-bold mt-2 text-black">
            {
              offers.filter(
                (offer) => offer.status === "Expired"
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
                  Code
                </th>

                <th className="text-left px-6 py-4 text-black">
                  Discount
                </th>

                <th className="text-left px-6 py-4 text-black">
                  Valid Until
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
                    colSpan={6}
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

                    <td className="px-6 py-4 font-semibold text-black">
                      {offer.title}
                    </td>


                    <td className="px-6 py-4">

                      <span className="bg-gray-100 px-3 py-1 rounded-md font-mono text-sm text-black">
                        {offer.code}
                      </span>

                    </td>


                    <td className="px-6 py-4 font-semibold text-black">
                      {offer.discount}
                    </td>


                    <td className="px-6 py-4 text-gray-600">
                      {offer.validUntil}
                    </td>


                    <td className="px-6 py-4">

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          offer.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
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