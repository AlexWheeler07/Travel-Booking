// User dashboard component
import React from "react";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center">Please login to access dashboard</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <p className="text-lg">{user.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <p className="text-lg">{user.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Account Type
              </label>
              <p className="text-lg">
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    user.isAdmin
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {user.isAdmin ? "Admin" : "User"}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium mb-2">Browse Trips</h3>
              <p className="text-sm text-gray-600 mb-3">
                Discover amazing destinations
              </p>
              <a
                href="/"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                View Trips
              </a>
            </div>

            {user.isAdmin && (
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium mb-2">Add New Trip</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Create a new travel package
                </p>
                <a
                  href="/admin/add-trip"
                  className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Add Trip
                </a>
              </div>
            )}

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium mb-2">My Bookings</h3>
              <p className="text-sm text-gray-600 mb-3">
                View your trip history
              </p>
              <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
