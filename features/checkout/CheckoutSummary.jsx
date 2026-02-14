import { useSelector } from "react-redux";
import { getCart, getTotalCartPrice } from "@/features/cart/cartSlice";
import styles from "@/features/checkout/CheckoutSummary.module.css";

const CheckoutSummary = () => {
  const cart = useSelector(getCart);
  const totalAmount = useSelector(getTotalCartPrice);

  const shipping = 50;
  const vat = Math.floor(totalAmount * 0.2);
  const grandTotal = totalAmount + shipping;

  return (
    <div className={styles.summaryCard}>
      <h3 className={styles.summaryTitle}>SUMMARY</h3>
      <div className={styles.itemList}>
        {cart.map((item) => (
          <div key={item.id} className={styles.item}>
            <div className={styles.itemInfo}>
              <img src={item.image} alt="" className={styles.itemImg} />
              <div>
                <p className={styles.itemName}>{item.name}</p>
                <p className={styles.itemPrice}>
                  $ {item.price.toLocaleString()}
                </p>
              </div>
            </div>
            <p className={styles.itemQuantity}>x{item.quantity}</p>
          </div>
        ))}
      </div>

      <div className={styles.totalsContainer}>
        <div className={styles.totalRow}>
          <span>TOTAL</span>
          <strong>$ {totalAmount.toLocaleString()}</strong>
        </div>
        <div className={styles.totalRow}>
          <span>SHIPPING</span>
          <strong>$ {shipping.toLocaleString()}</strong>
        </div>
        <div className={styles.totalRow}>
          <span>VAT (INCLUDED)</span>
          <strong>$ {vat.toLocaleString()}</strong>
        </div>
        <div className={`${styles.totalRow} ${styles.grandTotal}`}>
          <span>GRAND TOTAL</span>
          <strong className={styles.orangeText}>
            $ {grandTotal.toLocaleString()}
          </strong>
        </div>
      </div>

      <button
        type="submit"
        form="checkout-form"
        className={`btn orange ${styles.fullWidth}`}
      >
        CONTINUE & PAY
      </button>
    </div>
  );
};

export default CheckoutSummary;
