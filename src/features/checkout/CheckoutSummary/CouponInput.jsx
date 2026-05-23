import { useState } from "react";
import styles from "./CheckoutSummary.module.css";
import { Loader2, Tag, X } from "lucide-react";

const CouponInput = ({ appliedCoupon, onApply, onRemove, isLoading }) => {
  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    onApply(code);
    setCode("");
  };

  if (appliedCoupon) {
    return (
      <div className={styles.appliedCoupon}>
        <div className={styles.couponInfo}>
          <Tag size={16} className={styles.tagIcon} />
          <span>{appliedCoupon.code} ({appliedCoupon.discount_percent}% OFF)</span>
        </div>
        <button type="button" onClick={onRemove} className={styles.removeCouponBtn}>
          <X size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className={styles.couponContainer}>
      <form onSubmit={handleSubmit} className={styles.couponForm}>
        <input
          type="text"
          placeholder="COUPON CODE"
          className={styles.couponInput}
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          disabled={isLoading}
        />
        <button type="submit" className={styles.applyBtn} disabled={isLoading || !code.trim()}>
          {isLoading ? <Loader2 className={styles.spinner} size={16} /> : "APPLY"}
        </button>
      </form>
    </div>
  );
};

export default CouponInput;
