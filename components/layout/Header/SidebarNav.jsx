import { NavLink } from "react-router-dom";
import styles from "./SidebarNav.module.css";

const SidebarNav = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Dark Overlay */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ""}`}
        onClick={onClose}
      />

      {/* Sidebar Drawer */}
      <nav className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}>
        <ul className={styles.navLinks}>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
              onClick={onClose}
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/headphones"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
              onClick={onClose}
            >
              HEADPHONES
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/speakers"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
              onClick={onClose}
            >
              SPEAKERS
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/earphones"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
              onClick={onClose}
            >
              EARPHONES
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default SidebarNav;
