import { useAdminUser } from "./useAdminUser";
import { hasPermission } from "./permissions";

function PermissionGate({ action, children, fallback = null }) {
  const { role, isLoading } = useAdminUser();

  if (isLoading) return null;

  if (hasPermission(role, action)) {
    return children;
  }

  return fallback;
}

export default PermissionGate;
