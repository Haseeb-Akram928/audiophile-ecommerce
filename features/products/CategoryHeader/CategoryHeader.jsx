import styles from "@/features/products/CategoryHeader/CategoryHeader.module.css";

const CategoryHeader = ({ title }) => {
  return (
    <div className={styles.headerWrapper}>
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
};

export default CategoryHeader;
