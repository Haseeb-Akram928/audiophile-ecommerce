import { useMemo } from "react";
import { format } from "date-fns";
import { CheckCircle, XCircle } from "lucide-react";
import { useAdminReviews, useApproveReview } from "./useAdminContent";
import DataTable from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import styles from "./Content.module.css";
import Loader from "@/components/ui/Loader";

export default function ReviewModeration() {
  const { reviews, isLoading } = useAdminReviews();
  const { moderateReview, isPending } = useApproveReview();

  const columns = useMemo(
    () => [
      {
        header: "Product",
        accessorFn: (row) => row.products?.name || "Unknown",
        cell: (info) => <span className={styles.productName}>{info.getValue()}</span>
      },
      {
        header: "User",
        accessorFn: (row) => row.profiles?.username || "Guest",
        cell: (info) => <span>{info.getValue()}</span>
      },
      {
        header: "Rating",
        accessorKey: "rating",
        cell: (info) => (
          <div className={styles.rating}>
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < info.getValue() ? styles.starFilled : styles.starEmpty}>★</span>
            ))}
          </div>
        )
      },
      {
        header: "Comment",
        accessorKey: "body",
        cell: (info) => <span className={styles.comment}>{info.getValue()}</span>
      },
      {
        header: "Date",
        accessorKey: "created_at",
        cell: (info) => <span>{format(new Date(info.getValue()), "MMM dd, yyyy")}</span>
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: (info) => (
          <StatusBadge status={info.getValue() === "approved" ? "approved" : "pending"} />
        )
      },
      {
        header: "Actions",
        id: "actions",
        cell: (info) => {
          const review = info.row.original;
          return (
            <div className={styles.actions}>
              {review.status !== "approved" && (
                <button 
                  className={`${styles.actionBtn} ${styles.approveBtn}`}
                  onClick={() => moderateReview({ reviewId: review.id, isApproved: true })}
                  disabled={isPending}
                  title="Approve Review"
                >
                  <CheckCircle size={18} />
                </button>
              )}
              {review.status === "approved" && (
                <button 
                  className={`${styles.actionBtn} ${styles.rejectBtn}`}
                  onClick={() => moderateReview({ reviewId: review.id, isApproved: false })}
                  disabled={isPending}
                  title="Hide/Reject Review"
                >
                  <XCircle size={18} />
                </button>
              )}
            </div>
          );
        }
      }
    ],
    [moderateReview, isPending]
  );

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Review Moderation</h1>
          <p className={styles.subtitle}>Approve or hide customer product reviews.</p>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <DataTable data={reviews || []} columns={columns} loading={isLoading} />
      </div>
    </div>
  );
}
