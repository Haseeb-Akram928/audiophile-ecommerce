import styles from "@/components/layout/Header/MobileSidebar.module.css";
import CategoryMenu from "@/features/products/CategoryMenu/CategoryMenu";

const MobileSidebar = ({ isMenuOpen, closeMenu }) => {
  return (
    <>
      {isMenuOpen && (
        <div className={styles.overlay} onClick={closeMenu}>
          <div
            className={styles.mobileMenu}
            onClick={(e) => e.stopPropagation()}
          >
            <CategoryMenu closeMenu={closeMenu} />
          </div>
        </div>
      )}
    </>
  );
};

export default MobileSidebar;
