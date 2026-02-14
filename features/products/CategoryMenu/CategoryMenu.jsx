import { Link } from "react-router-dom";
import styles from "./CategoryMenu.module.css";

// No more imports for images, use direct paths

const categories = [
  {
    name: "headphones",
    image: "/assets/shared/desktop/image-headphones.png", // Direct path
  },
  {
    name: "speakers",
    image: "/assets/shared/desktop/image-speakers.png", // Direct path
  },
  {
    name: "earphones",
    image: "/assets/shared/desktop/image-earphones.png", // Direct path
  },
];

const CategoryMenu = ({ closeMenu }) => {
  return (
    <nav className={styles.categoryMenu}>
      <ul className={styles.categoryList}>
        {categories.map((category) => (
          <li key={category.name} className={styles.categoryItem}>
            <Link
              to={`/category/${category.name}`}
              onClick={closeMenu}
              className={styles.categoryLink}
            >
              <div className={styles.imageWrapper}>
                <img src={category.image} alt="" className={styles.categoryImage} />
              </div>
              <h6 className={styles.categoryName}>{category.name}</h6>
              <div className={styles.shopLink}>
                <p className={styles.shopText}>Shop</p>
                <img src="/assets/shared/desktop/icon-arrow-right.svg" alt="Shop category" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoryMenu;