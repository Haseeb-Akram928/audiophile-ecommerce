import { useMemo } from "react";
import styles from "./AnalyticsDashboard.module.css";
import ChartCard from "./ChartCard";
import OrderStatusChart from "./OrderStatusChart";
import { useAdminOrders } from "../orders/useAdminOrders";
import Loader from "@/components/ui/Loader";

function CustomerAnalytics() {
  const { orders, isLoading } = useAdminOrders();

  const statusData = useMemo(() => {
    if (!orders) return [];
    const counts = orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [orders]);

  if (isLoading) return <Loader />;

  return (
    <div className={styles.page}>
      <div className={styles.overviewGrid} style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
        <ChartCard title="Order Status Distribution" subtitle="All Time">
          <OrderStatusChart data={statusData} />
        </ChartCard>

        {/* Placeholder for Customer Acquisition Chart (Requires Edge Function for Dates) */}
        <ChartCard title="Customer Acquisition" subtitle="New signups over time">
           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-secondary)' }}>
             Needs Edge Function (Phase 6)
           </div>
        </ChartCard>
      </div>
    </div>
  );
}

export default CustomerAnalytics;
