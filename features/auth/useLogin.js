import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "@/services/apiAuth";
import { syncCartWithSupabase } from "@/services/apiCart";
import { setCart } from "@/features/cart/cartSlice";
import { store } from "@/store";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: async (user) => {
      queryClient.setQueryData(["user"], user.user);

      // Sync cart with Supabase
      try {
        const localCart = store.getState().cart;
        const mergedCart = await syncCartWithSupabase(user.user.id, localCart);
        store.dispatch(setCart(mergedCart));
      } catch (err) {
        console.error("Cart sync failed on login", err);
      }

      toast.success("Logged in successfully!", { id: "login" });
      navigate("/", { replace: true });
    },
    onError: (err) => {
      console.error("ERROR", err);
      toast.error(err.message || "Login failed", { id: "login" });
    },
  });

  return { login, isPending };
}
