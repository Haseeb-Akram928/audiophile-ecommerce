import { Link } from "react-router-dom";
import styles from "@/pages/NotFound.module.css";

const NotFound = () => {
  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.errorCode}>404</h1>
          <h2 className={styles.title}>Page Not Found</h2>
          <p className={styles.description}>
            We couldn't find the page you're looking for. It might have been
            moved, deleted, or perhaps it never existed. Let's get you back to
            the music.
          </p>
          <Link to="/" className="btn orange">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
