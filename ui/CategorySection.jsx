import { Link } from "react-router-dom";
import styles from "@/ui/CategorySection.module.css";

const CategorySection = () => {
  const categories = [
    {
      name: "HEADPHONES",
      img: "/assets/shared/desktop/image-category-thumbnail-headphones.png",
      link: "/headphones",
    },
    {
      name: "SPEAKERS",
      img: "/assets/shared/desktop/image-category-thumbnail-speakers.png",
      link: "/speakers",
    },
    {
      name: "EARPHONES",
      img: "/assets/shared/desktop/image-category-thumbnail-earphones.png",
      link: "/earphones",
    },
  ];

  return (
    <section className={styles.categoryWrapper}>
      <div className={styles.container}>
        {categories.map((item) => (
          <div key={item.name} className={styles.categoryCard}>
            <div className={styles.imageWrapper}>
              <img
                src={item.img}
                alt=""
                aria-hidden="true"
                className={styles.productImg}
              />
            </div>
            <div className={styles.content}>
              <h3 className={styles.categoryName}>{item.name}</h3>
              <Link to={item.link} className={styles.shopLink}>
                SHOP
                <img
                  src="/assets/shared/desktop/icon-arrow-right.svg"
                  alt=""
                  aria-hidden="true"
                  className={styles.arrow}
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
