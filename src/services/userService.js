import api from "./api";

const userService = {
  getProfile: () => api.get("/users/profile").then((r) => r.data),
  updateProfile: (payload) => api.put("/users/profile", payload).then((r) => r.data),
};

export default userService;
