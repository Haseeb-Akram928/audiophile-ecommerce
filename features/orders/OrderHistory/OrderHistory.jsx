import { useOrders } from "@/features/orders/useOrders";
import { Link } from "react-router-dom";
import Loader from "@/components/ui/Loader"; 
import { getImageUrl } from "@/utils/helper";
import styles from "./OrderHistory.module.css"; 

function OrderHistory() {
  const { isLoading, orders, error } = useOrders();

  if (isLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', padding: '48px' }}><Loader /></div>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error.message}</p>;
  }

  if (!orders || orders.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyText}>You haven't placed any orders yet.</p>
        <Link to="/" className={styles.homeBtn}>
          START SHOPPING
        </Link>
      </div>
    );
  }

  const activeOrders = orders.filter(o => (o.status || 'pending').toLowerCase() !== 'delivered');
  const deliveredOrders = orders.filter(o => (o.status || 'pending').toLowerCase() === 'delivered');

  const renderOrderList = (list) => (
    <div className={styles.orderList}>
      {list.map((order) => {
        const orderStatus = (order.status || 'pending').toLowerCase();
        return (
          <div key={order.id} className={styles.orderCard}>
            <div className={styles.orderHeader}>
              <div>
                <span className={styles.orderId}>Order #{order.id.slice(0, 8)}</span>
                <span style={{ margin: '0 8px', color: '#cfcfcf' }}>|</span>
                <span className={styles.orderDate}>{new Date(order.created_at).toLocaleDateString()}</span>
              </div>
              <span className={`${styles.statusBadge} ${styles[orderStatus] || styles.pending}`}>
                {orderStatus}
              </span>
            </div>
            
            <div className={styles.itemsContainer}>
              {order.order_items.map((item) => {
                let imgSrc = "/assets/cart/image-xx99-mark-two-headphones.jpg";
                if (item.products?.image?.mobile) {
                  imgSrc = item.products.image.mobile;
                }
                
                return (
                  <div key={item.id} className={styles.itemRow}>
                    <div className={styles.itemInfo}>
                      <img src={getImageUrl(imgSrc)} alt={item.products?.name} className={styles.itemImage} />
                      <div className={styles.itemDetails}>
                        <h4>{item.products?.name}</h4>
                        <p>$ {item.price.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                      </div>
                    </div>
                    <div className={styles.itemActions}>
                      <span className={styles.itemQuantity}>x{item.quantity}</span>
                      {orderStatus === 'delivered' && (
                        <Link 
                          to={`/product/${item.products?.slug}`}
                          state={{ writeReview: true }}
                          className={styles.rateBtn}
                        >
                          RATE PRODUCT
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={styles.orderFooter}>
              <span className={styles.orderTotalLabel}>Grand Total</span>
              <span className={styles.orderTotalAmount}>$ {order.total_amount.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className={styles.orderHistoryContainer}>
      {activeOrders.length > 0 && (
        <section>
          <h2 className={styles.sectionHeader}>ACTIVE ORDERS</h2>
          {renderOrderList(activeOrders)}
        </section>
      )}

      {deliveredOrders.length > 0 && (
        <section style={{ marginTop: activeOrders.length > 0 ? '48px' : '0' }}>
          <h2 className={styles.sectionHeader}>PAST ORDERS</h2>
          {renderOrderList(deliveredOrders)}
        </section>
      )}
    </div>
  );
}

export default OrderHistory;
