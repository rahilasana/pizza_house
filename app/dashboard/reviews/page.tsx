
"use client";

import { useEffect, useState } from "react";

type Review = {
  id: number;
  customer: string;
  email: string;
  rating: number;
  comment: string;
  date: string;
  status: "Published" | "Pending";
};

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Load reviews from localStorage
  useEffect(() => {
    const savedReviews = localStorage.getItem("pizza-reviews");

    if (savedReviews) {
      try {
        const parsedReviews: Review[] = JSON.parse(savedReviews);
        setReviews(parsedReviews);
      } catch (error) {
        console.error("Failed to load reviews:", error);
        setReviews([]);
      }
    }
  }, []);

  // Calculate average rating
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (total, review) => total + review.rating,
            0
          ) / reviews.length
        ).toFixed(1)
      : "0.0";

  // Count pending reviews
  const pendingReviews = reviews.filter(
    (review) => review.status === "Pending"
  ).length;

  // Search + filter
  const filteredReviews = reviews.filter((review) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      review.customer.toLowerCase().includes(searchText) ||
      review.email.toLowerCase().includes(searchText) ||
      review.comment.toLowerCase().includes(searchText);

    const matchesFilter =
      filter === "All" || review.status === filter;

    return matchesSearch && matchesFilter;
  });

  // Approve review
  const approveReview = (id: number) => {
    setReviews((currentReviews) => {
      const updatedReviews = currentReviews.map((review) =>
        review.id === id
          ? {
              ...review,
              status: "Published" as const,
            }
          : review
      );

      localStorage.setItem(
        "pizza-reviews",
        JSON.stringify(updatedReviews)
      );

      return updatedReviews;
    });
  };

  // Delete review
  const deleteReview = (id: number) => {
    setReviews((currentReviews) => {
      const updatedReviews = currentReviews.filter(
        (review) => review.id !== id
      );

      localStorage.setItem(
        "pizza-reviews",
        JSON.stringify(updatedReviews)
      );

      return updatedReviews;
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Reviews
        </h1>

        <p className="mt-2 text-gray-600">
          Manage customer reviews and feedback.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {/* Total Reviews */}
        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm text-gray-500">
            Total Reviews
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-900">
            {reviews.length}
          </h2>
        </div>

        {/* Average Rating */}
        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm text-gray-500">
            Average Rating
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-900">
            <span className="text-yellow-500">★</span>{" "}
            {averageRating}
          </h2>
        </div>

        {/* Pending Reviews */}
        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm text-gray-500">
            Pending Reviews
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-900">
            {pendingReviews}
          </h2>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="mb-6 flex flex-col gap-4 rounded-xl bg-white p-5 shadow sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          placeholder="Search reviews..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-gray-500 sm:w-80"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2.5 outline-none"
        >
          <option value="All">All Reviews</option>
          <option value="Published">Published</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      {/* Reviews */}
      <div className="space-y-5">
        {filteredReviews.map((review) => (
          <div
            key={review.id}
            className="rounded-xl bg-white p-6 shadow"
          >
            {/* Customer + Rating */}
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              {/* Customer */}
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {review.customer}
                </h2>

                <p className="text-sm text-gray-500">
                  {review.email}
                </p>

                <p className="mt-1 text-sm text-gray-400">
                  {review.date}
                </p>
              </div>

              {/* Rating + Status */}
              <div className="flex flex-col items-start gap-2 md:items-end">
                <div className="text-lg">
                  <span className="text-yellow-500">
                    {"★".repeat(review.rating)}
                  </span>

                  <span className="text-gray-300">
                    {"★".repeat(5 - review.rating)}
                  </span>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    review.status === "Published"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {review.status}
                </span>
              </div>
            </div>

            {/* Comment */}
            <div className="mt-5 border-t pt-5">
              <p className="text-gray-700">
                "{review.comment}"
              </p>
            </div>

            {/* Actions */}
            <div className="mt-5 flex gap-5">
              {/* Approve */}
              {review.status === "Pending" && (
                <button
                  onClick={() => approveReview(review.id)}
                  className="font-medium text-green-600 hover:text-green-800"
                >
                  Approve
                </button>
              )}

              {/* Delete */}
              <button
                onClick={() => deleteReview(review.id)}
                className="font-medium text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {/* No Reviews */}
        {filteredReviews.length === 0 && (
          <div className="rounded-xl bg-white p-10 text-center shadow">
            <h2 className="text-xl font-semibold text-gray-900">
              No Reviews Found
            </h2>

            <p className="mt-2 text-gray-500">
              {reviews.length === 0
                ? "No customer reviews have been submitted yet."
                : "Try changing your search or filter."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

