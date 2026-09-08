"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    // Temporary login
    // Backend authentication will be added later

    if (
      email === "admin@pizzahouse.com" &&
      password === "admin123"
    ) {
      localStorage.setItem("isAdminLoggedIn", "true");

      router.push("/dashboard");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg">
            <i className="ri-restaurant-2-fill text-3xl"></i>
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900">
            Pizza House
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Admin Dashboard Login
          </p>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-xl">

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Welcome Back
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Login to access your dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Email Address
              </label>

              <div className="relative">
                <i className="ri-mail-line absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-400"></i>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@pizzahouse.com"
                  className="w-full rounded-xl border border-gray-200 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Password
              </label>

              <div className="relative">
                <i className="ri-lock-line absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-400"></i>

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-gray-200 py-3.5 pl-11 pr-12 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-gray-400 hover:text-gray-700"
                >
                  <i
                    className={
                      showPassword
                        ? "ri-eye-off-line"
                        : "ri-eye-line"
                    }
                  ></i>
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                <i className="ri-error-warning-line text-lg"></i>
                {error}
              </div>
            )}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3.5 font-bold text-white shadow-md transition hover:bg-red-700"
            >
              <i className="ri-login-box-line text-lg"></i>
              Login to Dashboard
            </button>

          </form>

          <div className="mt-6 border-t border-gray-100 pt-5 text-center">
            <p className="text-xs text-gray-400">
              Pizza House Admin Panel
            </p>
          </div>

        </div>

      </div>

    </main>
  );
}
