import { Link } from "react-router-dom";
import data from "../../../../data.json";
import styles from "@/features/products/Hero/Hero.module.css";

const Hero = () => {
  const newProduct = data.find(
    (product) =>
      product.new === true && product.slug === "xx99-mark-two-headphones",
  );

  return (
    <section className={styles.heroWrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          {newProduct && (
            <>
              <p className={styles.overline}>NEW PRODUCT</p>
              <h1 className={styles.title}>{newProduct.name}</h1>
              <p className={styles.description}>
                Experience natural, lifelike audio and exceptional build quality
                made for the passionate music enthusiast.
              </p>

              <Link to={`/product/${newProduct.slug}`} className="btn orange">
                SEE PRODUCT
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
