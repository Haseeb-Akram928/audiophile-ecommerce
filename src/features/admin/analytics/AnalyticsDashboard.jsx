import styles from "./AnalyticsDashboard.module.css";
import RevenueChart from "../dashboard/RevenueChart";
import CategoryPieChart from "../dashboard/CategoryPieChart";
import { useDailyRevenue, useCategoryRevenue } from "../dashboard/useAdminKpis";
import ChartCard from "./ChartCard";
import OrdersTrendChart from "./OrdersTrendChart";
import Loader from "@/components/ui/Loader";

function AnalyticsDashboard() {
  const { revenueData, isLoading: isRevLoading } = useDailyRevenue(90); // Load 90 days for deep analytics
  const { categoryData, isLoading: isCatLoading } = useCategoryRevenue();

  if (isRevLoading || isCatLoading) {
    return <Loader />;
  }

  const columns = [
    {
      header: "Product Name",
      accessorKey: "name",
      cell: (info) => <span className={styles.productName}>{info.getValue()}</span>,
    },
    {
      header: "Category",
      accessorKey: "category",
      cell: (info) => <span className={styles.category}>{info.getValue()}</span>,
    },
    {
      header: "Units Sold",
      accessorKey: "total_units",
      cell: (info) => <span className={styles.units}>{info.getValue()}</span>,
    },
    {
      header: "Revenue Generated",
      accessorKey: "total_revenue",
      cell: (info) => (
        <span className={styles.revenue}>
          ${info.getValue()?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
      ),
    },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.overviewGrid}>
        <div className={styles.mainChart}>
          <ChartCard title="Revenue Trend" subtitle="Last 90 Days">
             <RevenueChart data={revenueData || []} />
          </ChartCard>
        </div>
        <div className={styles.sideChart}>
          <ChartCard title="Revenue by Category" subtitle="All Time">
             <CategoryPieChart data={categoryData || []} />
          </ChartCard>
        </div>
      </div>

      <div className={styles.fullWidthCard}>
         <ChartCard title="Orders Trend" subtitle="Last 90 Days">
            <OrdersTrendChart data={revenueData || []} />
         </ChartCard>
      </div>
    </div>
  );
}

export default AnalyticsDashboard;
