// Enhanced TripCard.js - Beautiful and Modern
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { bookTrip } from "../../services/api";

const TripCard = ({ trip, onTripUpdate, onDelete }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleBooking = async () => {
    if (!user) {
      alert("Please login to book a trip");
      return;
    }

    setIsLoading(true);
    try {
      const response = await bookTrip(trip._id);
      alert("🎉 Trip booked successfully!");
      if (onTripUpdate) {
        onTripUpdate(response.data.trip);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this trip?")) {
      if (onDelete) {
        onDelete(trip._id);
      }
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isFullyBooked = trip.currentBookings >= trip.maxPeople;
  const bookingPercentage = (trip.currentBookings / trip.maxPeople) * 100;

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden">
      {/* Image Container with Overlay */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={trip.image}
          alt={trip.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
            ${trip.price}
          </span>
        </div>
        <div className="absolute top-4 left-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              isFullyBooked
                ? "bg-red-500 text-white"
                : bookingPercentage > 70
                ? "bg-orange-500 text-white"
                : "bg-green-500 text-white"
            }`}
          >
            {isFullyBooked
              ? "Fully Booked"
              : `${trip.maxPeople - trip.currentBookings} spots left`}
          </span>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

        {/* Trip Duration Badge */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
            {trip.duration} Days
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {trip.title}
          </h3>
          <p className="text-blue-600 font-medium flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            {trip.destination}
          </p>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {trip.description}
        </p>

        {/* Trip Details Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div className="flex items-center text-gray-600">
            <svg
              className="w-4 h-4 mr-2 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {formatDate(trip.startDate)}
          </div>
          <div className="flex items-center text-gray-600">
            <svg
              className="w-4 h-4 mr-2 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {trip.maxPeople} max people
          </div>
        </div>

        {/* Booking Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Bookings</span>
            <span>
              {trip.currentBookings}/{trip.maxPeople}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                isFullyBooked
                  ? "bg-red-500"
                  : bookingPercentage > 70
                  ? "bg-orange-500"
                  : "bg-gradient-to-r from-blue-500 to-green-500"
              }`}
              style={{ width: `${Math.min(bookingPercentage, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-2">
          <button
            onClick={handleBooking}
            disabled={isFullyBooked || !user || isLoading}
            className={`flex-1 mr-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
              isFullyBooked || !user
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-lg transform hover:scale-105"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Booking...
              </div>
            ) : isFullyBooked ? (
              "Fully Booked"
            ) : !user ? (
              "Login to Book"
            ) : (
              "Book Now"
            )}
          </button>

          {user && user.isAdmin && (
            <button
              onClick={handleDelete}
              className="px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-200 hover:shadow-lg transform hover:scale-105"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripCard;
