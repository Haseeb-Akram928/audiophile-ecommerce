import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/apiProducts";
import { useSearchParams } from "react-router-dom";

export function useProducts() {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get("sort") || "";

  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: ["products", sort],
    queryFn: () => getProducts({ sort }),
  });

  return { isLoading, products, error };
}
