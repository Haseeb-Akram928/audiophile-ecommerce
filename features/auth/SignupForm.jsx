import { useForm } from "react-hook-form";
import { useSignup } from "@/features/auth/useSignup";
import styles from "@/features/auth/AuthForm.module.css";

function SignupForm() {
  const { register, handleSubmit, formState, getValues } = useForm();
  const { errors } = formState;
  const { signup, isLoading } = useSignup();

  function onSubmit({ fullName, email, password }) {
    signup({ fullName, email, password });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="fullName" className={styles.fieldLabel}>
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          {...register("fullName", { required: "Full name is required" })}
          className={styles.fieldInput}
          disabled={isLoading}
        />
        {errors.fullName && (
          <span className={styles.fieldError}>{errors.fullName.message}</span>
        )}
      </div>
      <div className={styles.field}>
        <label htmlFor="email" className={styles.fieldLabel}>
          Email address
        </label>
        <input
          type="email"
          id="email"
          {...register("email", { required: "Email is required" })}
          className={styles.fieldInput}
          disabled={isLoading}
        />
        {errors.email && <span className={styles.fieldError}>{errors.email.message}</span>}
      </div>
      <div className={styles.field}>
        <label htmlFor="password" className={styles.fieldLabel}>
          Password
        </label>
        <input
          type="password"
          id="password"
          {...register("password", { required: "Password is required" })}
          className={styles.fieldInput}
          disabled={isLoading}
        />
        {errors.password && (
          <span className={styles.fieldError}>{errors.password.message}</span>
        )}
      </div>
      <div className={styles.field}>
        <label htmlFor="passwordConfirm" className={styles.fieldLabel}>
          Confirm Password
        </label>
        <input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "Please confirm your password",
            validate: (value) =>
              value === getValues().password || "Passwords do not match",
          })}
          className={styles.fieldInput}
          disabled={isLoading}
        />
        {errors.passwordConfirm && (
          <span className={styles.fieldError}>{errors.passwordConfirm.message}</span>
        )}
      </div>
      <button type="submit" className={styles.button} disabled={isLoading}>
        {isLoading ? "Creating account..." : "Create new account"}
      </button>
    </form>
  );
}

export default SignupForm;