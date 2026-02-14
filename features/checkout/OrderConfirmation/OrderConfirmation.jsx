import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCart, getTotalCartPrice } from "@/features/cart/cartSlice";
import { clearCart } from "@/features/cart/cartSlice";
import styles from "@/features/checkout/OrderConfirmation/OrderConfirmation.module.css";

const OrderConfirmation = ({ isVisible }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(getCart);
  const totalAmount = useSelector(getTotalCartPrice);

  const shipping = 50;
  const grandTotal = totalAmount + shipping;

  if (!isVisible || cart.length === 0) return null;

  const handleBackHome = () => {
    dispatch(clearCart());
    navigate("/");
  };

  const firstItem = cart[0];
  const otherItemsCount = cart.length - 1;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.iconContainer}>
          <img
            src="/assets/checkout/icon-order-confirmation.svg"
            alt="Confirmation Icon"
          />
        </div>

        <h2 className={styles.title}>
          THANK YOU <br />
          FOR YOUR ORDER
        </h2>
        <p className={styles.subtitle}>
          You will receive an email confirmation shortly.
        </p>

        <div className={styles.summaryContainer}>
          <div className={styles.itemsColumn}>
            <div className={styles.itemRow}>
              <div className={styles.itemInfo}>
                <img
                  src={firstItem.image}
                  alt={firstItem.name}
                  className={styles.itemImg}
                />
                <div className={styles.itemText}>
                  <span className={styles.itemName}>{firstItem.name}</span>
                  <span className={styles.itemPrice}>
                    $ {firstItem.price.toLocaleString()}
                  </span>
                </div>
              </div>
              <span className={styles.itemQuantity}>x{firstItem.quantity}</span>
            </div>

            {otherItemsCount > 0 && (
              <div className={styles.divider}>
                <p className={styles.othersText}>
                  and {otherItemsCount} other item(s)
                </p>
              </div>
            )}
          </div>

          <div className={styles.totalColumn}>
            <span className={styles.totalLabel}>GRAND TOTAL</span>
            <span className={styles.totalValue}>
              $ {grandTotal.toLocaleString()}
            </span>
          </div>
        </div>

        <button className="btn orange full-width" onClick={handleBackHome}>
          BACK TO HOME
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
