import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getCart,
  getTotalCartQuantity,
  getTotalCartPrice,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
  deleteItem,
} from "@/features/cart/cartSlice";
import styles from "@/features/cart/CartModal/CartModal.module.css";

const CartModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(getCart);
  const totalQuantity = useSelector(getTotalCartQuantity);
  const totalPrice = useSelector(getTotalCartPrice);

  if (!isOpen) return null;

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modalContainer}>
        <div className={styles.header}>
          <h2 className={styles.title}>CART ({totalQuantity})</h2>
          <button
            className={styles.removeAll}
            onClick={() => dispatch(clearCart())}
          >
            Remove all
          </button>
        </div>

        <div className={styles.itemList}>
          {cart.map((item) => (
            <div key={item.id} className={styles.item}>
              <div className={styles.itemInfo}>
                <div className={styles.imgContainer}>
                  <img src={item.image} alt={item.name} />
                </div>
                <div className={styles.itemText}>
                  <p className={styles.itemName}>{item.name}</p>
                  <p className={styles.itemPrice}>
                    $ {item.price.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className={styles.quantityControls}>
                <button onClick={() => dispatch(decreaseItemQuantity(item.id))}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => dispatch(increaseItemQuantity(item.id))}>
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.totalRow}>
          <span className={styles.totalLabel}>TOTAL</span>
          <span className={styles.totalPrice}>
            $ {totalPrice.toLocaleString()}
          </span>
        </div>

        <button
          className="btn orange fullWidth"
          disabled={cart.length === 0}
          onClick={handleCheckout}
        >
          CHECKOUT
        </button>
      </div>
    </>
  );
};

export default CartModal;
