import { Link } from "react-router-dom";
import styles from "@/components/layout/Footer/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <div className={styles.orangeBar}></div>

        <div className={styles.topSection}>
          <a href="/" className={styles.logoLink} aria-label="Audiophile home">
            <img src="/assets/logo.svg" alt="" aria-hidden="true" />
          </a>

          <nav className={styles.footerNav} aria-label="Footer navigation">
            <ul className={styles.navLinks}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/headphones">Headphones</Link>
              </li>
              <li>
                <Link to="/speakers">Speakers</Link>
              </li>
              <li>
                <Link to="/earphones">Earphones</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.middleSection}>
          <p className={styles.description}>
            Audiophile is an all in one stop to fulfill your audio needs. We're
            a small team of music lovers and sound specialists who are devoted
            to helping you get the most out of personal audio. Come and visit
            our demo facility - we're open 7 days a week.
          </p>

          <div className={styles.socialLinksDesktop}>
            <SocialIcons />
          </div>
        </div>

        <div className={styles.bottomSection}>
          <p className={styles.copyright}>
            Copyright 2026. All Rights Reserved
          </p>
          <div className={styles.socialLinksMobile}>
            <SocialIcons />
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcons = () => (
  <div className={styles.socialWrapper}>
    <a
      href="https://facebook.com"
      aria-label="Visit our Facebook page"
      className={styles.socialLink}
    >
      <img src="/assets/icon-facebook.svg" alt="" aria-hidden="true" />
    </a>
    <a
      href="https://twitter.com"
      aria-label="Visit our Twitter page"
      className={styles.socialLink}
    >
      <img src="/assets/icon-twitter.svg" alt="" aria-hidden="true" />
    </a>
    <a
      href="https://instagram.com"
      aria-label="Visit our Instagram page"
      className={styles.socialLink}
    >
      <img src="/assets/icon-instagram.svg" alt="" aria-hidden="true" />
    </a>
  </div>
);

export default Footer;
