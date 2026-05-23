import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings,
  MessageSquare,
  Ticket,
  LayoutTemplate,
  BarChart3
} from "lucide-react";
import styles from "./AdminSidebar.module.css";
import PermissionGate from "../auth/PermissionGate";

function AdminSidebar() {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard, exact: true, permission: "view_dashboard" },
    { name: "Products", path: "/admin/products", icon: Package, permission: "view_products" },
    { name: "Orders", path: "/admin/orders", icon: ShoppingCart, permission: "view_orders" },
    { name: "Users", path: "/admin/users", icon: Users, permission: "view_users" },
    { name: "Reviews", path: "/admin/reviews", icon: MessageSquare, permission: "view_products" },
    { name: "Coupons", path: "/admin/coupons", icon: Ticket, permission: "view_orders" },
    { name: "Content", path: "/admin/content", icon: LayoutTemplate, permission: "manage_settings" },
    { name: "Analytics", path: "/admin/analytics", icon: BarChart3, permission: "view_dashboard" },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <img src="/assets/shared/desktop/logo.svg" alt="audiophile" className={styles.logo} />
        <span className={styles.badge}>ADMIN</span>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => {
          const isActive = item.exact 
            ? location.pathname === item.path 
            : location.pathname.startsWith(item.path);

          return (
            <PermissionGate key={item.path} action={item.permission}>
              <Link 
                to={item.path} 
                className={`${styles.navItem} ${isActive ? styles.active : ""}`}
              >
                <item.icon size={20} className={styles.icon} />
                <span>{item.name}</span>
              </Link>
            </PermissionGate>
          );
        })}
      </nav>

      <div className={styles.footer}>
        <PermissionGate action="view_settings">
          <Link 
            to="/admin/settings" 
            className={`${styles.navItem} ${location.pathname.startsWith("/admin/settings") ? styles.active : ""}`}
          >
            <Settings size={20} className={styles.icon} />
            <span>Settings</span>
          </Link>
        </PermissionGate>
      </div>
    </aside>
  );
}

export default AdminSidebar;
