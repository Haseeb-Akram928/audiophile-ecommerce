import { NavLink } from "react-router-dom";
import { useUser } from "@/features/auth/useUser";
import { useLogout } from "@/features/auth/useLogout";
import styles from "./SidebarNav.module.css";

const SidebarNav = ({ isOpen, onClose }) => {
  const { user } = useUser();
  const { logout, isPending } = useLogout();

  const handleLogout = () => {
    logout();
    onClose();
  };

  const rawHandle = user?.profile?.username || user?.user_metadata?.username;
  const displayUser = user ? (rawHandle || "Member") : "Guest User";

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ""}`}
        onClick={onClose}
      />

      <nav className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}>
        {/* User Card */}
        <div className={styles.userCard}>
          <div className={styles.avatarWrapper}>
            <span className={`material-symbols-outlined ${styles.avatarIcon}`}>
              account_circle
            </span>
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{displayUser}</span>
          </div>
        </div>

        <div className={styles.divider} />

        {/* Collections */}
        <div className={styles.navSection}>
          <p className={styles.sectionTitle}>Collections</p>
          <ul className={styles.navLinks}>
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ""}`
                }
                onClick={onClose}
              >
                <span className={`material-symbols-outlined ${styles.linkIcon}`}>home</span>
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/headphones"
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ""}`
                }
                onClick={onClose}
              >
                <span className={`material-symbols-outlined ${styles.linkIcon}`}>headphones</span>
                <span>Headphones</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/speakers"
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ""}`
                }
                onClick={onClose}
              >
                <span className={`material-symbols-outlined ${styles.linkIcon}`}>speaker</span>
                <span>Speakers</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/earphones"
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ""}`
                }
                onClick={onClose}
              >
                <span className={`material-symbols-outlined ${styles.linkIcon}`}>hearing</span>
                <span>Earphones</span>
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className={styles.navSection}>
          <p className={styles.sectionTitle}>Support</p>
          <ul className={styles.navLinks}>
            {user ? (
              <>
                <li>
                  <NavLink
                    to="/orders"
                    className={({ isActive }) =>
                      `${styles.link} ${isActive ? styles.active : ""}`
                    }
                    onClick={onClose}
                  >
                    <span className={`material-symbols-outlined ${styles.linkIcon}`}>shopping_bag</span>
                    <span>My Orders</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      `${styles.link} ${isActive ? styles.active : ""}`
                    }
                    onClick={onClose}
                  >
                    <span className={`material-symbols-outlined ${styles.linkIcon}`}>settings</span>
                    <span>Settings</span>
                  </NavLink>
                </li>
              </>
            ) : (
              <li>
                <NavLink
                  to="/login"
                  className={styles.link}
                  onClick={onClose}
                >
                  <span className={`material-symbols-outlined ${styles.linkIcon}`}>login</span>
                  <span>Login</span>
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        {/* Sign Out — pinned to bottom */}
        {user && (
          <div className={styles.signOutWrapper}>
            <div className={styles.divider} />
            <button
              className={styles.signOutBtn}
              onClick={handleLogout}
              disabled={isPending}
            >
              <span className={`material-symbols-outlined ${styles.linkIcon}`}>logout</span>
              <span>{isPending ? "Signing out..." : "Sign Out"}</span>
            </button>
          </div>
        )}
      </nav>
    </>
  );
};

export default SidebarNav;


