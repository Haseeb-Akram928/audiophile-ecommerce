import { useUser } from "@/features/auth/useUser"; // Import useUser to get authenticated user
import { createOrder } from "@/services/apiOrders.js"; // Corrected import
import { useMutation, useQueryClient } from "@tanstack/react-query"; // Import useQueryClient
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getCart, getTotalCartPrice } from "@/features/cart/cartSlice";
import styles from "@/features/checkout/CheckoutForm/CheckoutForm.module.css";
import toast from "react-hot-toast"; // Import toast

// import FormInputGroup from "./components/FormInputGroup.jsx";
import BillingDetailsSection from "@/features/checkout/CheckoutForm/components/BillingDetailsSection.jsx";
import ShippingInfoSection from "@/features/checkout/CheckoutForm/components/ShippingInfoSection.jsx";
import PaymentDetailsSection from "@/features/checkout/CheckoutForm/components/PaymentDetailsSection.jsx";

const CheckoutForm = ({ onOrderSuccess }) => {
  const queryClient = useQueryClient(); // Initialize queryClient

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { paymentMethod: "cash" },
  });

  const paymentMethod = watch("paymentMethod");
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useUser(); // Get authenticated user
  const cartItems = useSelector(getCart);
  const grandTotal = useSelector(getTotalCartPrice);

  const createOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: async () => {
      onOrderSuccess();
    },
    onError: (err) => {
      toast.error(`Order placement failed: ${err.message}`);
    },
  });

  const onSubmit = async (formData) => {
    if (!isAuthenticated || !user?.id) {
      toast.error("You must be logged in to place an order.");
      return;
    }

    // Construct shipping address object
    const shippingAddress = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      zip: formData.zip,
      city: formData.city,
      country: formData.country,
    };

    const orderData = {
      userId: user.id,
      cartItems: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: grandTotal,
      shippingAddress: shippingAddress,
      paymentMethod: formData.paymentMethod,
    };

    createOrderMutation.mutate(orderData);
  };

  return (
    <form
      id="checkout-form"
      className={styles.formCard}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className={styles.mainTitle}>CHECKOUT</h1>

      <BillingDetailsSection register={register} errors={errors} />
      <ShippingInfoSection register={register} errors={errors} />
      <PaymentDetailsSection
        register={register}
        errors={errors}
        paymentMethod={paymentMethod}
        watch={watch}
      />
    </form>
  );
};

export default CheckoutForm;
