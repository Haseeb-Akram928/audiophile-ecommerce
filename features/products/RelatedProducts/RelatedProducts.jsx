import { Link } from "react-router-dom";
import styles from "@/features/products/RelatedProducts/RelatedProducts.module.css";

const RelatedProducts = ({ others }) => {
  return (
    <section className={styles.sectionWrapper}>
      <h2 className={styles.title}>You may also like</h2>
      <div className={styles.grid}>
        {others.map((item, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.imageContainer}>
              <picture>
                <source
                  media="(min-width: 1100px)"
                  srcSet={item.image.desktop}
                />
                <source media="(min-width: 768px)" srcSet={item.image.tablet} />
                <img
                  src={item.image.mobile}
                  alt={item.name}
                  className={styles.productImg}
                />
              </picture>
            </div>
            <h3 className={styles.productName}>{item.name}</h3>
            <Link to={`/product/${item.slug}`} className="btn orange">
              SEE PRODUCT
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
