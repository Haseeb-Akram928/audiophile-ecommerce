import { Link } from "react-router-dom";
import { useProducts } from "../useProducts";
import styles from "@/features/products/Hero/Hero.module.css";
import Loader from "@/components/ui/Loader";

const Hero = () => {
  const { isLoading, products } = useProducts();

  if (isLoading) return <Loader />;

  const newProduct = products?.find(
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
