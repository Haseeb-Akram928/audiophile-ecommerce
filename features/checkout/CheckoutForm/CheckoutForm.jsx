import { useUser } from "@/features/auth/useUser"; // Import useUser to get authenticated user
import { useOrders } from "@/features/orders/useOrders"; // Import useOrders to get past shipping address
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
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { paymentMethod: "cash" },
  });

  const { orders } = useOrders();
  const savedAddress = orders?.[0]?.shipping_address;

  const handleUseSavedAddress = (e) => {
    e.preventDefault();
    if (savedAddress) {
      setValue("name", savedAddress.name, { shouldValidate: true });
      setValue("email", savedAddress.email, { shouldValidate: true });
      setValue("phone", savedAddress.phone, { shouldValidate: true });
      setValue("address", savedAddress.address, { shouldValidate: true });
      setValue("zip", savedAddress.zip, { shouldValidate: true });
      setValue("city", savedAddress.city, { shouldValidate: true });
      setValue("country", savedAddress.country, { shouldValidate: true });
    }
  };

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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 className={styles.mainTitle} style={{ marginBottom: 0 }}>CHECKOUT</h1>
        {savedAddress && (
          <button 
            type="button" 
            onClick={handleUseSavedAddress}
            style={{ 
              background: '#f1f1f1', 
              border: 'none', 
              padding: '10px 16px', 
              borderRadius: '8px', 
              cursor: 'pointer', 
              fontWeight: '700', 
              fontSize: '13px', 
              color: '#d87d4a',
              transition: 'background 0.2s ease',
              marginTop: '16px'
            }}
            onMouseOver={(e) => e.target.style.background = '#e2e2e2'}
            onMouseOut={(e) => e.target.style.background = '#f1f1f1'}
          >
            USE SAVED ADDRESS
          </button>
        )}
      </div>

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
