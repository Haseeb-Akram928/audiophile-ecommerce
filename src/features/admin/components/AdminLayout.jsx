import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import styles from "./AdminLayout.module.css";
import "@/styles/admin.css"; // Ensure admin tokens are loaded

function AdminLayout() {
  return (
    <div className={`admin-app ${styles.adminLayout}`}>
      <AdminSidebar />
      <div className={styles.mainWrapper}>
        <AdminTopbar />
        <main className={styles.mainContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
