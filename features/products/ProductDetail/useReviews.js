import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProductReviews, createReview } from "@/services/apiReviews";
import toast from "react-hot-toast";

export function useReviews(productId) {
  const {
    isLoading,
    data: reviews,
    error,
  } = useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => getProductReviews(productId),
    enabled: !!productId,
  });

  return { isLoading, reviews, error };
}

export function useCreateReview() {
  const queryClient = useQueryClient();

  const { mutate: submitReview, isPending: isSubmitting } = useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      toast.success("Review submitted! It will appear once approved by an admin.");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isSubmitting, submitReview };
}
