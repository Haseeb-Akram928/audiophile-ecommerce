import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/utils/validation";
import { useLogin } from "@/features/auth/useLogin";
import { useGoogleLogin } from "@/features/auth/useGoogleLogin";
import styles from "@/features/auth/AuthForm.module.css";

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  });
  const { login, isPending } = useLogin();
  const { loginWithGoogle, isPending: isGooglePending } = useGoogleLogin();

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
            {...register("email")}
            className={styles.fieldInput}
            disabled={isPending || isGooglePending}
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
            {...register("password")}
            className={styles.fieldInput}
            disabled={isPending || isGooglePending}
          />
          {errors.password && (
            <span className={styles.fieldError}>{errors.password.message}</span>
          )}
        </div>
        <button
          type="submit"
          className={styles.button}
          disabled={isPending || isGooglePending}
        >
          {isPending ? "Logging in..." : "Login"}
        </button>

        <div className={styles.divider}>OR</div>

        <button
          type="button"
          className={styles.googleButton}
          onClick={() => loginWithGoogle()}
          disabled={isPending || isGooglePending}
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google logo"
            width="18"
            height="18"
          />
          <span>Continue with Google</span>
        </button>
      </form>
  );
}

export default LoginForm;
