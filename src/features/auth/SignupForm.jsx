import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/utils/validation";
import { useSignup } from "@/features/auth/useSignup";
import { useGoogleLogin } from "@/features/auth/useGoogleLogin";
import styles from "@/features/auth/AuthForm.module.css";

function SignupForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema)
  });
  const { signup, isPending } = useSignup();
  const { loginWithGoogle, isPending: isGooglePending } = useGoogleLogin();

  function onSubmit({ fullName, username, email, password }) {
    signup({ fullName, username, email, password });
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
          {...register("fullName")}
          className={styles.fieldInput}
          disabled={isPending || isGooglePending}
        />
        {errors.fullName && (
          <span className={styles.fieldError}>{errors.fullName.message}</span>
        )}
      </div>
      <div className={styles.field}>
        <label htmlFor="username" className={styles.fieldLabel}>
          Username
        </label>
        <input
          type="text"
          id="username"
          {...register("username")}
          className={styles.fieldInput}
          disabled={isPending || isGooglePending}
        />
        {errors.username && (
          <span className={styles.fieldError}>{errors.username.message}</span>
        )}
      </div>
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
      <div className={styles.field}>
        <label htmlFor="passwordConfirm" className={styles.fieldLabel}>
          Confirm Password
        </label>
        <input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm")}
          className={styles.fieldInput}
          disabled={isPending || isGooglePending}
        />
        {errors.passwordConfirm && (
          <span className={styles.fieldError}>
            {errors.passwordConfirm.message}
          </span>
        )}
      </div>
      <button
        type="submit"
        className={styles.button}
        disabled={isPending || isGooglePending}
      >
        {isPending ? "Creating account..." : "Create new account"}
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

export default SignupForm;
