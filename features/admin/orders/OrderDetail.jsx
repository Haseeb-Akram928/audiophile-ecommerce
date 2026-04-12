import { useParams, Link } from "react-router-dom";
import { ArrowLeft, User, Package, CreditCard, ExternalLink } from "lucide-react";
import { useAdminOrderDetails, useUpdateOrderStatus } from "./useAdminOrders";
import StatusBadge from "../components/StatusBadge";
import styles from "./OrderDetail.module.css";
import Loader from "@/components/ui/Loader";
import { format } from "date-fns";
import { getImageUrl } from "@/utils/helper";

const STATUS_OPTIONS = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
  "refunded"
];

function OrderDetail() {
  const { id } = useParams();
  const { order, isLoading } = useAdminOrderDetails(id);
  const { updateStatus, isUpdating } = useUpdateOrderStatus();

  if (isLoading) return <Loader />;
  if (!order) return <div className={styles.error}>Order not found.</div>;

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    if (window.confirm(`Are you sure you want to change status to ${newStatus}?`)) {
      updateStatus({ id: order.id, status: newStatus });
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Link to="/admin/orders" className={styles.backBtn}>
            <ArrowLeft size={20} />
          </Link>
          <div>
            <div className={styles.titleRow}>
              <h1 className={styles.title}>Order #{order.id.substring(0, 8)}</h1>
              <StatusBadge status={order.status} />
            </div>
            <p className={styles.subtitle}>
              Placed on {format(new Date(order.created_at), "MMMM dd, yyyy 'at' hh:mm a")}
            </p>
          </div>
        </div>
        
        <div className={styles.headerRight}>
          <label className={styles.statusLabel}>Update Status:</label>
          <select 
            className={styles.statusSelect}
            value={order.status}
            onChange={handleStatusChange}
            disabled={isUpdating}
          >
            {STATUS_OPTIONS.map(status => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.mainCol}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Order Items</h2>
            <div className={styles.itemsList}>
              {order.order_items?.map((item) => (
                <div key={item.id} className={styles.itemRow}>
                  <div className={styles.itemImage}>
                    <img 
                      src={getImageUrl(item.products?.image?.mobile)} 
                      alt={item.products?.name} 
                    />
                  </div>
                  <div className={styles.itemMeta}>
                    <Link to={`/product/${item.products?.slug}`} className={styles.itemName}>
                      {item.products?.name} <ExternalLink size={14} />
                    </Link>
                    <span className={styles.itemPrice}>
                      ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className={styles.itemQty}>x{item.quantity}</div>
                  <div className={styles.itemTotal}>
                    ${(item.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                </div>
              ))}
            </div>
            
            <div className={styles.summaryBox}>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>${order.total_amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>$0.00</span>
              </div>
              <div className={styles.summaryRow}>
                <span>VAT (included)</span>
                <span>$0.00</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                <span>Total</span>
                <span>${order.total_amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.sideCol}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>
              <User size={18} /> Customer Details
            </h2>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Username</span>
              <span className={styles.infoValue}>{order.profiles?.username || "Guest"}</span>
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>
              <Package size={18} /> Shipping Address
            </h2>
            {order.shipping_address ? (
              <div className={styles.addressBlock}>
                <div>{order.shipping_address.name}</div>
                <div>{order.shipping_address.address}</div>
                <div>
                  {order.shipping_address.city}, {order.shipping_address.country} {order.shipping_address.zipCode}
                </div>
                <div>{order.shipping_address.phone}</div>
              </div>
            ) : (
              <div className={styles.infoValue}>No shipping address provided.</div>
            )}
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>
              <CreditCard size={18} /> Payment Information
            </h2>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Method</span>
              <span className={`${styles.infoValue} ${styles.paymentMethod}`}>
                {order.payment_method || "Unknown"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
