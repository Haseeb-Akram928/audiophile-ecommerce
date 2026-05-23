import { useState } from "react";
import { useCreateReview } from "../../useReviews";
import { useUser } from "@/features/auth/useUser";
import styles from "./ProductReviews.module.css";
import { Loader2 } from "lucide-react";

const ReviewForm = ({ productId, onCancel }) => {
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const { user } = useUser();
  const { isSubmitting, submitReview } = useCreateReview();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    submitReview(
      { productId, userId: user.id, rating, comment, title },
      {
        onSuccess: () => {
          setComment("");
          onCancel();
        },
      }
    );
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.formTitle}>Write a Review</h3>
      
      <div className={styles.inputGroup}>
        <label>Overall Rating</label>
        <div className={styles.starPicker}>
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              type="button"
              className={num <= rating ? styles.starActive : styles.starInactive}
              onClick={() => setRating(num)}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label>Review Title</label>
        <input
          type="text"
          className={styles.input}
          placeholder="Summarize your experience"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Your Comment</label>
        <textarea
          required
          rows={4}
          className={styles.textarea}
          placeholder="What did you think about this product?"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <div className={styles.formActions}>
        <button type="button" className={styles.cancelBtn} onClick={onCancel} disabled={isSubmitting}>
          CANCEL
        </button>
        <button type="submit" className="btn orange" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className={styles.spinner} size={18} /> : "SUBMIT REVIEW"}
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
