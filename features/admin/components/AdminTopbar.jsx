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
      <div className={styles.search}>
        <Search size={20} className={styles.searchIcon} />
        <input type="text" placeholder="Search orders, products, users..." className={styles.searchInput} />
      </div>

      <div className={styles.actions}>
        <a href="/" target="_blank" rel="noreferrer" className={styles.storefrontLink} title="View Storefront">
          <ExternalLink size={20} />
        </a>
        
        <button className={styles.iconButton}>
          <Bell size={20} />
          <span className={styles.notificationBadge}></span>
        </button>

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
