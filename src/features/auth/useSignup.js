import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupApi } from "@/services/apiAuth";
import { useLogin } from "@/features/auth/useLogin";
import { sendWelcomeEmail } from "@/services/apiEmail";
import { syncCartWithSupabase } from "@/services/apiCart";
import { setCart } from "@/features/cart/cartSlice";
import { store } from "@/store";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useSignup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: async (data) => {
      // 1. Success Toast
      toast.success(
        "Account successfully created!",
        { id: "signup" }
      );

      // 2. Trigger Welcome Email
      if (data?.user) {
        // Flag localStorage so the global hook doesn't send a duplicate welcome email
        localStorage.setItem(`welcome_email_sent_${data.user.id}`, "true");

        sendWelcomeEmail({
          fullName: data.user.user_metadata.fullName,
          email: data.user.email,
        });
      }

      // 3. Update Cache & Redirect
      if (data?.session) {
        queryClient.setQueryData(["user"], data.user);

        // Sync cart with Supabase
        try {
          const localCart = store.getState().cart;
          const mergedCart = await syncCartWithSupabase(data.user.id, localCart);
          store.dispatch(setCart(mergedCart));
        } catch (err) {
          console.error("Cart sync failed on signup", err);
        }

        navigate("/", { replace: true });
      } else {
        toast.info("Please verify your email address.", { id: "signup" });
        navigate("/login", { replace: true });
      }
    },
    onError: (err) => {
      console.error("ERROR", err);
      toast.error(err.message || "Account could not be created", { id: "signup" });
    },
  });

  return { signup, isPending };
}
