import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/apiProducts";

export function useSearchProducts(searchQuery) {
  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: ["products", "search", searchQuery],
    queryFn: () => getProducts({ search: searchQuery }),
    enabled: searchQuery.length >= 2,
    staleTime: 60 * 1000, // Cache searches for 1 minute
  });

  return { isLoading, products, error };
}
