import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "@/services/apiAuth";
import { useLogin } from "@/features/auth/useLogin";
import toast from "react-hot-toast";

export function useSignup() {
  const { login } = useLogin();
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      toast.success(
        "Account successfully created! Please verify your email."
      );
      // Optional: You can also log the user in directly after signup
    },
    onError: (err) => {
      console.error("ERROR", err);
      toast.error(err.message || "Account could not be created");
    },
  });

  return { signup, isPending };
}
