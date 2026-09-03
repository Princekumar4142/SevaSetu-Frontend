import api from "./api";

const authService = {
  sendOtp: (email) => api.post("/auth/send-otp", { email }).then((r) => r.data),
  verifyOtp: (email, otp) => api.post("/auth/verify-otp", { email, otp }).then((r) => r.data),
  registerCustomer: (payload) => api.post("/auth/register/customer", payload).then((r) => r.data),
  registerWorker: (payload) => api.post("/auth/register/worker", payload).then((r) => r.data),
  login: (payload) => api.post("/auth/login", payload).then((r) => r.data),
  logout: () => api.post("/auth/logout").then((r) => r.data),
  me: () => api.get("/auth/me").then((r) => r.data),
};

export default authService;
