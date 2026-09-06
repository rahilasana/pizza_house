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

  useEffect(() => {
    const savedReviews = localStorage.getItem("pizza-reviews");

    if (savedReviews) {
      try {
        const parsedReviews: Review[] = JSON.parse(savedReviews);

        const publishedReviews = parsedReviews.filter(
          (review) => review.status === "Published"
        );

        setReviews(publishedReviews);
      } catch (error) {
        console.error("Failed to load reviews:", error);
      }
    }
  }, []);

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((total, review) => total + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16">
      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <div className="mb-12 text-center mt-10">
          <h1 className="text-4xl font-bold text-gray-900">
            Customer Reviews
          </h1>

          <p className="mt-3 text-gray-600">
            See what our customers say about our pizzas.
          </p>
        </div>

        {/* Rating Summary */}
        <div className="mb-10 rounded-2xl bg-white p-8 text-center shadow">
          <h2 className="text-4xl font-bold text-gray-900">
            {averageRating}
          </h2>

          <div className="mt-2 text-2xl text-yellow-500">
            {"★".repeat(
              Math.round(Number(averageRating))
            )}
            <span className="text-gray-300">
              {"★".repeat(
                5 - Math.round(Number(averageRating))
              )}
            </span>
          </div>

          <p className="mt-2 text-gray-500">
            Based on {reviews.length} customer review
            {reviews.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Reviews */}
        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="rounded-2xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Customer */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {review.customer}
                    </h3>

                    <p className="text-sm text-gray-400">
                      {review.date}
                    </p>
                  </div>

                  {/* Stars */}
                  <div className="text-lg">
                    <span className="text-yellow-500">
                      {"★".repeat(review.rating)}
                    </span>

                    <span className="text-gray-300">
                      {"★".repeat(5 - review.rating)}
                    </span>
                  </div>
                </div>

                {/* Comment */}
                <p className="mt-5 leading-7 text-gray-600">
                  "{review.comment}"
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white p-12 text-center shadow">
            <div className="text-5xl">⭐</div>

            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              No Reviews Yet
            </h2>

            <p className="mt-2 text-gray-500">
              Be the first customer to share your experience!
            </p>
          </div>
        )}

      </div>
    </main>
  );
}