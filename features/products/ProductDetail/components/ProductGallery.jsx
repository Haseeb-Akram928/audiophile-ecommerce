import styles from "../ProductDetail.module.css";
import { getImageUrl } from "@/utils/helper";

const ProductGallery = ({ gallery }) => {
  return (
    <section className={styles.gallery}>
      <div className={styles.galleryLeft}>
        <picture>
          <source media="(min-width: 1100px)" srcSet={getImageUrl(gallery.first.desktop)} />
          <source media="(min-width: 768px)" srcSet={getImageUrl(gallery.first.tablet)} />
          <img
            src={gallery.first.mobile}
            alt=""
            className={styles.galleryImg}
          />
        </picture>

        <picture>
          <source media="(min-width: 1100px)"  srcSet={getImageUrl(gallery.second.desktop)} />
          <source media="(min-width: 768px)" srcSet={getImageUrl(gallery.second.tablet)} />
          <img
            src={getImageUrl(gallery.second.mobile)}
            alt=""
            className={styles.galleryImg}
          />
        </picture>
      </div>

      <div className={styles.galleryRight}>
        <picture>
          <source media="(min-width: 1100px)" srcSet={getImageUrl(gallery.third.desktop)} />
          <source media="(min-width: 768px)" srcSet={getImageUrl(gallery.third.tablet)} />
          <img
            src={getImageUrl(gallery.third.mobile)}
            alt=""
            className={styles.galleryImg}
          />
        </picture>
      </div>
    </section>
  );
};

export default ProductGallery;
