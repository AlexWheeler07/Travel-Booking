// API service for making HTTP requests
import axios from "axios";

// Create axios instance with base URL
const API = axios.create({
  baseURL: "https://travel-booking-backend-bwm7.onrender.com/api",
});

// Add token to requests if it exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Auth API calls
export const register = (userData) => API.post("/auth/register", userData);
export const login = (userData) => API.post("/auth/login", userData);
export const getProfile = () => API.get("/auth/profile");

// Trip API calls
export const getTrips = () => API.get("/trips");
export const getTrip = (id) => API.get(`/trips/${id}`);
export const createTrip = (tripData) => API.post("/trips", tripData);
export const updateTrip = (id, tripData) => API.put(`/trips/${id}`, tripData);
export const deleteTrip = (id) => API.delete(`/trips/${id}`);
export const bookTrip = (id) => API.post(`/trips/${id}/book`);

export default API;
