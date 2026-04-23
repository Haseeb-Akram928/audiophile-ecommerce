import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const DesktopNav = () => {
  return (
    <nav className={styles.desktopNav} aria-label="Main navigation">
      <ul className={styles.navLinks}>
        <ul className={styles.navLinks}>
          {" "}
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? `${styles.navLinksA} ${styles.activeLink}`
                  : styles.navLinksA
              }
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/headphones"
              className={({ isActive }) =>
                isActive
                  ? `${styles.navLinksA} ${styles.activeLink}`
                  : styles.navLinksA
              }
            >
              HEADPHONES
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/speakers"
              className={({ isActive }) =>
                isActive
                  ? `${styles.navLinksA} ${styles.activeLink}`
                  : styles.navLinksA
              }
            >
              SPEAKERS
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/earphones"
              className={({ isActive }) =>
                isActive
                  ? `${styles.navLinksA} ${styles.activeLink}`
                  : styles.navLinksA
              }
            >
              EARPHONES
            </NavLink>
          </li>
        </ul>
      </ul>
    </nav>
  );
};

export default DesktopNav;
