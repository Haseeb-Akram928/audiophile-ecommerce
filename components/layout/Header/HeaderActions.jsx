import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getTotalCartQuantity } from '@/features/cart/cartSlice';
import { useUser } from '@/features/auth/useUser';
import { useLogout } from '@/features/auth/useLogout';
import styles from './Header.module.css'; // Assuming styles are imported from Header.module.css

const HeaderActions = ({ setIsCartOpen }) => {
  const totalQuantity = useSelector(getTotalCartQuantity);
  const { user, isLoading } = useUser();
  const { logout, isLoading: isLoggingOut } = useLogout();

  return (
    <div className={styles.headerActions}>
      {user ? ( // User is logged in
        <>
          <span className={styles.userName}>
            Hello, {user.user_metadata.fullName}
          </span>
          <button
            onClick={logout}
            disabled={isLoggingOut || isLoading}
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
          aria-disabled={isLoading}
          onClick={(e) => isLoading && e.preventDefault()}
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
  );
};

export default HeaderActions;
