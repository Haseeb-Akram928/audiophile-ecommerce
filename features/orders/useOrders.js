import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/services/apiOrders";
import { useUser } from "@/features/auth/useUser"; // Assuming useUser is in auth folder

export function useOrders() {
  const { user } = useUser();
  const userId = user?.id;

  const {
    isLoading,
    data: orders,
    error,
  } = useQuery({
    queryKey: ["orders", userId],
    queryFn: () => getOrders(userId),
    enabled: !!userId, // Only run the query if userId is available
  });

  return { isLoading, orders, error };
}
