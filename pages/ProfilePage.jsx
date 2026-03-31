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
        <label className={styles.label}>STREET ADDRESS</label>
        <input type="text" className={styles.inputField} defaultValue="1137 Williams Avenue" readOnly={!isEditing} />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>CITY</label>
        <input type="text" className={styles.inputField} defaultValue="New York" readOnly={!isEditing} />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>ZIP CODE</label>
        <input type="text" className={styles.inputField} defaultValue="10001" readOnly={!isEditing} />
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
  return (
    <section className={styles.detailsContainer}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
        <h2 className={styles.sectionTitle} style={{margin: 0}}>PAYMENT INFORMATION</h2>
        <button className={styles.viewDetailsBtn} onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'CANCEL' : 'EDIT'}
        </button>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>e-Money Number</label>
        <input type="text" className={styles.inputField} defaultValue="238521993" readOnly={!isEditing} />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>e-Money PIN</label>
        <input type="password" className={styles.inputField} defaultValue="6891" readOnly={!isEditing} />
      </div>
      {isEditing && <button className={styles.saveBtn}>SAVE PAYMENT INFO</button>}
    </section>
  );
}

const ProfilePage = () => {
  const { user, isLoading: isUserLoading } = useUser();
  const { logout, isPending: isLoggingOut } = useLogout();
  const { orders, isLoading: isOrdersLoading } = useOrders();
  
  const [activeTab, setActiveTab] = useState('PROFILE');

  const userName = user?.profile?.full_name || user?.user_metadata?.fullName || 'Alex Sterling';
  const handle = user?.profile?.username || user?.user_metadata?.username || 'alexsterling';
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
            person
          </span>
        </div>
        <div className={styles.userInfo}>
          <p className={styles.premiumText}>PREMIUM MEMBER</p>
          <h1 className={styles.userName}>{userName}</h1>
          <p className={styles.userHandle}>@{handle}</p>
          <p className={styles.memberSinceLabel}>MEMBER SINCE</p>
          <p className={styles.memberSinceDate}>NOVEMBER 2023</p>
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
                <label className={styles.label}>FULL NAME</label>
                <input type="text" className={styles.inputField} defaultValue={userName} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>EMAIL ADDRESS</label>
                <input type="email" className={styles.inputField} defaultValue={user?.email || 'alex.sterling@audiophile.com'} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>PHONE NUMBER</label>
                <input type="tel" className={styles.inputField} defaultValue={user?.user_metadata?.phone || '+1 (555) 000-1234'} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>DATE OF BIRTH</label>
                <input type="text" className={styles.inputField} defaultValue="05 / 12 / 1992" />
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
