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
