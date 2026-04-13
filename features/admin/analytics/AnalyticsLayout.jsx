import { NavLink, Outlet } from "react-router-dom";
import styles from "./AnalyticsLayout.module.css";
import { BarChart3, Package, Users } from "lucide-react";

function AnalyticsLayout() {
  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Analytics Suite</h1>
          <p className={styles.subtitle}>Deep dive into sales trends and product performance.</p>
        </div>
      </div>

      <div className={styles.navTabs}>
        <NavLink
          to="/admin/analytics"
          end
          className={({ isActive }) => `${styles.tab} ${isActive ? styles.activeTab : ""}`}
        >
          <BarChart3 size={18} />
          Overview
        </NavLink>
        <NavLink
          to="/admin/analytics/products"
          className={({ isActive }) => `${styles.tab} ${isActive ? styles.activeTab : ""}`}
        >
          <Package size={18} />
          Products
        </NavLink>
        <NavLink
          to="/admin/analytics/customers"
          className={({ isActive }) => `${styles.tab} ${isActive ? styles.activeTab : ""}`}
        >
          <Users size={18} />
          Customers
        </NavLink>
      </div>

      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

export default AnalyticsLayout;
