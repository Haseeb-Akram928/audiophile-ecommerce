import styles from "@/components/ui/BestGear/BestGear.module.css";

const BestGear = () => {
  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.container}>
        <div className={styles.imageContainer}></div>

        <div className={styles.textContainer}>
          <h2 className={styles.title}>
            Bringing you the <span className={styles.highlight}>best</span>{" "}
            audio gear
          </h2>
          <p className={styles.description}>
            Located at the heart of New York City, Audiophile is the premier
            store for high end headphones, earphones, speakers, and audio
            accessories. We have a large showroom and luxury demonstration rooms
            available for you to browse and experience a wide range of our
            products. Stop by our store to meet some of the fantastic people who
            make Audiophile the best place to buy your portable audio equipment.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BestGear;
