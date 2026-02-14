import SignupForm from "@/features/auth/SignupForm";
import { Link } from "react-router-dom";
import styles from "@/pages/AuthPage.module.css";

const SignupPage = () => {
  return (
    <div className={styles.authPage}>
      <Link to="/" className={styles.homeLink}>
        ← Back to Shop
      </Link>
      <div className={styles.container}>
        <SignupForm />
        <div className={styles.footer}>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
