import React from 'react';
import styles from '@/pages/ProfilePage.module.css';
import Skeleton from '@/components/ui/Skeleton/Skeleton';

export default function ProfileSkeleton() {
  return (
    <div className={styles.container}>
      {/* Header Section */}
      <section className={styles.profileHeader}>
        <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
          <Skeleton style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
        </div>
        <div className={styles.userInfo} style={{ gap: '16px', display: 'flex', flexDirection: 'column' }}>
          <Skeleton style={{ width: '220px', height: '36px', borderRadius: '4px' }} />
        </div>
      </section>

      <div className={styles.profileLayout}>
        {/* Tabs */}
        <nav className={styles.tabsContainer}>
          <div className={styles.tabsScroll} style={{ gap: '16px', display: 'flex' }}>
            <Skeleton style={{ width: '100px', height: '30px', borderRadius: '4px' }} />
            <Skeleton style={{ width: '130px', height: '30px', borderRadius: '4px' }} />
            <Skeleton style={{ width: '140px', height: '30px', borderRadius: '4px' }} />
            <Skeleton style={{ width: '170px', height: '30px', borderRadius: '4px' }} />
          </div>
        </nav>

        {/* Content Area */}
        <div className={styles.tabContent}>
          <section className={styles.detailsContainer}>
            <Skeleton style={{ width: '180px', height: '24px', marginBottom: '32px', borderRadius: '4px' }} />
            
            <div className={styles.formGroup}>
              <Skeleton style={{ width: '60px', height: '14px', borderRadius: '4px' }} />
              <Skeleton style={{ width: '100%', maxWidth: '450px', height: '54px', borderRadius: '8px' }} />
            </div>
            
            <div className={styles.formGroup}>
              <Skeleton style={{ width: '120px', height: '14px', borderRadius: '4px' }} />
              <Skeleton style={{ width: '100%', maxWidth: '450px', height: '54px', borderRadius: '8px' }} />
            </div>
            
            <div className={styles.formGroup}>
              <Skeleton style={{ width: '110px', height: '14px', borderRadius: '4px' }} />
              <Skeleton style={{ width: '100%', maxWidth: '450px', height: '54px', borderRadius: '8px' }} />
            </div>

            <Skeleton style={{ width: '100%', maxWidth: '450px', height: '54px', borderRadius: '4px', marginTop: '16px' }} />
          </section>
        </div>
      </div>
    </div>
  );
}
