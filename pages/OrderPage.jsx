import OrderHistory from "@/features/orders/OrderHistory/OrderHistory"; // Corrected path
import styles from "@/pages/OrderPage.module.css"; // Keep the styles if needed for the container

function OrderPage() {
  return (
    <div className={styles.orderPageContainer}>
      <OrderHistory />
    </div>
  );
}

export default OrderPage;
