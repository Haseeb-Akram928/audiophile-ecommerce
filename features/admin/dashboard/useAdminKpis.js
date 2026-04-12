import { useQuery } from "@tanstack/react-query";
import { getAdminKpis, getDailyRevenue, getCategoryRevenue } from "@/services/apiAdminAnalytics";

export function useAdminKpis() {
  const { data: kpis, isLoading, error } = useQuery({
    queryKey: ["admin_kpis"],
    queryFn: getAdminKpis,
  });

  return { kpis, isLoading, error };
}

export function useDailyRevenue(days = 30) {
  const { data: revenueData, isLoading, error } = useQuery({
    queryKey: ["admin_daily_revenue", days],
    queryFn: () => getDailyRevenue(days),
  });

  return { revenueData, isLoading, error };
}

export function useCategoryRevenue() {
  const { data: categoryData, isLoading, error } = useQuery({
    queryKey: ["admin_category_revenue"],
    queryFn: getCategoryRevenue,
  });

  return { categoryData, isLoading, error };
}
