import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "@/components/layout/Header/Header.module.css";
import CategoryMenu from "@/components/layout/Header/CategoryMenu.jsx";
import CartModal from "@/features/cart/CartModal/CartModal";
import DesktopNav from "./DesktopNav";
import HeaderActions from "./HeaderActions";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

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

        <NavLink // Still need NavLink for logo
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

        <DesktopNav />

        <HeaderActions setIsCartOpen={setIsCartOpen} />
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
