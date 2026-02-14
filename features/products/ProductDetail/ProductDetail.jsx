import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "@/features/cart/cartSlice";
import styles from "@/features/products/ProductDetail/ProductDetail.module.css";
import RelatedProducts from "@/features/products/RelatedProducts/RelatedProducts";
import NotFound from "@/pages/NotFound";
import { useProduct } from "../useProduct";
import Loader from "@/ui/Loader";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, product, error } = useProduct(slug);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    dispatch(
      addItem({
        id: product.id,
        name: product.shortName || product.name,
        price: product.price,
        image: product.image.mobile,
        quantity: quantity,
        slug: product.slug,
      }),
    );
  };

  if (isLoading) return <Loader />;
  if (error || !product) return <NotFound />;

  return (
    <>
      <main className={styles.detailWrapper}>
        <div className={styles.container}>
          <button onClick={() => navigate(-1)} className={styles.backBtn}>
            Go Back
          </button>

          {/* 1. Main Product Section */}
          <section className={styles.mainInfo}>
            <div className={styles.imageContainer}>
              <picture>
                <source
                  media="(min-width: 1100px)"
                  srcSet={product.image.desktop}
                />
                <source
                  media="(min-width: 768px)"
                  srcSet={product.image.tablet}
                />
                <img src={product.image.mobile} alt={product.name} />
              </picture>
            </div>
            <div className={styles.textContainer}>
              {product.new && <p className={styles.overline}>NEW PRODUCT</p>}
              <h1 className={styles.title}>{product.name}</h1>
              <p className={styles.description}>{product.description}</p>
              <p className={styles.price}>$ {product.price.toLocaleString()}</p>
              <div className={styles.addToCartRow}>
                <div className={styles.quantitySelector}>
                  <button
                    type="button"
                    className={styles.minus}
                    onClick={handleDecrement}
                  >
                    -
                  </button>
                  <span className={styles.quantityNumber}>{quantity}</span>
                  <button
                    type="button"
                    className={styles.plus}
                    onClick={handleIncrement}
                  >
                    +
                  </button>
                </div>
                <button className="btn orange" onClick={handleAddToCart}>
                  ADD TO CART
                </button>
              </div>
            </div>
          </section>

          {/* 2. Features & In the Box */}
          <section className={styles.featuresSection}>
            <div className={styles.featuresText}>
              <h2 className={styles.subTitle}>FEATURES</h2>
              <p className={styles.featurePara}>{product.features}</p>
            </div>
            <div className={styles.inTheBox}>
              <h2 className={styles.subTitle}>IN THE BOX</h2>
              <ul className={styles.boxList}>
                {product.includes.map((item, index) => (
                  <li key={index}>
                    <span className={styles.quantity}>{item.quantity}x</span>
                    <span className={styles.itemName}>{item.item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 3. Image Gallery */}
          <section className={styles.gallery}>
            <div className={styles.galleryLeft}>
              <picture>
                <source
                  media="(min-width: 1100px)"
                  srcSet={product.gallery.first.desktop}
                />
                <source
                  media="(min-width: 768px)"
                  srcSet={product.gallery.first.tablet}
                />
                <img
                  src={product.gallery.first.mobile}
                  alt=""
                  className={styles.galleryImg}
                />
              </picture>

              <picture>
                <source
                  media="(min-width: 1100px)"
                  srcSet={product.gallery.second.desktop}
                />
                <source
                  media="(min-width: 768px)"
                  srcSet={product.gallery.second.tablet}
                />
                <img
                  src={product.gallery.second.mobile}
                  alt=""
                  className={styles.galleryImg}
                />
              </picture>
            </div>

            <div className={styles.galleryRight}>
              <picture>
                <source
                  media="(min-width: 1100px)"
                  srcSet={product.gallery.third.desktop}
                />
                <source
                  media="(min-width: 768px)"
                  srcSet={product.gallery.third.tablet}
                />
                <img
                  src={product.gallery.third.mobile}
                  alt=""
                  className={styles.galleryImg}
                />
              </picture>
            </div>
          </section>

          <RelatedProducts others={product.others} />
        </div>
      </main>
    </>
  );
};

export default ProductDetail;
