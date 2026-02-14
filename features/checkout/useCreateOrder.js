import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder as createOrderApi } from "@/services/apiOrders";
import { sendOrderConfirmation } from "@/services/apiEmail";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../cart/cartSlice";
import { useDispatch } from "react-redux";

export function useCreateOrder() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate: createOrder, isLoading } = useMutation({
    mutationFn: createOrderApi,
    onSuccess: (data) => {
      // Invalidate queries or update cache as needed
      queryClient.invalidateQueries({ queryKey: ["orders"] });

      // Send email
      sendOrderConfirmation(data);

      // Clear the cart
      dispatch(clearCart());

      // Redirect to a confirmation page
      navigate(`/order/${data.id}`, { replace: true });
    },
    onError: (err) => {
      console.error("ERROR", err);
    },
  });

  return { createOrder, isLoading };
}
