import { Link } from "react-router-dom";
import data from "../../../../data.json";
import styles from "@/features/products/FeaturedProducts/FeaturedProducts.module.css";

const FeaturedProducts = () => {
  // Find products from JSON
  const zx9 = data.find((p) => p.slug === "zx9-speaker");
  const zx7 = data.find((p) => p.slug === "zx7-speaker");
  const yx1 = data.find((p) => p.slug === "yx1-earphones");

  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.container}>
        {/* 1. ZX9 Speaker - Large Orange Card */}
        <div className={styles.zx9Card}>
          <img
            src="/assets/home/desktop/pattern-circles.svg"
            alt=""
            aria-hidden="true"
            className={styles.pattern}
          />
          <div className={styles.zx9Content}>
            <div className={styles.zx9ImageContainer}>
              <img
                src="/assets/home/desktop/image-speaker-zx9.png"
                alt=""
                aria-hidden="true"
                className={styles.speaker}
              />
            </div>
            <div className={styles.zx9TextContainer}>
              <h2 className={styles.zx9Title}>{zx9?.name}</h2>
              <p className={styles.zx9Description}>
                Upgrade to premium speakers that are phenomenally built to
                deliver truly remarkable sound.
              </p>
              <Link to={`/product/${zx9?.slug}`} className="btn special-btn">
                SEE PRODUCT
              </Link>
            </div>
          </div>
        </div>

        {/* 2. ZX7 Speaker - Full Width Card */}
        <div className={styles.zx7Card}>
          <div className={styles.zx7TextContainer}>
            <h2 className={styles.zx7Title}>{zx7?.name}</h2>
            <Link to={`/product/${zx7?.slug}`} className="btn black">
              SEE PRODUCT
            </Link>
          </div>
        </div>

        {/* 3. YX1 Earphones - Split Layout */}
        <div className={styles.yx1Container}>
          <div className={styles.yx1Image}></div>
          <div className={styles.yx1Content}>
            <h2 className={styles.yx1Title}>{yx1?.name}</h2>
            <Link to={`/product/${yx1?.slug}`} className="btn black">
              SEE PRODUCT
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
