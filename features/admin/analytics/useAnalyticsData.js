import { useQuery } from "@tanstack/react-query";
import { getTopProducts } from "@/services/apiAdminAnalytics";

export function useTopProducts(limit = 10) {
  const { data: topProducts, isLoading, error } = useQuery({
    queryKey: ["admin_top_products", limit],
    queryFn: () => getTopProducts(limit),
  });

  return { topProducts, isLoading, error };
}
