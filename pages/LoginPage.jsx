import { Link } from "react-router-dom";
import LoginForm from "@/features/auth/LoginForm";
import styles from "@/features/auth/AuthPage.module.css";

const LoginPage = () => {
  return (
    <div className={styles.authPage}>
      <Link to="/" className={styles.homeLink}>
        ← Back to Shop
      </Link>
      <div className={styles.container}>
        <LoginForm />
        <div className={styles.footer}>
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
