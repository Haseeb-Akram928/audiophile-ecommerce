import { useSelector } from "react-redux";
import { getCart, getTotalCartPrice } from "@/features/cart/cartSlice";
import styles from "@/features/checkout/CheckoutSummary/CheckoutSummary.module.css";
import { getImageUrl } from "@/utils/helper";
import CouponInput from "./CouponInput";

const CheckoutSummary = ({ appliedCoupon, applyCoupon, removeCoupon, isValidating }) => {
  const cart = useSelector(getCart);
  const totalAmount = useSelector(getTotalCartPrice);

  const shipping = 50;
  const vat = Math.floor(totalAmount * 0.2);
  
  // Coupon calculation
  const discountAmount = appliedCoupon 
    ? (appliedCoupon.discount_type === 'percentage' 
        ? Math.floor(totalAmount * (appliedCoupon.discount_value / 100))
        : appliedCoupon.discount_value)
    : 0;
  
  const discountedSubtotal = Math.max(0, totalAmount - discountAmount);
  const grandTotal = discountedSubtotal + shipping;

  return (
    <div className={styles.summaryCard}>
      <h3 className={styles.summaryTitle}>SUMMARY</h3>
      <div className={styles.itemList}>
        {cart.map((item) => (
          <div key={item.id} className={styles.item}>
            <div className={styles.itemInfo}>
              <img src={getImageUrl(item.image)} alt="" className={styles.itemImg} />
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

      <div className={styles.couponSection}>
        <CouponInput 
          appliedCoupon={appliedCoupon}
          onApply={applyCoupon}
          onRemove={removeCoupon}
          isLoading={isValidating}
        />
        {appliedCoupon && (
          <input type="hidden" name="coupon_id" value={appliedCoupon.id} form="checkout-form" />
        )}
      </div>

      <div className={styles.totalsContainer}>
        <div className={styles.totalRow}>
          <span>TOTAL</span>
          <strong>$ {totalAmount.toLocaleString()}</strong>
        </div>
        
        {appliedCoupon && (
          <div className={styles.totalRow}>
            <span>DISCOUNT ({appliedCoupon.discount_value}{appliedCoupon.discount_type === 'percentage' ? '%' : '$'})</span>
            <strong className={styles.discountText}>- $ {discountAmount.toLocaleString()}</strong>
          </div>
        )}

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
        disabled={cart.length === 0}
      >
        CONTINUE & PAY
      </button>
    </div>
  );
};

export default CheckoutSummary;
