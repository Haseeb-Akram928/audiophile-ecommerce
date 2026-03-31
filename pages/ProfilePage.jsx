import React, { useState } from 'react';
import { useUser } from '@/features/auth/useUser';
import { useLogout } from '@/features/auth/useLogout';
import { useOrders } from '@/features/orders/useOrders';
import OrderHistory from '@/features/orders/OrderHistory/OrderHistory';
import { getImageUrl } from '@/utils/helper';
import styles from './ProfilePage.module.css';

function SavedAddresses() {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <section className={styles.detailsContainer}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
        <h2 className={styles.sectionTitle} style={{margin: 0}}>SAVED ADDRESSES</h2>
        <button className={styles.viewDetailsBtn} onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'CANCEL' : 'EDIT'}
        </button>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>ADDRESS</label>
        <input type="text" className={styles.inputField} defaultValue="1137 Williams Avenue" readOnly={!isEditing} />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>ZIP CODE</label>
        <input type="text" className={styles.inputField} defaultValue="10001" readOnly={!isEditing} />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>CITY</label>
        <input type="text" className={styles.inputField} defaultValue="New York" readOnly={!isEditing} />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>COUNTRY</label>
        <input type="text" className={styles.inputField} defaultValue="United States" readOnly={!isEditing} />
      </div>
      {isEditing && <button className={styles.saveBtn}>SAVE ADDRESS</button>}
    </section>
  );
}

function PaymentInformation() {
  const [isEditing, setIsEditing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("e-Money");
  const [editingMethod, setEditingMethod] = useState("e-Money");

  const handleEditToggle = () => {
    if (isEditing) {
      setEditingMethod(paymentMethod);
    } else {
      setEditingMethod(paymentMethod);
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setPaymentMethod(editingMethod);
    setIsEditing(false);
  };

  return (
    <section className={styles.detailsContainer}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
        <h2 className={styles.sectionTitle} style={{margin: 0}}>PAYMENT INFORMATION</h2>
        <button className={styles.viewDetailsBtn} onClick={handleEditToggle}>
          {isEditing ? 'CANCEL' : 'EDIT'}
        </button>
      </div>

      {isEditing ? (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', border: editingMethod === 'e-Money' ? '1px solid #d87d4a' : '1px solid #cfcfcf', borderRadius: '8px', cursor: 'pointer', background: '#fff' }}>
              <input 
                type="radio" 
                name="paymentMethod" 
                value="e-Money" 
                checked={editingMethod === "e-Money"} 
                onChange={(e) => setEditingMethod(e.target.value)} 
                style={{ accentColor: '#d87d4a', width: '20px', height: '20px' }}
              />
              <span style={{ fontSize: '14px', fontWeight: '700' }}>e-Money</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', border: editingMethod === 'Cash on Delivery' ? '1px solid #d87d4a' : '1px solid #cfcfcf', borderRadius: '8px', cursor: 'pointer', background: '#fff' }}>
              <input 
                type="radio" 
                name="paymentMethod" 
                value="Cash on Delivery" 
                checked={editingMethod === "Cash on Delivery"} 
                onChange={(e) => setEditingMethod(e.target.value)} 
                style={{ accentColor: '#d87d4a', width: '20px', height: '20px' }}
              />
              <span style={{ fontSize: '14px', fontWeight: '700' }}>Cash on Delivery</span>
            </label>
          </div>

          {editingMethod === "e-Money" && (
            <>
              <div className={styles.formGroup}>
                <label className={styles.label}>e-Money Number</label>
                <input type="text" className={styles.inputField} defaultValue="238521993" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>e-Money PIN</label>
                <input type="password" className={styles.inputField} defaultValue="6891" />
              </div>
            </>
          )}

          {editingMethod === "Cash on Delivery" && (
            <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '24px' }}>
              <img src={getImageUrl("/assets/checkout/icon-cash-on-delivery.svg")} alt="cash on delivery icon" style={{ width: "48px", height: "48px" }} />
              <p style={{ color: '#7d7d7d', fontSize: '15px', lineHeight: '25px', margin: 0 }}>
                The 'Cash on Delivery' option enables you to pay in cash when our delivery courier arrives at your residence. Just make sure your address is correct.
              </p>
            </div>
          )}

          <button className={styles.saveBtn} onClick={handleSave}>SAVE PAYMENT INFO</button>
        </>
      ) : (
        <>
          <div className={styles.formGroup}>
            <label className={styles.label}>PAYMENT METHOD</label>
            <input type="text" className={styles.inputField} value={paymentMethod} readOnly />
          </div>
          {paymentMethod === "e-Money" && (
            <>
              <div className={styles.formGroup}>
                <label className={styles.label}>e-Money Number</label>
                <input type="text" className={styles.inputField} defaultValue="238521993" readOnly />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>e-Money PIN</label>
                <input type="password" className={styles.inputField} defaultValue="6891" readOnly />
              </div>
            </>
          )}
          {paymentMethod === "Cash on Delivery" && (
            <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '24px' }}>
              <img src={getImageUrl("/assets/checkout/icon-cash-on-delivery.svg")} alt="cash on delivery icon" style={{ width: "48px", height: "48px" }} />
              <p style={{ color: '#7d7d7d', fontSize: '15px', lineHeight: '25px', margin: 0 }}>
                The 'Cash on Delivery' option enables you to pay in cash when our delivery courier arrives at your residence. Just make sure your address is correct.
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
}

const ProfilePage = () => {
  const { user, isLoading: isUserLoading } = useUser();
  const { logout, isPending: isLoggingOut } = useLogout();
  const { orders, isLoading: isOrdersLoading } = useOrders();
  
  const [activeTab, setActiveTab] = useState('PROFILE');

  const displayUser = user?.profile?.username || user?.user_metadata?.username || 'Member';
  const fullName = user?.profile?.full_name || user?.user_metadata?.fullName || 'Alex Sterling';
  const hasOrders = orders && orders.length > 0;

  if (isUserLoading || isOrdersLoading) {
    return <div className={styles.loading}>Loading Profile...</div>;
  }

  const recentOrder = orders?.[0];
  const recentItem = recentOrder?.order_items?.[0];
  const recentProductName = recentItem?.products?.name || "XX99 MARK II HEADPHONES";
  const recentProductPrice = recentOrder?.total_amount || 2999;
  const recentOrderId = recentOrder?.id ? recentOrder.id.slice(0, 8) : "982173";
  const recentOrderDate = recentOrder?.created_at ? new Date(recentOrder.created_at).toLocaleDateString() : "Nov 12, 2023";
  const recentOrderStatus = recentOrder?.status ? recentOrder.status.toUpperCase() : "DELIVERED";

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <section className={styles.profileHeader}>
        <div className={styles.avatarWrapper}>
          <span className={`material-symbols-outlined ${styles.mainAvatar}`}>
            account_circle
          </span>
        </div>
        <div className={styles.userInfo}>
          <h1 className={styles.userName}>{displayUser}</h1>
        </div>
      </section>

      {/* Tabs */}
      <nav className={styles.tabsContainer}>
        <div className={styles.tabsScroll}>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'PROFILE' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('PROFILE')}
          >
            MY PROFILE
          </button>
          {hasOrders && (
            <>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'ORDERS' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('ORDERS')}
              >
                ORDER HISTORY
              </button>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'ADDRESSES' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('ADDRESSES')}
              >
                SAVED ADDRESSES
              </button>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'PAYMENT' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('PAYMENT')}
              >
                PAYMENT INFORMATION
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Content Area */}
      <div className={styles.tabContent}>
        {activeTab === 'PROFILE' && (
          <>
            {/* Account Details Box */}
            <section className={styles.detailsContainer}>
              <h2 className={styles.sectionTitle}>ACCOUNT DETAILS</h2>
              <div className={styles.formGroup}>
                <label className={styles.label}>NAME</label>
                <input type="text" className={styles.inputField} defaultValue={fullName} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>EMAIL ADDRESS</label>
                <input type="email" className={styles.inputField} defaultValue={user?.email || 'alex.sterling@audiophile.com'} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>PHONE NUMBER</label>
                <input type="tel" className={styles.inputField} defaultValue={user?.user_metadata?.phone || '+1 (555) 000-1234'} />
              </div>
              <button className={styles.saveBtn}>SAVE CHANGES</button>
            </section>

            {/* Recent Order Section */}
            {hasOrders && (
              <section className={styles.recentOrderSection}>
                <h2 className={styles.sectionTitle}>RECENT ORDER</h2>
                <div className={styles.orderCard}>
                  <div className={styles.orderImageWrapper}>
                    <img 
                      src={getImageUrl("/assets/cart/image-xx99-mark-two-headphones.jpg")} 
                      alt={recentProductName} 
                      className={styles.orderImage} 
                    />
                  </div>
                  <div className={styles.orderDetails}>
                    <p className={styles.deliveredStatus}>{recentOrderStatus}</p>
                    <h3 className={styles.productName}>{recentProductName}</h3>
                    <p className={styles.orderMeta}>Order #{recentOrderId} &bull; {recentOrderDate}</p>
                    <div className={styles.orderFooter}>
                      <span className={styles.orderPrice}>$ {recentProductPrice.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                      <button className={styles.viewDetailsBtn} onClick={() => setActiveTab('ORDERS')}>VIEW DETAILS</button>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </>
        )}

        {activeTab === 'ORDERS' && (
          <div style={{ marginTop: '24px', marginBottom: '48px' }}>
            <OrderHistory />
          </div>
        )}

        {activeTab === 'ADDRESSES' && (
          <SavedAddresses />
        )}

        {activeTab === 'PAYMENT' && (
          <PaymentInformation />
        )}
      </div>

      {/* Logout Button */}
      <div style={{ marginTop: '48px' }}>
        <button 
          className={styles.logoutBtn} 
          disabled={isLoggingOut} 
          onClick={logout}
        >
          <span className={`material-symbols-outlined ${styles.logoutIcon}`}>logout</span>
          LOGOUT
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
