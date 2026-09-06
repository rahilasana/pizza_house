"use client";

import { useEffect, useState } from "react";

type Settings = {
  storeName: string;
  email: string;
  phone: string;
  deliveryFee: string;
  notifications: boolean;
};

const defaultSettings: Settings = {
  storeName: "Pizza House",
  email: "admin@pizzahouse.com",
  phone: "+92 300 1234567",
  deliveryFee: "5",
  notifications: true,
};

export default function SettingsPage() {
  const [storeName, setStoreName] = useState(
    defaultSettings.storeName
  );

  const [email, setEmail] = useState(
    defaultSettings.email
  );

  const [phone, setPhone] = useState(
    defaultSettings.phone
  );

  const [deliveryFee, setDeliveryFee] = useState(
    defaultSettings.deliveryFee
  );

  const [notifications, setNotifications] = useState(
    defaultSettings.notifications
  );

  const [saved, setSaved] = useState(false);

  // Change Password states
  const [showPasswordForm, setShowPasswordForm] =
    useState(false);

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [passwordMessage, setPasswordMessage] =
    useState("");

  const [passwordSuccess, setPasswordSuccess] =
    useState(false);

  // Load saved settings
  useEffect(() => {
    const savedSettings = localStorage.getItem(
      "pizza-settings"
    );

    if (savedSettings) {
      try {
        const settings: Settings =
          JSON.parse(savedSettings);

        setStoreName(settings.storeName);
        setEmail(settings.email);
        setPhone(settings.phone);
        setDeliveryFee(settings.deliveryFee);
        setNotifications(settings.notifications);
      } catch (error) {
        console.error(
          "Failed to load settings:",
          error
        );
      }
    }

    // Create default admin password
    const savedPassword = localStorage.getItem(
      "pizza-admin-password"
    );

    if (!savedPassword) {
      localStorage.setItem(
        "pizza-admin-password",
        "admin123"
      );
    }
  }, []);

  // Save settings
  const handleSave = () => {
    const settings: Settings = {
      storeName,
      email,
      phone,
      deliveryFee,
      notifications,
    };

    localStorage.setItem(
      "pizza-settings",
      JSON.stringify(settings)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  // Change Password
  const handleChangePassword = () => {
    setPasswordMessage("");
    setPasswordSuccess(false);

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      setPasswordMessage(
        "Please fill in all password fields."
      );
      return;
    }

    const savedPassword =
      localStorage.getItem("pizza-admin-password");

    if (currentPassword !== savedPassword) {
      setPasswordMessage(
        "Current password is incorrect."
      );
      return;
    }

    if (newPassword.length < 6) {
      setPasswordMessage(
        "New password must be at least 6 characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage(
        "New passwords do not match."
      );
      return;
    }

    localStorage.setItem(
      "pizza-admin-password",
      newPassword
    );

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setPasswordSuccess(true);
    setPasswordMessage(
      "Password changed successfully!"
    );

    setTimeout(() => {
      setShowPasswordForm(false);
      setPasswordSuccess(false);
      setPasswordMessage("");
    }, 2000);
  };

  return (
    <div>
      {/* Header */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Settings
        </h1>

        <p className="text-gray-600 mt-2">
          Manage your store settings and preferences.
        </p>
      </div>

      <div className="space-y-6">

        {/* Store Information */}

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-bold mb-6 text-gray-900">
            Store Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Store Name */}

            <div>
              <label className="block text-sm font-medium mb-2">
                Store Name
              </label>

              <input
                type="text"
                value={storeName}
                onChange={(e) =>
                  setStoreName(e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Email */}

            <div>
              <label className="block text-sm font-medium mb-2">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Phone */}

            <div>
              <label className="block text-sm font-medium mb-2">
                Phone
              </label>

              <input
                type="text"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Delivery Fee */}

            <div>
              <label className="block text-sm font-medium mb-2">
                Delivery Fee
              </label>

              <input
                type="number"
                min="0"
                value={deliveryFee}
                onChange={(e) =>
                  setDeliveryFee(e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

          </div>
        </div>

        {/* Notifications */}

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-bold mb-5 text-gray-900">
            Notifications
          </h2>

          <div className="flex items-center justify-between gap-5">

            <div>
              <p className="font-medium">
                Order Notifications
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Receive notifications when a new order
                is placed.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setNotifications(!notifications)
              }
              className={`relative w-12 h-6 rounded-full transition ${
                notifications
                  ? "bg-black"
                  : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${
                  notifications
                    ? "left-7"
                    : "left-1"
                }`}
              />
            </button>

          </div>
        </div>

        {/* Account */}

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-bold mb-5 text-gray-900">
            Account
          </h2>

          <div className="space-y-4">

            <div>
              <p className="text-sm text-gray-500">
                Account Email
              </p>

              <p className="font-medium">
                admin@pizzahouse.com
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowPasswordForm(
                  !showPasswordForm
                );

                setPasswordMessage("");
                setPasswordSuccess(false);
              }}
              className="border border-gray-300 px-5 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              {showPasswordForm
                ? "Cancel"
                : "Change Password"}
            </button>

          </div>

          {/* Change Password Form */}

          {showPasswordForm && (
            <div className="mt-6 border-t pt-6">

              <h3 className="text-lg font-semibold mb-5">
                Change Password
              </h3>

              <div className="max-w-xl space-y-4">

                {/* Current Password */}

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Current Password
                  </label>

                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) =>
                      setCurrentPassword(
                        e.target.value
                      )
                    }
                    placeholder="Enter current password"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                {/* New Password */}

                <div>
                  <label className="block text-sm font-medium mb-2">
                    New Password
                  </label>

                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) =>
                      setNewPassword(
                        e.target.value
                      )
                    }
                    placeholder="Enter new password"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                {/* Confirm Password */}

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Confirm New Password
                  </label>

                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value
                      )
                    }
                    placeholder="Confirm new password"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                {/* Message */}

                {passwordMessage && (
                  <p
                    className={
                      passwordSuccess
                        ? "text-green-600 font-medium"
                        : "text-red-600 font-medium"
                    }
                  >
                    {passwordMessage}
                  </p>
                )}

                {/* Change Password Button */}

                <button
                  type="button"
                  onClick={handleChangePassword}
                  className="bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800 transition font-medium"
                >
                  Update Password
                </button>

              </div>
            </div>
          )}
        </div>

        {/* Save Button */}

        <div className="flex flex-col items-end gap-3">

          {saved && (
            <p className="text-green-600 font-medium">
              Settings saved successfully!
            </p>
          )}

          <button
            onClick={handleSave}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-medium"
          >
            Save Changes
          </button>

        </div>

      </div>
    </div>
  );
}