import { DollarSign, ShoppingBag, Users, AlertCircle } from "lucide-react";
import styles from "./AdminDashboard.module.css";
import KpiCard from "./KpiCard";
import RevenueChart from "./RevenueChart";
import CategoryPieChart from "./CategoryPieChart";
import { useAdminKpis, useDailyRevenue, useCategoryRevenue } from "./useAdminKpis";
import Loader from "@/components/ui/Loader";

function AdminDashboard() {
  const { kpis, isLoading: isKpisLoading } = useAdminKpis();
  const { revenueData, isLoading: isRevenueLoading } = useDailyRevenue(30);
  const { categoryData, isLoading: isCategoryLoading } = useCategoryRevenue();

  if (isKpisLoading || isRevenueLoading || isCategoryLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard overview</h1>
          <p className={styles.subtitle}>Welcome back. Here's what's happening today.</p>
        </div>
      </div>

      <div className={styles.kpiGrid}>
        <KpiCard 
          title="Total Revenue" 
          value={kpis?.total_revenue || 0} 
          icon={DollarSign} 
          isCurrency 
          trend="up" 
          trendValue="12.5%" 
        />
        <KpiCard 
          title="Total Orders" 
          value={kpis?.total_orders || 0} 
          icon={ShoppingBag} 
        />
        <KpiCard 
          title="Active Users" 
          value={kpis?.total_users || 0} 
          icon={Users} 
          trend="up" 
          trendValue="5.2%" 
        />
        <KpiCard 
          title="Pending Orders" 
          value={kpis?.pending_orders || 0} 
          icon={AlertCircle} 
        />
      </div>

      <div className={styles.chartsGrid}>
        <RevenueChart data={revenueData || []} />
        <CategoryPieChart data={categoryData || []} />
      </div>
    </div>
  );
}

export default AdminDashboard;
