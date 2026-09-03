import api from "./api";

const workerService = {
  getProfile: () => api.get("/workers/profile").then((r) => r.data),
  updateProfile: (payload) => api.put("/workers/profile", payload).then((r) => r.data),
  getVerificationQueue: (status = "PENDING") => api.get(`/workers/verification?status=${encodeURIComponent(status)}`).then((r) => r.data),
  getVerificationWorker: (workerId) => api.get(`/workers/verification/${workerId}`).then((r) => r.data),
  verifyWorker: (workerId) => api.patch(`/workers/verification/${workerId}/verify`).then((r) => r.data),
  rejectWorker: (workerId, reason) => api.patch(`/workers/verification/${workerId}/reject`, { reason }).then((r) => r.data),
  getVerifiedWorkers: (params = {}) => api.get("/workers/verified", { params }).then((r) => r.data),
  getVerifiedWorkerById: (workerId) => api.get(`/workers/verified/${workerId}`).then((r) => r.data),
};

export default workerService;
