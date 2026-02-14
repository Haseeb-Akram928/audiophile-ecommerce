import { useOrders } from "@/features/orders/useOrders";
import { Link } from "react-router-dom";
import Loader from "@/components/ui/Loader"; // Assuming Loader is in src/ui
import styles from "@/features/orders/OrderHistory/OrderHistory.module.css"; // Assuming you have CSS module for styling

function OrderHistory() {
  const { isLoading, orders, error } = useOrders();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!orders || orders.length === 0) {
    return (
      <div className={styles.emptyOrders}>
        <p>You haven't placed any orders yet.</p>
        <Link to="/" className="btn btn-primary">
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.orderHistoryContainer}>
      <h2>Your Order History</h2>
      {orders.map((order) => (
        <div key={order.id} className={styles.orderCard}>
          <div className={styles.orderSummary}>
            <h3>Order ID: {order.id.slice(0, 8)}</h3>
            <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
            <p>Total: ${order.total_amount.toFixed(2)}</p>
            <p>
              Status:{" "}
              <span
                className={`${styles.status} ${styles[order.status.toLowerCase()]}`}
              >
                {order.status}
              </span>
            </p>
          </div>
          <div className={styles.orderDetails}>
            <h4>Items:</h4>
            <ul>
              {order.order_items.map((item) => (
                <li key={item.id}>
                  {item.quantity}x {item.products.name} ($
                  {item.price.toFixed(2)} each)
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderHistory;
