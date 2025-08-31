// Enhanced TripList.js - Beautiful and Responsive
import React, { useState, useEffect } from "react";
import { getTrips, deleteTrip } from "../../services/api";
import TripCard from "./TripCard";

const TripList = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await getTrips();
      setTrips(response.data);
    } catch (error) {
      setError("Failed to fetch trips");
    } finally {
      setLoading(false);
    }
  };

  const handleTripUpdate = (updatedTrip) => {
    setTrips(
      trips.map((trip) => (trip._id === updatedTrip._id ? updatedTrip : trip))
    );
  };

  const handleTripDelete = async (tripId) => {
    try {
      await deleteTrip(tripId);
      setTrips(trips.filter((trip) => trip._id !== tripId));
      alert("✅ Trip deleted successfully");
    } catch (error) {
      alert("❌ Failed to delete trip");
    }
  };

  // Filter trips based on search and price
  const filteredTrips = trips.filter((trip) => {
    const matchesSearch =
      trip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.destination.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesPrice = true;
    if (priceFilter === "budget") matchesPrice = trip.price <= 2000;
    else if (priceFilter === "mid")
      matchesPrice = trip.price > 2000 && trip.price <= 3500;
    else if (priceFilter === "luxury") matchesPrice = trip.price > 3500;

    return matchesSearch && matchesPrice;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center min-h-64">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <div className="text-xl text-gray-600">
              Discovering amazing destinations...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center text-red-600 min-h-64 flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">😞</div>
              <div className="text-xl">{error}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Discover Your Next Adventure
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              From tropical paradises to mountain peaks, find your perfect
              getaway
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-6 py-3 pl-12 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-white/30 w-80"
                />
                <svg
                  className="w-5 h-5 text-gray-400 absolute left-4 top-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="px-6 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-white/30"
              >
                <option value="all">All Prices</option>
                <option value="budget">Budget (≤$2000)</option>
                <option value="mid">Mid-Range ($2000-$3500)</option>
                <option value="luxury">Luxury ($3500+)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Trip Stats */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {trips.length}
            </div>
            <div className="text-gray-600">Total Destinations</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {
                trips.filter((trip) => trip.currentBookings < trip.maxPeople)
                  .length
              }
            </div>
            <div className="text-gray-600">Available Now</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              ${Math.min(...trips.map((trip) => trip.price)) || 0}
            </div>
            <div className="text-gray-600">Starting From</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {Math.max(...trips.map((trip) => trip.duration)) || 0}
            </div>
            <div className="text-gray-600">Max Days</div>
          </div>
        </div>

        {/* Trips Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
            {filteredTrips.length === trips.length
              ? "All Destinations"
              : "Search Results"}
          </h2>
          <p className="text-center text-gray-600 mb-8">
            {filteredTrips.length} amazing{" "}
            {filteredTrips.length === 1 ? "destination" : "destinations"}{" "}
            waiting for you
          </p>
        </div>

        {filteredTrips.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <div className="text-6xl mb-4">🏝️</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {trips.length === 0
                  ? "No trips available yet"
                  : "No trips match your search"}
              </h3>
              <p className="text-gray-600 mb-6">
                {trips.length === 0
                  ? "Check back later for new destinations!"
                  : "Try adjusting your search or price filter"}
              </p>
              {trips.length === 0 && (
                <div className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium mb-2">💡 For Admins:</p>
                  <p>
                    Add some trips using the "Add Trip" button in the
                    navigation!
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredTrips.map((trip) => (
              <TripCard
                key={trip._id}
                trip={trip}
                onTripUpdate={handleTripUpdate}
                onDelete={handleTripDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Call to Action Section */}
      {trips.length > 0 && (
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Ready for Your Next Adventure?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Join thousands of travelers who've discovered their perfect
              getaway with us
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                Browse All Destinations
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripList;
