import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/services/apiProducts";

export function useProduct(slug) {
  const {
    isLoading,
    data: product,
    error,
  } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProduct(slug),
  });

  return { isLoading, product, error };
}
