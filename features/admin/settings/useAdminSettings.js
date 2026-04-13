import { useQuery } from "@tanstack/react-query";
import { getActivityLogs } from "@/services/apiAdminSettings";

export function useActivityLogs() {
  const { data: logs, isLoading, error } = useQuery({
    queryKey: ["admin_activity_logs"],
    queryFn: getActivityLogs,
  });

  return { logs, isLoading, error };
}
