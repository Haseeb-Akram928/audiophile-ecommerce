import React from 'react';
import styles from '../ProductDetail.module.css';

const ProductFeatures = ({ features, includes }) => {
  return (
    <section className={styles.featuresSection}>
      <div className={styles.featuresText}>
        <h2 className={styles.subTitle}>FEATURES</h2>
        <p className={styles.featurePara}>{features}</p>
      </div>
      <div className={styles.inTheBox}>
        <h2 className={styles.subTitle}>IN THE BOX</h2>
        <ul className={styles.boxList}>
          {includes.map((item, index) => (
            <li key={index}>
              <span className={styles.quantity}>{item.quantity}x</span>
              <span className={styles.itemName}>{item.item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProductFeatures;
