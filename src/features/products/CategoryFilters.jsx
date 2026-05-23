import { useSearchParams } from "react-router-dom";
import styles from "./CategoryFilters.module.css";

export default function CategoryFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const handleSortChange = (e) => {
    if (e.target.value === "") {
      searchParams.delete("sort");
    } else {
      searchParams.set("sort", e.target.value);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className={styles.filtersContainer}>
      <div className={`container ${styles.filtersContent}`}>
        <label htmlFor="sort" className={styles.label}>Sort by:</label>
        <select 
          id="sort" 
          className={styles.select} 
          onChange={handleSortChange} 
          value={searchParams.get("sort") || ""}
        >
          <option value="">Recommended</option>
          <option value="newness-desc">Newest Arrivals</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </div>
    </div>
  );
}
