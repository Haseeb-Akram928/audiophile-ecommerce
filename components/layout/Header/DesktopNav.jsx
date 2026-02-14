import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css'; // Assuming styles are imported from Header.module.css

const DesktopNav = () => {
  return (
    <nav className={styles.desktopNav} aria-label="Main navigation">
      <ul className={styles.navLinks}>
        <ul className={styles.navLinks}> {/* This nested ul seems redundant, but I'll keep it as per original */}
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
