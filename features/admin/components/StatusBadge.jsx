import styles from './StatusBadge.module.css';

function StatusBadge({ status }) {
  const normalizedStatus = status?.toLowerCase() || 'unknown';
  
  let variant = 'default';
  
  switch (normalizedStatus) {
    case 'delivered':
    case 'active':
    case 'approved':
      variant = 'success';
      break;
    case 'pending':
    case 'processing':
      variant = 'warning';
      break;
    case 'cancelled':
    case 'rejected':
    case 'inactive':
      variant = 'danger';
      break;
    case 'shipped':
    case 'confirmed':
      variant = 'info';
      break;
    default:
      variant = 'default';
  }

  return (
    <span className={`${styles.badge} ${styles[variant]}`}>
      {status}
    </span>
  );
}

export default StatusBadge;
