import styles from './Skeleton.module.css';

/**
 * A generic pulsing skeleton component used as a loading placeholder.
 */
export default function Skeleton({ className = "", style = {} }) {
  return (
    <div
      className={`${styles.skeleton} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}
