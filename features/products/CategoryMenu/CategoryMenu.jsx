import { Link } from "react-router-dom";
import styles from "@/features/products/CategoryMenu/CategoryMenu.module.css";
import { getImageUrl } from "@/utils/helper";
import ImageWithLoader from "@/components/ui/ImageWithLoader/ImageWithLoader";

const categories = [
  {
    name: "HEADPHONES",
    image: "/assets/shared/desktop/image-category-thumbnail-headphones.png",
    link: "/headphones",
  },
  {
    name: "SPEAKERS",
    image: "/assets/shared/desktop/image-category-thumbnail-speakers.png",
    link: "/speakers",
  },
  {
    name: "EARPHONES",
    image: "/assets/shared/desktop/image-category-thumbnail-earphones.png",
    link: "/earphones",
  },
];

const CategoryMenu = ({ closeMenu }) => {
  return (
    <div className={styles.menuGrid}>
      {categories.map((cat) => (
        <div key={cat.name} className={styles.card}>
          <div style={{ height: '140px', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <ImageWithLoader 
              src={getImageUrl(cat.image)} 
              alt={cat.name} 
              imageClassName={styles.thumb} 
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <h3 className={styles.name}>{cat.name}</h3>
          <Link to={cat.link} className={styles.shopLink} onClick={closeMenu}>
            SHOP <span className={styles.arrow}>&gt;</span>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CategoryMenu;
