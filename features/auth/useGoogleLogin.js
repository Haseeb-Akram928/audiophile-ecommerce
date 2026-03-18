import { useMutation } from "@tanstack/react-query";
import { loginWithGoogle as loginWithGoogleApi } from "@/services/apiAuth";
import toast from "react-hot-toast";

export function useGoogleLogin() {
  const { mutate: loginWithGoogle, isPending } = useMutation({
    mutationFn: loginWithGoogleApi,
    onError: (err) => {
      console.error("ERROR", err);
      toast.error(err.message || "Google login failed", { id: "login" });
    },
  });

  return { loginWithGoogle, isPending };
}
