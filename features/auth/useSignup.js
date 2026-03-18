import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupApi } from "@/services/apiAuth";
import { useLogin } from "@/features/auth/useLogin";
import { sendWelcomeEmail } from "@/services/apiEmail";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useSignup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: (data) => {
      // 1. Success Toast
      toast.success(
        "Account successfully created!",
        { id: "signup" }
      );

      // 2. Trigger Welcome Email
      if (data?.user) {
        sendWelcomeEmail({
          fullName: data.user.user_metadata.fullName,
          email: data.user.email,
        });
      }

      // 3. Update Cache & Redirect (If session exists, otherwise redirect to login)
      if (data?.session) {
        queryClient.setQueryData(["user"], data.user);
        navigate("/", { replace: true });
      } else {
        // If email confirmation is required, Supabase might not return a session immediately
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
