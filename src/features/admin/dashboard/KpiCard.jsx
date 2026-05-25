import styles from './KpiCard.module.css';

function KpiCard({ title, value, icon: Icon, trend, trendValue, isCurrency }) {
  const formattedValue = isCurrency && typeof value === 'number'
    ? `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : value?.toLocaleString() || value;

  return (
    <div className={styles.kpiCard}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        {Icon && (
          <div className={styles.iconWrapper}>
            <Icon size={18} className={styles.icon} />
          </div>
        )}
      </div>
      
      <div className={styles.body}>
        <div className={styles.value}>{formattedValue !== undefined ? formattedValue : '-'}</div>
      </div>
      
      {trend && (
        <div className={styles.footer}>
          <span className={`${styles.trend} ${trend === 'up' ? styles.positive : styles.negative}`}>
            {trend === 'up' ? '↑' : '↓'} {trendValue}
          </span>
          <span className={styles.trendLabel}>vs last month</span>
        </div>
      )}
    </div>
  );
}

export default KpiCard;
