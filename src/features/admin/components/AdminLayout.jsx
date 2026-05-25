import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import styles from "./AdminLayout.module.css";
import "@/styles/admin.css"; // Ensure admin tokens are loaded

function AdminLayout() {
  return (
    <div className={`admin-app ${styles.adminLayout}`}>
      {/* Hidden checkbox overlay trigger for mobile responsive sidebar */}
      <input
        type="checkbox"
        id="admin-sidebar-toggle"
        className={styles.sidebarCheckbox}
      />
      <AdminSidebar />
      {/* Click-outside backdrop close overlay (Pure HTML/CSS - Zero JS Logic) */}
      <label
        htmlFor="admin-sidebar-toggle"
        className={styles.sidebarOverlay}
        aria-label="Close Sidebar Menu"
      ></label>
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
