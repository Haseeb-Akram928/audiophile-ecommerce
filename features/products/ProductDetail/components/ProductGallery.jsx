import { getImageUrl } from "@/utils/helper";
import styles from "../ProductDetail.module.css";
import ImageWithLoader from "@/components/ui/ImageWithLoader/ImageWithLoader";

const ProductGallery = ({ gallery }) => {
  return (
    <section className={styles.gallery}>
      <div className={styles.galleryLeft}>
        <ImageWithLoader
          src={getImageUrl(gallery.first.mobile)}
          alt=""
          imageClassName={styles.galleryImg}
          sources={[
            { media: "(min-width: 1100px)", srcSet: getImageUrl(gallery.first.desktop) },
            { media: "(min-width: 768px)", srcSet: getImageUrl(gallery.first.tablet) }
          ]}
          style={{ width: '100%', height: '100%', borderRadius: '8px' }}
        />

        <ImageWithLoader
          src={getImageUrl(gallery.second.mobile)}
          alt=""
          imageClassName={styles.galleryImg}
          sources={[
            { media: "(min-width: 1100px)", srcSet: getImageUrl(gallery.second.desktop) },
            { media: "(min-width: 768px)", srcSet: getImageUrl(gallery.second.tablet) }
          ]}
          style={{ width: '100%', height: '100%', borderRadius: '8px' }}
        />
      </div>

      <div className={styles.galleryRight}>
        <ImageWithLoader
          src={getImageUrl(gallery.third.mobile)}
          alt=""
          imageClassName={styles.galleryImg}
          sources={[
            { media: "(min-width: 1100px)", srcSet: getImageUrl(gallery.third.desktop) },
            { media: "(min-width: 768px)", srcSet: getImageUrl(gallery.third.tablet) }
          ]}
          style={{ width: '100%', height: '100%', borderRadius: '8px' }}
        />
      </div>
    </section>
  );
};

export default ProductGallery;
