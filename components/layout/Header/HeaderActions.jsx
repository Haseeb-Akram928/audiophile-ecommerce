import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTotalCartQuantity } from "@/features/cart/cartSlice";
import { useUser } from "@/features/auth/useUser";
import { useLogout } from "@/features/auth/useLogout";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import styles from "@/components/layout/Header/Header.module.css";

const HeaderActions = ({ setIsCartOpen }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const totalQuantity = useSelector(getTotalCartQuantity);
  const { user, isLoading } = useUser();
  const { logout, isPending: isLoggingOut } = useLogout();

  const closeDropdown = () => setIsProfileOpen(false);
  const dropdownRef = useOutsideClick(closeDropdown);

  return (
    <div className={styles.headerActions}>
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

      <div className={styles.authContainer} ref={dropdownRef}>
        <button
          className={`${styles.avatarBtn} ${isProfileOpen ? styles.avatarActive : ""}`}
          onClick={() => setIsProfileOpen((prev) => !prev)}
          aria-label="Profile menu"
        >
          <span className={`material-symbols-outlined ${styles.avatarIcon}`}>
            person
          </span>
        </button>

        {isProfileOpen && (
          <div className={styles.profileDropdown}>
            {user ? (
              <>
                <NavLink to="/profile" className={styles.dropdownItem} onClick={closeDropdown}>
                  MY PROFILE
                </NavLink>
                <NavLink to="/orders" className={styles.dropdownItem} onClick={closeDropdown}>
                  ORDERS
                </NavLink>
                <button
                  className={`${styles.dropdownItem} ${styles.logoutOrange}`}
                  onClick={() => {
                    logout();
                    closeDropdown();
                  }}
                  disabled={isLoggingOut}
                >
                  LOGOUT
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={styles.dropdownItem} onClick={closeDropdown}>
                  LOGIN
                </NavLink>
                <NavLink to="/signup" className={styles.dropdownItem} onClick={closeDropdown}>
                  SIGNUP
                </NavLink>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderActions;
