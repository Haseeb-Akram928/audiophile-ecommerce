import { Link } from "react-router-dom";
import styles from "@/features/products/ProductPreview/ProductPreview.module.css";
import { useProducts } from "../useProducts";
import Loader from "@/ui/Loader";

const ProductPreview = ({ categoryName }) => {
  const { isLoading, products, error } = useProducts();

  if (isLoading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  const filteredProducts = products
    .filter((p) => p.category === categoryName.toLowerCase())
    .sort((a, b) => b.new - a.new);

  return (
    <section className={styles.listWrapper}>
      <div className={styles.container}>
        {filteredProducts.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <div className={styles.imageContainer}>
              <picture>
                <source
                  media="(min-width: 1100px)"
                  srcSet={product.categoryImage?.desktop || ''}
                />
                <source
                  media="(min-width: 768px)"
                  srcSet={product.categoryImage?.tablet || ''}
                />
                <img src={product.categoryImage?.mobile || ''} alt={product.name} />
              </picture>
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
        ))}
      </div>
    </section>
  );
};

export default ProductPreview;
