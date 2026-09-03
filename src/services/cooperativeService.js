import api from "./api";

const cooperativeService = {
  getProfile: () => api.get("/cooperatives/profile").then((r) => r.data),
};

export default cooperativeService;
