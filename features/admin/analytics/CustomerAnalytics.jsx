import { useMemo } from "react";
import { format, parseISO, startOfDay } from "date-fns";
import styles from "./AnalyticsDashboard.module.css";
import ChartCard from "./ChartCard";
import OrderStatusChart from "./OrderStatusChart";
import CustomerAcquisitionChart from "./CustomerAcquisitionChart";
import { useAdminOrders } from "../orders/useAdminOrders";
import { useAdminUsers } from "../users/useAdminUsers";
import Loader from "@/components/ui/Loader";

function CustomerAnalytics() {
  const { orders, isLoading: isOrdersLoading } = useAdminOrders();
  const { users, isLoading: isUsersLoading } = useAdminUsers();

  const statusData = useMemo(() => {
    if (!orders) return [];
    const counts = orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [orders]);

  const acquisitionData = useMemo(() => {
    if (!users) return [];
    const countsByDay = users.reduce((acc, user) => {
      if (!user.created_at) return acc;
      try {
        const day = format(startOfDay(parseISO(user.created_at)), "yyyy-MM-dd");
        acc[day] = (acc[day] || 0) + 1;
      } catch (err) {
        // Ignore invalid dates
      }
      return acc;
    }, {});
    
    // Sort chronologically
    return Object.entries(countsByDay)
      .map(([day, count]) => ({ day, users: count }))
      .sort((a, b) => a.day.localeCompare(b.day));
  }, [users]);

  if (isOrdersLoading || isUsersLoading) return <Loader />;

  return (
    <div className={styles.page}>
      <div className={styles.overviewGrid}>
        <ChartCard title="Order Status Distribution" subtitle="All Time">
          <OrderStatusChart data={statusData} />
        </ChartCard>

        <ChartCard title="Customer Acquisition" subtitle="New signups over time">
           <CustomerAcquisitionChart data={acquisitionData} />
        </ChartCard>
      </div>
    </div>
  );
}

export default CustomerAnalytics;
