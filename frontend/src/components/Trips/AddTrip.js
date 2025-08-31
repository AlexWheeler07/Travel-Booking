// Enhanced AddTrip.js - Beautiful Admin Form
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTrip } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const AddTrip = () => {
  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    description: "",
    price: "",
    duration: "",
    startDate: "",
    endDate: "",
    maxPeople: "",
    image: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect if not admin
  React.useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Update image preview
    if (name === "image") {
      setPreviewImage(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      setError("End date must be after start date");
      setLoading(false);
      return;
    }

    try {
      const tripData = {
        ...formData,
        image:
          formData.image ||
          "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=250&fit=crop",
      };

      await createTrip(tripData);
      alert("🎉 Trip created successfully!");
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create trip");
    } finally {
      setLoading(false);
    }
  };

  const suggestedImages = [
    {
      name: "Beach Paradise",
      url: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=400&h=250&fit=crop",
    },
    {
      name: "Mountain Adventure",
      url: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&h=250&fit=crop",
    },
    {
      name: "City Skyline",
      url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=250&fit=crop",
    },
    {
      name: "Forest Retreat",
      url: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=250&fit=crop",
    },
    {
      name: "Desert Safari",
      url: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&h=250&fit=crop",
    },
  ];

  if (!user || !user.isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Create Amazing Trip
          </h1>
          <p className="text-gray-600 text-lg">
            Add a new destination for travelers to discover
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {error}
                  </div>
                </div>
              )}

              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  ✈️ Basic Information
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trip Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    placeholder="e.g., Maldives Paradise Getaway"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Destination *
                  </label>
                  <input
                    type="text"
                    name="destination"
                    required
                    placeholder="e.g., Maldives"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={formData.destination}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    required
                    rows="4"
                    placeholder="Describe the amazing experience travelers will have..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Pricing & Duration */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  💰 Pricing & Duration
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (USD) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-3 text-gray-500">
                        $
                      </span>
                      <input
                        type="number"
                        name="price"
                        required
                        min="1"
                        step="1"
                        placeholder="2999"
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        value={formData.price}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration (days) *
                    </label>
                    <input
                      type="number"
                      name="duration"
                      required
                      min="1"
                      max="365"
                      placeholder="7"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={formData.duration}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Dates & Capacity */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  📅 Schedule & Capacity
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={formData.startDate}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date *
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      required
                      min={
                        formData.startDate ||
                        new Date().toISOString().split("T")[0]
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={formData.endDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum People *
                  </label>
                  <input
                    type="number"
                    name="maxPeople"
                    required
                    min="1"
                    max="100"
                    placeholder="20"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={formData.maxPeople}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Image */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  🖼️ Trip Image
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={formData.image}
                    onChange={handleChange}
                  />
                </div>

                {/* Suggested Images */}
                <div>
                  <p className="text-sm text-gray-600 mb-3">Quick Select:</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {suggestedImages.map((img, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, image: img.url });
                          setPreviewImage(img.url);
                        }}
                        className="relative group overflow-hidden rounded-lg border-2 border-transparent hover:border-blue-500 transition-all"
                      >
                        <img
                          src={img.url}
                          alt={img.name}
                          className="w-full h-16 object-cover group-hover:scale-110 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                          <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            {img.name}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all hover:shadow-lg transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    Creating Amazing Trip...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Create Trip
                  </div>
                )}
              </button>
            </form>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                Live Preview
              </h3>

              {/* Preview Card */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 bg-gray-50">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="h-40 bg-gray-200 relative overflow-hidden">
                    {previewImage || formData.image ? (
                      <img
                        src={previewImage || formData.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=250&fit=crop";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <div className="text-center">
                          <svg
                            className="w-12 h-12 mx-auto mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <p className="text-sm">Image Preview</p>
                        </div>
                      </div>
                    )}

                    {formData.price && (
                      <div className="absolute top-2 right-2">
                        <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-semibold">
                          ${formData.price}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h4 className="font-bold text-gray-900 mb-1">
                      {formData.title || "Trip Title"}
                    </h4>
                    <p className="text-blue-600 text-sm mb-2">
                      📍 {formData.destination || "Destination"}
                    </p>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {formData.description ||
                        "Trip description will appear here..."}
                    </p>

                    {formData.duration && (
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {formData.duration} days
                      </div>
                    )}

                    {formData.maxPeople && (
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m3 5.197V9a3 3 0 00-6 0v11.5M14 17a3 3 0 00-6 0v.5"
                          />
                        </svg>
                        Up to {formData.maxPeople} people
                      </div>
                    )}

                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 2.829l-.707.707M12 21v-1m6.364-1.636l-.707-.707M21 12h-1M4 12H3m3.343 5.657l-.707.707m2.828-2.829l-.707-.707"
                  />
                </svg>
                Pro Tips
              </h3>
              <ul className="space-y-2 text-sm opacity-90">
                <li className="flex items-start">
                  <span className="mr-2">💡</span>
                  Use high-quality images from Unsplash for better engagement
                </li>
                <li className="flex items-start">
                  <span className="mr-2">📝</span>
                  Write detailed descriptions to help travelers imagine the
                  experience
                </li>
                <li className="flex items-start">
                  <span className="mr-2">💰</span>
                  Consider seasonal pricing and competitor analysis
                </li>
                <li className="flex items-start">
                  <span className="mr-2">📅</span>
                  Allow enough time between bookings for proper planning
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTrip;
