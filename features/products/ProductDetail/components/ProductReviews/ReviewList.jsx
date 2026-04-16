import { format } from "date-fns";
import styles from "./ProductReviews.module.css";

const ReviewList = ({ reviews }) => {
  if (reviews.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No reviews yet. Be the first to review this product!</p>
      </div>
    );
  }

  return (
    <div className={styles.reviewList}>
      {reviews.map((review) => (
        <div key={review.id} className={styles.reviewItem}>
          <div className={styles.reviewHeader}>
            <div className={styles.userInfo}>
              <div className={styles.avatar}>
                {review.profiles?.username?.charAt(0).toUpperCase() || "U"}
              </div>
              <div>
                <p className={styles.username}>{review.profiles?.username || "Guest"}</p>
                <p className={styles.date}>{format(new Date(review.created_at), "MMM dd, yyyy")}</p>
              </div>
            </div>
            <div className={styles.rating}>
              {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
            </div>
          </div>
          {review.title && <h4 className={styles.reviewTitle}>{review.title}</h4>}
          <p className={styles.comment}>{review.body}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
