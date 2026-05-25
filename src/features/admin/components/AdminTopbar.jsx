import { Bell, Search, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useUser } from "@/features/auth/useUser";
import styles from "./AdminTopbar.module.css";
import { useAdminUser } from "../auth/useAdminUser";

function AdminTopbar() {
  const { user } = useUser();
  const { role } = useAdminUser();

  return (
    <header className={styles.topbar}>
      {/* Mobile Hamburger Menu Toggle Trigger (Pure HTML/CSS - Zero JS Logic) */}
      <label htmlFor="admin-sidebar-toggle" className={styles.hamburger} aria-label="Toggle Sidebar Menu">
        <span className={styles.hamburgerLine}></span>
        <span className={styles.hamburgerLine}></span>
        <span className={styles.hamburgerLine}></span>
      </label>

      <div className={styles.search}>
        <Search size={16} className={styles.searchIcon} />
        <input type="text" placeholder="Search orders, products, users..." className={styles.searchInput} />
      </div>

      <div className={styles.actions}>
        <a href="/" target="_blank" rel="noreferrer" className={styles.storefrontLink} title="View Storefront">
          <ExternalLink size={16} />
        </a>
        
        <button className={styles.iconButton} aria-label="Notifications">
          <Bell size={16} />
          <span className={styles.notificationBadge}></span>
        </button>

        <div className={styles.divider}></div>

        <div className={styles.profile}>
          <div className={styles.avatar}>
            {user?.user_metadata?.avatar_url ? (
              <img src={user.user_metadata.avatar_url} alt="Avatar" />
            ) : (
              user?.user_metadata?.username?.charAt(0).toUpperCase() || 'A'
            )}
          </div>
          <div className={styles.userInfo}>
            <span className={styles.username}>{user?.user_metadata?.username || 'Admin'}</span>
            <span className={styles.role}>{role?.replace('_', ' ')}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminTopbar;
