import { useForm } from "react-hook-form";
import { useLogin } from "@/features/auth/useLogin";
import styles from "@/features/auth/AuthForm.module.css";

function LoginForm() {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { login, isLoading } = useLogin();

  function onSubmit({ email, password }) {
    login({ email, password });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
        {errors.email && (
          <span className={styles.fieldError}>{errors.email.message}</span>
        )}
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
      <button type="submit" className={styles.button} disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

export default LoginForm;
