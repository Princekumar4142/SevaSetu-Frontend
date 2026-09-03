import api from "./api";

const bookingService = {
  createBooking: (payload) => api.post("/bookings", payload).then((r) => r.data),
  getMyBookings: (status = "") => api.get(`/bookings/my${status ? `?status=${status}` : ""}`).then((r) => r.data),
  getWorkerBookings: (status = "") => api.get(`/bookings/worker${status ? `?status=${status}` : ""}`).then((r) => r.data),
  updateBookingStatus: (bookingId, status) => api.patch(`/bookings/${bookingId}/status`, { status }).then((r) => r.data),
  getCooperativeBookings: () => api.get("/bookings/cooperative").then((r) => r.data),
  getAllBookings: () => api.get("/bookings/all").then((r) => r.data),
  getBookingById: (id) => api.get(`/bookings/${id}`).then((r) => r.data),
};

export default bookingService;
