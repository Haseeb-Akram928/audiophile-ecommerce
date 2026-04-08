import { Link, useSearchParams } from "react-router-dom";
import styles from "@/features/products/ProductPreview/ProductPreview.module.css";
import { useProducts } from "../useProducts";
import { useWishlist, useToggleWishlist } from "../useWishlist";
import { useUser } from "@/features/auth/useUser";
import Loader from "@/components/ui/Loader";
import ImageWithLoader from "@/components/ui/ImageWithLoader/ImageWithLoader";
import { getImageUrl } from "@/utils/helper";

const ProductPreview = ({ categoryName }) => {
  const { isLoading, products, error } = useProducts();
  const [searchParams] = useSearchParams();
  const { wishlistIds } = useWishlist();
  const { toggleWishlist } = useToggleWishlist();
  const { user } = useUser();

  if (isLoading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  let filteredProducts = products.filter(
    (p) => p.category === categoryName.toLowerCase()
  );

  if (!searchParams.has("sort")) {
    filteredProducts = filteredProducts.sort((a, b) => b.new - a.new);
  }

  return (
    <section className={styles.listWrapper}>
      <div className={styles.container}>
        {filteredProducts.map((product) => {
          const isWishlisted = wishlistIds.includes(product.id);
          return (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.imageContainer}>
                {user && (
                  <button
                    className={styles.wishlistBtn}
                    onClick={() => toggleWishlist({ productId: product.id, isWishlisted })}
                    aria-label="Toggle Wishlist"
                  >
                    <span 
                      className={`material-symbols-outlined ${isWishlisted ? styles.wishlisted : ""}`}
                    >
                      favorite
                    </span>
                  </button>
                )}
                <ImageWithLoader
                  src={getImageUrl(product.categoryImage?.mobile) || ""}
                  alt={product.name}
                  sources={[
                    { media: "(min-width: 1100px)", srcSet: getImageUrl(product.categoryImage?.desktop) || "" },
                    { media: "(min-width: 768px)", srcSet: getImageUrl(product.categoryImage?.tablet) || "" }
                  ]}
                  style={{ display: 'block', width: '100%', height: '100%', borderRadius: '8px' }}
                />
              </div>

            <div className={styles.content}>
              {product.new && <p className={styles.newProduct}>NEW PRODUCT</p>}
              <h2 className={styles.name}>{product.name}</h2>
              <p className={styles.description}>{product.description}</p>
              <Link to={`/product/${product.slug}`} className="btn orange">
                SEE PRODUCT
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  </section>
  );
};

export default ProductPreview;
