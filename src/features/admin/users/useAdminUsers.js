import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAdminUsers, promoteUserToAdmin, removeAdminRole } from "@/services/apiAdminUsers";
import { useAdminUser } from "../auth/useAdminUser";
import toast from "react-hot-toast";

export function useAdminUsers() {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ["admin_users_list"],
    queryFn: getAdminUsers,
  });

  return { users, isLoading, error };
}

export function useManageRole() {
  const queryClient = useQueryClient();
  const { user: currentAdmin } = useAdminUser();

  const { mutate: promoteUser, isPending: isPromoting } = useMutation({
    mutationFn: ({ userId, role }) => promoteUserToAdmin({ userId, role, adminId: currentAdmin?.id }),
    onSuccess: () => {
      toast.success("User role updated successfully");
      queryClient.invalidateQueries({ queryKey: ["admin_users_list"] });
    },
    onError: (err) => toast.error(err.message),
  });

  const { mutate: revokeRole, isPending: isRevoking } = useMutation({
    mutationFn: (userId) => removeAdminRole({ userId, adminId: currentAdmin?.id }),
    onSuccess: () => {
      toast.success("Admin privileges revoked");
      queryClient.invalidateQueries({ queryKey: ["admin_users_list"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { promoteUser, isPromoting, revokeRole, isRevoking };
}
