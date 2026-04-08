import FormInputGroup from "./FormInputGroup";
import styles from "@/features/checkout/CheckoutForm/CheckoutForm.module.css"; // Import styles

const ShippingInfoSection = ({ register, errors }) => {
  return (
    <div className={styles.section}>
      <h6 className={styles.sectionTitle}>SHIPPING INFO</h6>
      <div className={styles.inputGrid}>
        <FormInputGroup
          label="Address"
          id="address"
          register={register}
          error={errors.address}
          placeholder="Lahore, Pakistan"
          wrapperClassName={`${styles.fullWidthInput}`}
        />
        <FormInputGroup
          label="ZIP Code"
          id="zip"
          register={register}
          error={errors.zip}
          placeholder="10001"
        />
        <FormInputGroup
          label="City"
          id="city"
          register={register}
          error={errors.city}
          placeholder="Lahore"
        />
        <FormInputGroup
          label="Country"
          id="country"
          register={register}
          error={errors.country}
          placeholder="Pakistan"
        />
      </div>
    </div>
  );
};

export default ShippingInfoSection;
