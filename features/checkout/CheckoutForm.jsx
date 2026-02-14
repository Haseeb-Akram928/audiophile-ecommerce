import { useForm } from "react-hook-form";
import styles from "@/features/checkout/CheckoutForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query"; // Import useQueryClient
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../services/apiOrders.js"; // Corrected import
// import { updateProductStockApi } from '../../api/products.js'; // Removed as it doesn't exist
import { useUser } from "../../features/auth/useUser.js";
import { clearCart } from "../cart/cartSlice.js"; // Use clearCart instead of removeAll
import FormInputGroup from './components/FormInputGroup';
import BillingDetailsSection from './components/BillingDetailsSection';
import ShippingInfoSection from './components/ShippingInfoSection';
import PaymentDetailsSection from './components/PaymentDetailsSection';

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
  const cartItems = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);
  const shipping = useSelector((state) => state.cart.shipping);
  const vat = useSelector((state) => state.cart.vat);
  const grandTotal = useSelector((state) => state.cart.grandTotal);

  const createOrderMutation = useMutation({
    mutationFn: createOrder, // Changed to createOrder
    onSuccess: async (_, variables) => {
      // Removed variables from arguments as stock update logic is removed
      // Stock update logic removed as updateProductStockApi doesn't exist
      // const stockUpdatePromises = variables.cart_items.map(item =>
      //   updateProductStockApi(item.product_id, item.quantity)
      // );

      try {
        // await Promise.all(stockUpdatePromises);
        // queryClient.invalidateQueries(['adminProducts']);
        // queryClient.invalidateQueries(['product']);

        dispatch(clearCart()); // Use clearCart to clear cart
        onOrderSuccess();
      } catch (stockError) {
        console.error("Failed to update stock after order:", stockError);
        // alert(`Order placed, but failed to update stock: ${stockError.message}`);
      }
    },
    onError: (err) => {
      // toast.error(`Order placement failed: ${err.message}`); // toast is not defined
    },
  });

  const onSubmit = async (formData) => {
    if (!isAuthenticated || !user?.id) {
      // toast.error('You must be logged in to place an order.'); // toast is not defined
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
      user_id: user.id,
      cart_items: cartItems.map((item) => ({
        product_id: item.id,
        name: item.name,
        slug: item.slug,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
      })),
      total_amount: grandTotal, // Using grandTotal from Redux store
      shipping_address: shippingAddress,
      payment_method: formData.paymentMethod,
      status: "pending", // Initial status
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
