import { useParams, useNavigate } from "react-router-dom";
import { getImageUrl } from "@/utils/helper";
import { useProduct } from "../useProduct";
import styles from "@/features/products/ProductDetail/ProductDetail.module.css";
import RelatedProducts from "@/features/products/RelatedProducts/RelatedProducts";
import NotFound from "@/pages/NotFound";
import Loader from "@/components/ui/Loader";
import ImageWithLoader from "@/components/ui/ImageWithLoader/ImageWithLoader";
import ProductGallery from "./components/ProductGallery";
import ProductFeatures from "./components/ProductFeatures";
import AddToCartMenu from "./components/AddToCartMenu";

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isLoading, product, error } = useProduct(slug);

  if (isLoading) return <Loader />;
  if (error || !product) return <NotFound />;

  return (
    <>
      <main className={styles.detailWrapper}>
        <div className={styles.container}>
          <button onClick={() => navigate(-1)} className={styles.backBtn}>
            Go Back
          </button>

          <section className={styles.mainInfo}>
            <div className={styles.imageContainer}>
              <ImageWithLoader
                src={getImageUrl(product.image.mobile)}
                alt={product.name}
                sources={[
                  { media: "(min-width: 1100px)", srcSet: getImageUrl(product.image.desktop) },
                  { media: "(min-width: 768px)", srcSet: getImageUrl(product.image.tablet) }
                ]}
                style={{ display: 'block', width: '100%', height: '100%', borderRadius: '8px' }}
              />
            </div>
            <div className={styles.textContainer}>
              {product.new && <p className={styles.overline}>NEW PRODUCT</p>}
              <h1 className={styles.title}>{product.name}</h1>
              <p className={styles.description}>{product.description}</p>
              <p className={styles.price}>$ {product.price.toLocaleString()}</p>
              <AddToCartMenu product={product} />
            </div>
          </section>

          <ProductFeatures
            features={product.features}
            includes={product.includes}
          />

          <ProductGallery gallery={product.gallery} />

          <RelatedProducts others={product.others} />
        </div>
      </main>
    </>
  );
};

export default ProductDetail;
