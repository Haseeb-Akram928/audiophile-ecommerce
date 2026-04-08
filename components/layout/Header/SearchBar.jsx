import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSearchProducts } from "@/features/products/useSearchProducts";
import { getImageUrl } from "@/utils/helper";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  
  const { products, isLoading } = useSearchProducts(debouncedQuery);

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const ref = useOutsideClick(closeDropdown);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(handler);
  }, [query]);

  return (
    <div className={styles.searchContainer} ref={ref}>
      <div className={styles.inputWrapper}>
        <span className={`material-symbols-outlined ${styles.searchIcon}`}>search</span>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (query.trim()) setIsOpen(true);
          }}
          className={styles.searchInput}
        />
      </div>
      
      {isOpen && query.length >= 2 && (
        <div className={styles.dropdown}>
          {isLoading && <p className={styles.message}>Searching...</p>}
          {!isLoading && products?.length === 0 && (
            <p className={styles.message}>No products found.</p>
          )}
          {!isLoading && products?.length > 0 && (
            <ul className={styles.resultsList}>
              {products.map((product) => (
                <li key={product.id} className={styles.resultItem}>
                  <Link 
                    to={`/product/${product.slug}`} 
                    onClick={() => {
                      setQuery("");
                      setIsOpen(false);
                    }}
                    className={styles.resultLink}
                  >
                    <img src={getImageUrl(product.categoryImage?.mobile)} alt={product.name} className={styles.resultImg} />
                    <span className={styles.resultName}>{product.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
