import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "@/components/layout/Header/Header.module.css";
import CategoryMenu from "@/components/layout/Header/CategoryMenu.jsx";
import CartModal from "@/features/cart/CartModal/CartModal";
import { useSelector } from "react-redux";
import { getTotalCartQuantity } from "@/features/cart/cartSlice"; // Import the selector
import { useUser } from "@/features/auth/useUser";
import { useLogout } from "@/features/auth/useLogout";
import Loader from "@/ui/Loader";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const totalQuantity = useSelector(getTotalCartQuantity); // Call the selector
  const { user, isLoading } = useUser();
  const { logout, isLoading: isLoggingOut } = useLogout();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1100) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  return (
    <header className={styles.navbarContainer}>
      <div className={styles.navbarContent}>
        <button
          className={`${styles.iconButton} ${styles.hamburgerContainer}`}
          aria-label="Open navigation menu"
          onClick={toggleMenu}
        >
          <img
            src="/assets/icon-hamburger.svg"
            alt="hamburger menu icon"
            aria-hidden="true"
          />
        </button>

        <NavLink
          to="/"
          className={styles.logoLink}
          aria-label="Audiophile home"
        >
          <img
            src="/assets/logo.svg"
            alt="Audiophile Logo"
            aria-hidden="true"
            className={styles.logoImg}
          />
        </NavLink>

        <nav className={styles.desktopNav} aria-label="Main navigation">
          <ul className={styles.navLinks}>
            <ul className={styles.navLinks}>
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
        <div className={styles.headerActions}>
          {user ? ( // User is logged in
            <>
              <span className={styles.userName}>
                Hello, {user.user_metadata.fullName}
              </span>
              <button
                onClick={logout}
                disabled={isLoggingOut || isLoading} // Disable during logout or initial user loading
                className={`${styles.authButton} ${
                  isLoggingOut || isLoading ? styles.disabled : ''
                }`}
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className={`${styles.authButton} ${isLoading ? styles.disabled : ''}`}
              aria-disabled={isLoading} // For accessibility
              onClick={(e) => isLoading && e.preventDefault()} // Prevent navigation if loading
            >
              Login
            </NavLink>
          )}
          <button
            className={`${styles.iconButton} ${styles.cartContainer}`}
            aria-label="View shopping cart"
            onClick={() => setIsCartOpen(true)}
          >
            <div className={styles.cartIconWrapper}>
              <img
                src="/assets/icon-cart.svg"
                alt="cart image"
                aria-hidden="true"
                className={styles.cartIcon}
              />
              {totalQuantity > 0 && (
                <span className={styles.cartBadge}>{totalQuantity}</span>
              )}
            </div>
          </button>
        </div>
      </div>

      <div className={styles.dividerWrapper}>
        <hr className={styles.navDivider} />
      </div>

      {isMenuOpen && (
        <>
          <div className={styles.overlay} onClick={closeMenu} />
          <div className={styles.mobileMenu}>
            <CategoryMenu closeMenu={closeMenu} />
          </div>
        </>
      )}

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};

export default Header;
