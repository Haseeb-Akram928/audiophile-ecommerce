// Define which roles are allowed to perform which actions
export const PERMISSIONS = {
  view_dashboard: ["super_admin", "admin", "moderator", "viewer"],
  
  view_orders: ["super_admin", "admin", "moderator", "viewer"],
  manage_orders: ["super_admin", "admin", "moderator"],
  
  view_products: ["super_admin", "admin", "moderator", "viewer"],
  manage_products: ["super_admin", "admin"],
  
  view_users: ["super_admin", "admin"],
  manage_users: ["super_admin"],
  
  view_settings: ["super_admin", "admin"],
  manage_settings: ["super_admin"],
  
  view_activity: ["super_admin", "admin"],
  manage_roles: ["super_admin"],
};

export function hasPermission(role, action) {
  if (!role) return false;
  return PERMISSIONS[action]?.includes(role) || false;
}
