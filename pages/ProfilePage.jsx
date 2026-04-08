import React, { useState } from 'react';
import { useUser } from '@/features/auth/useUser';
import { useLogout } from '@/features/auth/useLogout';
import { useOrders } from '@/features/orders/useOrders';
import OrderHistory from '@/features/orders/OrderHistory/OrderHistory';
import { getImageUrl } from '@/utils/helper';
import ImageWithLoader from "@/components/ui/ImageWithLoader/ImageWithLoader";
import { useUpdateAvatar } from '@/features/auth/useUpdateAvatar';
import imageCompression from 'browser-image-compression';
import { toast } from 'react-hot-toast';
import ProfileSkeleton from './components/ProfileSkeleton/ProfileSkeleton';
import styles from './ProfilePage.module.css';

function SavedAddresses({ addressData }) {
  const [isEditing, setIsEditing] = useState(false);
  
  const address = addressData?.address || "1137 Williams Avenue";
  const zip = addressData?.zip || "10001";
  const city = addressData?.city || "New York";
  const country = addressData?.country || "United States";
  
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
        <input type="text" className={styles.inputField} defaultValue={address} readOnly={!isEditing} />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>ZIP CODE</label>
        <input type="text" className={styles.inputField} defaultValue={zip} readOnly={!isEditing} />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>CITY</label>
        <input type="text" className={styles.inputField} defaultValue={city} readOnly={!isEditing} />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>COUNTRY</label>
        <input type="text" className={styles.inputField} defaultValue={country} readOnly={!isEditing} />
      </div>
      {isEditing && <button className={styles.saveBtn}>SAVE ADDRESS</button>}
    </section>
  );
}

function PaymentInformation({ currentMethod }) {
  const [isEditing, setIsEditing] = useState(false);
  const defaultMethod = currentMethod === "cash" ? "Cash on Delivery" : "e-Money";
  const [paymentMethod, setPaymentMethod] = useState(defaultMethod);
  const [editingMethod, setEditingMethod] = useState(defaultMethod);

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
  const { updateAvatar, isUpdating } = useUpdateAvatar();
  
  const [activeTab, setActiveTab] = useState('PROFILE');

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      return toast.error("File size must be less than 5MB");
    }

    try {
      const options = {
        maxSizeMB: 0.2, // Compress heavily down to 200KB or less
        maxWidthOrHeight: 400, // Small dimensions since it's just an avatar
        useWebWorker: true,
      };

      toast.loading("Compressing and uploading...", { id: "avatar-upload" });

      const compressedFile = await imageCompression(file, options);

      updateAvatar(
        { userId: user.id, file: compressedFile },
        {
          onSuccess: () => toast.dismiss("avatar-upload"),
          onError: () => toast.dismiss("avatar-upload"),
        }
      );
    } catch (error) {
      console.error(error);
      toast.error("Error compressing image");
      toast.dismiss("avatar-upload");
    }
  };

  const displayUser = user?.profile?.username || user?.user_metadata?.username || 'Member';
  const fullName = user?.profile?.full_name || user?.user_metadata?.fullName || 'Alex Sterling';
  const hasOrders = orders && orders.length > 0;

  if (isUserLoading || isOrdersLoading) {
    return <ProfileSkeleton />;
  }

  const recentOrder = orders?.[0];
  const shippingAddress = recentOrder?.shipping_address;
  
  const recentItem = recentOrder?.order_items?.[0];
  const recentProductName = recentItem?.products?.name || "XX99 MARK II HEADPHONES";
  const productImages = recentItem?.products?.image;
  const recentProductPrice = recentOrder?.total_amount || 2999;
  const recentOrderId = recentOrder?.id ? recentOrder.id.slice(0, 8) : "982173";
  const recentOrderDate = recentOrder?.created_at ? new Date(recentOrder.created_at).toLocaleDateString() : "Nov 12, 2023";
  const recentOrderStatus = recentOrder?.status ? recentOrder.status.toUpperCase() : "DELIVERED";

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <section className={styles.profileHeader}>
        <div className={styles.avatarWrapper}>
          {isUpdating ? (
            <div className={styles.loading} style={{ minHeight: 'unset', fontSize: '24px' }}>⏳</div>
          ) : user?.profile?.avatar_url || user?.user_metadata?.avatar ? (
            <ImageWithLoader 
              src={user?.profile?.avatar_url || user?.user_metadata?.avatar} 
              alt="avatar" 
              style={{ width: '100%', height: '100%', borderRadius: '50%' }} 
            />
          ) : (
            <span className={`material-symbols-outlined ${styles.mainAvatar}`}>
              account_circle
            </span>
          )}
          
          <label className={styles.avatarOverlay}>
            <span className="material-symbols-outlined" style={{ fontSize: '24px', marginBottom: '4px' }}>photo_camera</span>
            <span>UPDATE</span>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleAvatarChange} 
              className={styles.avatarInput} 
              disabled={isUpdating} 
            />
          </label>
        </div>
        <div className={styles.userInfo}>
          <h1 className={styles.userName}>{displayUser}</h1>
        </div>
      </section>

      {hasOrders && (
        <div className={styles.profileLayout}>
          {/* Tabs */}
          <nav className={styles.tabsContainer}>
            <div className={styles.tabsScroll}>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'PROFILE' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('PROFILE')}
              >
                MY PROFILE
              </button>
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
                    <input type="text" className={styles.inputField} defaultValue={shippingAddress?.name || fullName} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>EMAIL ADDRESS</label>
                    <input type="email" className={styles.inputField} defaultValue={shippingAddress?.email || user?.email || 'alex.sterling@audiophile.com'} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>PHONE NUMBER</label>
                    <input type="tel" className={styles.inputField} defaultValue={shippingAddress?.phone || user?.user_metadata?.phone || '+1 (555) 000-1234'} />
                  </div>
                  <button className={styles.saveBtn}>SAVE CHANGES</button>
                </section>

                {/* Recent Order Section */}
                <section className={styles.recentOrderSection}>
                  <h2 className={styles.sectionTitle}>RECENT ORDER</h2>
                  <div className={styles.orderCard}>
                    <div className={styles.orderImageWrapper}>
                      {productImages ? (
                        <ImageWithLoader
                          src={getImageUrl(productImages.mobile)}
                          alt={recentProductName}
                          imageClassName={styles.orderImage}
                          sources={[
                            { media: "(min-width: 1024px)", srcSet: getImageUrl(productImages.desktop) },
                            { media: "(min-width: 768px)", srcSet: getImageUrl(productImages.tablet) }
                          ]}
                          style={{ width: '100%', height: '100%', borderRadius: '8px' }}
                        />
                      ) : (
                        <ImageWithLoader 
                          src={getImageUrl("/assets/cart/image-xx99-mark-two-headphones.jpg")} 
                          alt={recentProductName} 
                          imageClassName={styles.orderImage} 
                          style={{ width: '100%', height: '100%', borderRadius: '8px' }}
                        />
                      )}
                    </div>
                    <div className={styles.orderDetails}>
                      <p className={styles.deliveredStatus}>{recentOrderStatus}</p>
                      <h3 className={styles.productName}>{recentProductName}</h3>
                      <p className={styles.orderMeta}>Order #{recentOrderId} &bull; {recentOrderDate}</p>
                      <div className={styles.orderFooter}>
                        <span className={styles.orderPrice}>$ {recentProductPrice.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                        <button 
                          className={styles.viewDetailsBtn} 
                          onClick={() => {
                            setActiveTab('ORDERS');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                        >
                          VIEW DETAILS
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            )}

            {activeTab === 'ORDERS' && (
              <div style={{ marginTop: '24px', marginBottom: '48px' }}>
                <OrderHistory />
              </div>
            )}

            {activeTab === 'ADDRESSES' && (
              <SavedAddresses addressData={shippingAddress} />
            )}

            {activeTab === 'PAYMENT' && (
              <PaymentInformation currentMethod={recentOrder.payment_method} />
            )}
          </div>
        </div>
      )}

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
