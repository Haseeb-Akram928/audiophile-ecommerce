import FormInputGroup from "./FormInputGroup";
import styles from "@/features/checkout/CheckoutForm/CheckoutForm.module.css"; // Import styles

const PaymentDetailsSection = ({ register, errors, paymentMethod, watch }) => {
  return (
    <div className={styles.section}>
      <h6 className={styles.sectionTitle}>PAYMENT DETAILS</h6>
      <div className={styles.paymentFlex}>
        <p className={styles.paymentLabel}>Payment Method</p>
        <div className={styles.radioGroup}>
          <label className="radio-container">
            <input
              type="radio"
              value="e-money"
              {...register("paymentMethod")}
              className="radio-input"
            />
            <div className="radio-content">
              <span className="radio-circle"></span>
              <span className="radio-label">e-Money</span>
            </div>
          </label>
          <label className="radio-container">
            <input
              type="radio"
              value="cash"
              {...register("paymentMethod")}
              className="radio-input"
            />
            <div className="radio-content">
              <span className="radio-circle"></span>
              <span className="radio-label">Cash on Delivery</span>
            </div>
          </label>
        </div>
      </div>

      {paymentMethod === "e-money" ? (
        <div className={styles.inputGrid}>
          <FormInputGroup
            label="e-Money Number"
            id="eMoneyNumber"
            register={register}
            error={errors.eMoneyNumber}
            placeholder="238521993"
          />
          <FormInputGroup
            label="e-Money PIN"
            id="eMoneyPin"
            type="password"
            register={register}
            error={errors.eMoneyPin}
            placeholder="6891"
          />
        </div>
      ) : (
        <div className={styles.cashNotice}>
          <img
            src="/assets/checkout/icon-cash-on-delivery.svg"
            alt="Cash on delivery icon"
          />
          <p>
            The ‘Cash on Delivery’ option enables you to pay in cash when our
            delivery courier arrives at your residence. Just make sure your
            address is correct so that your order will not be cancelled.
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentDetailsSection;
