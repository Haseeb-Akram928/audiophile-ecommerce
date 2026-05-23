import { useQuery } from "@tanstack/react-query";
import { getAdminRole } from "@/services/apiAdminAuth";
import { useUser } from "@/features/auth/useUser";

export function useAdminUser() {
  const { user, isLoading: isUserLoading } = useUser();

  const { data: adminRole, isLoading: isAdminLoading } = useQuery({
    queryKey: ["adminRole", user?.id],
    queryFn: () => getAdminRole(user?.id),
    enabled: !!user?.id,
  });

  return {
    adminRole,
    isLoading: isUserLoading || isAdminLoading,
    isAdmin: !!adminRole,
    role: adminRole?.role || null, // 'super_admin', 'admin', 'moderator', 'viewer'
  };
}
