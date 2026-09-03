import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({ baseURL });

// Attach the JWT to every outgoing request, if we have one.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("sevasetu_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// On a 401 (expired/invalid token), clear local session so the UI can
// redirect to login instead of silently failing subsequent requests.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("sevasetu_token");
    }
    return Promise.reject(error);
  }
);

export default api;
