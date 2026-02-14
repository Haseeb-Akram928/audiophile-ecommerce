import { useNavigate } from "react-router-dom";
import CheckoutForm from "@/features/checkout/CheckoutForm/CheckoutForm";
import CheckoutSummary from "@/features/checkout/CheckoutSummary/CheckoutSummary";
import styles from "@/pages/CheckoutPage.module.css";

function CheckoutPage() {
  const navigate = useNavigate();

  return (
    <main className={styles.checkoutWrapper}>
      <div className="container">
        <button onClick={() => navigate(-1)} className={styles.backBtn}>
          Go Back
        </button>

        <div className={styles.layoutGrid}>
          <CheckoutForm />
          <CheckoutSummary />
        </div>
      </div>
    </main>
  );
}
export default CheckoutPage;
