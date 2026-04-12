import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAdminOrders, getAdminOrderDetails, updateOrderStatus } from "@/services/apiAdminOrders";
import { useAdminUser } from "../auth/useAdminUser";
import toast from "react-hot-toast";

export function useAdminOrders() {
  const {
    isLoading,
    data: orders,
    error,
  } = useQuery({
    queryKey: ["admin_orders"],
    queryFn: getAdminOrders,
  });

  return { isLoading, orders, error };
}

export function useAdminOrderDetails(id) {
  const {
    isLoading,
    data: order,
    error,
  } = useQuery({
    queryKey: ["admin_orders", id],
    queryFn: () => getAdminOrderDetails(id),
    enabled: !!id,
  });

  return { isLoading, order, error };
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();
  const { user } = useAdminUser();

  const { mutate: updateStatus, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, status }) => updateOrderStatus({ id, status, adminId: user?.id }),
    onSuccess: () => {
      toast.success("Order status updated");
      queryClient.invalidateQueries({ queryKey: ["admin_orders"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateStatus, isUpdating };
}
