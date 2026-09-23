export const ROLES = Object.freeze({
  CUSTOMER: "CUSTOMER",
  WORKER: "WORKER",
  COOPERATIVE_ADMIN: "COOPERATIVE_ADMIN",
  FEDERATION_ADMIN: "FEDERATION_ADMIN",
  PLATFORM_ADMIN: "PLATFORM_ADMIN",
});

// Where each role lands after login / where their protected routes live.
export const ROLE_HOME = {
  [ROLES.CUSTOMER]: "/customer",
  [ROLES.WORKER]: "/worker",
  [ROLES.COOPERATIVE_ADMIN]: "/cooperative",
  [ROLES.FEDERATION_ADMIN]: "/federation",
  [ROLES.PLATFORM_ADMIN]: "/admin",
};

export const ROLE_PROFILE = {
  [ROLES.CUSTOMER]: "/customer/profile",
  [ROLES.WORKER]: "/worker/profile",
  [ROLES.COOPERATIVE_ADMIN]: "/cooperative/profile",
  [ROLES.FEDERATION_ADMIN]: "/federation/profile",
  [ROLES.PLATFORM_ADMIN]: "/admin/profile",
};

export const getHomePath = (role) => {
  if (!role) return "/";
  const normalized = String(role).toUpperCase();
  if (normalized === "ADMIN") return "/admin";
  return ROLE_HOME[role] || ROLE_HOME[normalized] || "/";
};

export const getProfilePath = (role) => {
  if (!role) return "/customer/profile";
  const normalized = String(role).toUpperCase();
  if (normalized === "ADMIN") return "/admin/profile";
  return ROLE_PROFILE[role] || ROLE_PROFILE[normalized] || "/customer/profile";
};

