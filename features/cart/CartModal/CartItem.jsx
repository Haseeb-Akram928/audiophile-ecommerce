import { useDispatch } from "react-redux";
import {
  increaseItemQuantity,
  decreaseItemQuantity,
} from "@/features/cart/cartSlice";
import styles from "@/features/cart/CartModal/CartModal.module.css"; // Assuming styles are imported from CartModal.module.css
import { getImageUrl } from "@/utils/helper";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div key={item.id} className={styles.item}>
      <div className={styles.itemInfo}>
        <div className={styles.imgContainer}>
          <img src={getImageUrl(item.image)} alt={item.name} />
        </div>
        <div className={styles.itemText}>
          <p className={styles.itemName}>{item.name}</p>
          <p className={styles.itemPrice}>$ {item.price.toLocaleString()}</p>
        </div>
      </div>
      <div className={styles.quantityControls}>
        <button onClick={() => dispatch(decreaseItemQuantity(item.id))}>
          -
        </button>
        <span>{item.quantity}</span>
        <button onClick={() => dispatch(increaseItemQuantity(item.id))}>
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
