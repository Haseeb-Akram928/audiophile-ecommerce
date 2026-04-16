import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutForm from "@/features/checkout/CheckoutForm/CheckoutForm";
import CheckoutSummary from "@/features/checkout/CheckoutSummary/CheckoutSummary";
import OrderConfirmation from "@/features/checkout/OrderConfirmation/OrderConfirmation";
import styles from "@/pages/CheckoutPage.module.css";
import { useCheckoutCoupon } from "@/features/checkout/useCheckoutCoupon";

function CheckoutPage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const couponData = useCheckoutCoupon();

  return (
    <main className={styles.checkoutWrapper}>
      <div className="container">
        <button onClick={() => navigate(-1)} className={styles.backBtn}>
          Go Back
        </button>

        <div className={styles.layoutGrid}>
          <CheckoutForm 
            onOrderSuccess={() => setIsModalOpen(true)} 
            appliedCoupon={couponData.appliedCoupon}
          />
          <CheckoutSummary {...couponData} />
        </div>
      </div>

      {/* Render the modal here */}
      <OrderConfirmation isVisible={isModalOpen} />
    </main>
  );
}
export default CheckoutPage;
