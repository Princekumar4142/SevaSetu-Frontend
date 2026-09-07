import api from "./api";

const userService = {
  getProfile: () => api.get("/users/profile").then((r) => r.data),
  updateProfile: (payload) => api.put("/users/profile", payload).then((r) => r.data),
  getAllUsers: (params = {}) => api.get("/users", { params }).then((r) => r.data),
  deleteUser: (userId) => api.delete(`/users/${userId}`).then((r) => r.data),
  toggleUserStatus: (userId, isActive) => api.patch(`/users/${userId}/status`, { isActive }).then((r) => r.data),
};

export default userService;

