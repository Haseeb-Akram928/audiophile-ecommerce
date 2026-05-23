import FormInputGroup from "./FormInputGroup";
import styles from "@/features/checkout/CheckoutForm/CheckoutForm.module.css"; // Import styles

const BillingDetailsSection = ({ register, errors }) => {
  return (
    <div className={styles.section}>
      <h6 className={styles.sectionTitle}>BILLING DETAILS</h6>
      <div className={styles.inputGrid}>
        <FormInputGroup
          label="Name"
          id="name"
          register={register}
          error={errors.name}
          placeholder="Haseeb akram"
        />
        <FormInputGroup
          label="Email Address"
          id="email"
          type="email"
          register={register}
          error={errors.email}
          placeholder="Haseebakram@mail.com"
        />
        <FormInputGroup
          label="Phone Number"
          id="phone"
          type="tel"
          register={register}
          error={errors.phone}
          placeholder="+92 3001234567"
        />
      </div>
    </div>
  );
};

export default BillingDetailsSection;
