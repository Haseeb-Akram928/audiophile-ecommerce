import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getWishlist, toggleWishlistItem } from "@/services/apiWishlist";
import { useUser } from "@/features/auth/useUser";
import toast from "react-hot-toast";

export function useWishlist() {
  const { user } = useUser();
  const userId = user?.id;

  const {
    isLoading,
    data: wishlistIds,
    error,
  } = useQuery({
    queryKey: ["wishlist", userId],
    queryFn: () => getWishlist(userId),
    enabled: !!userId,
  });

  return { isLoading, wishlistIds: wishlistIds || [], error };
}

export function useToggleWishlist() {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const userId = user?.id;

  const { mutate: toggleWishlist, isPending } = useMutation({
    mutationFn: ({ productId, isWishlisted }) =>
      toggleWishlistItem({ userId, productId, isWishlisted }),
    onMutate: async ({ productId, isWishlisted }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["wishlist", userId] });

      // Snapshot the previous value
      const previousWishlist = queryClient.getQueryData(["wishlist", userId]);

      // Optimistically update to the new value
      queryClient.setQueryData(["wishlist", userId], (old) => {
        if (!old) return [];
        return isWishlisted
          ? old.filter((id) => id !== productId)
          : [...old, productId];
      });

      return { previousWishlist };
    },
    onError: (err, newWishlist, context) => {
      queryClient.setQueryData(["wishlist", userId], context.previousWishlist);
      toast.error("Failed to update wishlist");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist", userId] });
    },
  });

  return { toggleWishlist, isPending };
}
