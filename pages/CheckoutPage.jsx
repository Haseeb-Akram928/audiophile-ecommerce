import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutForm from "@/features/checkout/CheckoutForm/CheckoutForm";
import CheckoutSummary from "@/features/checkout/CheckoutSummary/CheckoutSummary";
import OrderConfirmation from "@/features/checkout/OrderConfirmation/OrderConfirmation";
import styles from "@/pages/CheckoutPage.module.css";

function CheckoutPage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className={styles.checkoutWrapper}>
      <div className="container">
        <button onClick={() => navigate(-1)} className={styles.backBtn}>
          Go Back
        </button>

        <div className={styles.layoutGrid}>
          {/* Add the onOrderSuccess prop here */}
          <CheckoutForm onOrderSuccess={() => setIsModalOpen(true)} />
          <CheckoutSummary />
        </div>
      </div>

      {/* Render the modal here */}
      <OrderConfirmation isVisible={isModalOpen} />
    </main>
  );
}
export default CheckoutPage;
