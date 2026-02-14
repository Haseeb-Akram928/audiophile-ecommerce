import styles from "../ProductDetail.module.css";

const ProductGallery = ({ gallery }) => {
  return (
    <section className={styles.gallery}>
      <div className={styles.galleryLeft}>
        <picture>
          <source media="(min-width: 1100px)" srcSet={gallery.first.desktop} />
          <source media="(min-width: 768px)" srcSet={gallery.first.tablet} />
          <img
            src={gallery.first.mobile}
            alt=""
            className={styles.galleryImg}
          />
        </picture>

        <picture>
          <source media="(min-width: 1100px)" srcSet={gallery.second.desktop} />
          <source media="(min-width: 768px)" srcSet={gallery.second.tablet} />
          <img
            src={gallery.second.mobile}
            alt=""
            className={styles.galleryImg}
          />
        </picture>
      </div>

      <div className={styles.galleryRight}>
        <picture>
          <source media="(min-width: 1100px)" srcSet={gallery.third.desktop} />
          <source media="(min-width: 768px)" srcSet={gallery.third.tablet} />
          <img
            src={gallery.third.mobile}
            alt=""
            className={styles.galleryImg}
          />
        </picture>
      </div>
    </section>
  );
};

export default ProductGallery;
