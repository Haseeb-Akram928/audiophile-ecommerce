import styles from "./AnalyticsDashboard.module.css";
import ChartCard from "./ChartCard";
import TopProductsBarChart from "./TopProductsBarChart";
import { useTopProducts } from "./useAnalyticsData";
import Loader from "@/components/ui/Loader";

function ProductAnalytics() {
  const { topProducts, isLoading } = useTopProducts(10);

  if (isLoading) return <Loader />;

  return (
    <div className={styles.page}>
      <div className={styles.overviewGrid}>
        <ChartCard title="Top Products by Revenue" subtitle="Last 30 Days">
          <TopProductsBarChart data={topProducts || []} dataKey="total_revenue" />
        </ChartCard>
        
        <ChartCard title="Top Products by Units Sold" subtitle="Last 30 Days">
          <TopProductsBarChart data={topProducts || []} dataKey="total_sold" />
        </ChartCard>
      </div>
    </div>
  );
}

export default ProductAnalytics;
