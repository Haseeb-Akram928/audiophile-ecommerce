import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useReviews } from "../../useReviews";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import { useUser } from "@/features/auth/useUser";
import styles from "./ProductReviews.module.css";
import Loader from "@/components/ui/Loader";

const ProductReviews = ({ productId }) => {
  const { reviews, isLoading } = useReviews(productId);
  const { user } = useUser();

  // Read the intent from React Router navigation state — this is passed directly
  // by the "Rate Product" link and is available synchronously, no URL parsing needed.
  const { state } = useLocation();
  const [showForm, setShowForm] = useState(() => state?.writeReview === true);

  if (isLoading) return <Loader />;

  const avgRating = reviews?.length
    ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <section id="reviews" className={styles.reviewsSection}>
      <div className={styles.header}>
        <div className={styles.stats}>
          <h2 className={styles.title}>REVIEWS ({reviews?.length || 0})</h2>
          {reviews?.length > 0 && (
            <div className={styles.avgBox}>
              <span className={styles.avgNum}>{avgRating}</span>
              <span className={styles.stars}>{"★".repeat(Math.round(avgRating))}</span>
            </div>
          )}
        </div>

        {user && !showForm && (
          <button
            className="btn orange"
            onClick={() => setShowForm(true)}
          >
            WRITE A REVIEW
          </button>
        )}
      </div>

      {showForm && (
        <div className={styles.formWrapper}>
          <ReviewForm productId={productId} onCancel={() => setShowForm(false)} />
        </div>
      )}

      <ReviewList reviews={reviews || []} />
    </section>
  );
};

export default ProductReviews;
