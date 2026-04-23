import OrderHistory from "@/features/orders/OrderHistory/OrderHistory";
import styles from "@/pages/OrderPage.module.css";

function OrderPage() {
  return (
    <div className={styles.orderPageContainer}>
      <OrderHistory />
    </div>
  );
}

export default OrderPage;
