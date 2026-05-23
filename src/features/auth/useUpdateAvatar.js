import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateAvatar as updateAvatarApi } from "@/services/apiAuth";

export function useUpdateAvatar() {
  const queryClient = useQueryClient();

  const { mutate: updateAvatar, isPending: isUpdating } = useMutation({
    mutationFn: ({ userId, file }) => updateAvatarApi({ userId, file }),
    onSuccess: () => {
      toast.success("Avatar successfully updated!");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update avatar");
    },
  });

  return { updateAvatar, isUpdating };
}
