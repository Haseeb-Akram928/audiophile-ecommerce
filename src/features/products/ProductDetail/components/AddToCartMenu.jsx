import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  getCart,
} from "@/features/cart/cartSlice";
import styles from "@/features/products/ProductDetail/ProductDetail.module.css";

const AddToCartMenu = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector(getCart);

  // 1. Check if the item is already in the Redux cart
  const cartItem = cart.find((item) => item.id === product.id);

  // 2. Setup local state for before it gets added
  const [localQuantity, setLocalQuantity] = useState(1);

  // 3. Decide which quantity to display
  const currentQuantity = cartItem ? cartItem.quantity : localQuantity;

  const handleIncrement = () => {
    if (cartItem) {
      dispatch(increaseItemQuantity(product.id)); // Update Redux instantly
    } else {
      setLocalQuantity((prev) => prev + 1); // Update local state
    }
  };

  const handleDecrement = () => {
    if (cartItem) {
      dispatch(decreaseItemQuantity(product.id)); // Update Redux instantly
    } else if (localQuantity > 1) {
      setLocalQuantity((prev) => prev - 1); // Update local state
    }
  };

  const handleAddToCart = () => {
    if (!cartItem) {
      dispatch(
        addItem({
          id: product.id,
          name: product.shortName || product.name,
          price: product.price,
          image: product.image.mobile,
          quantity: localQuantity,
          slug: product.slug,
        }),
      );
    }
  };

  return (
    <div className={styles.addToCartRow}>
      <div className={styles.quantitySelector}>
        <button
          type="button"
          className={styles.minus}
          onClick={handleDecrement}
        >
          -
        </button>
        <span className={styles.quantityNumber}>{currentQuantity}</span>
        <button type="button" className={styles.plus} onClick={handleIncrement}>
          +
        </button>
      </div>
      <button
        className="btn orange"
        onClick={handleAddToCart}
        disabled={!!cartItem}
      >
        {cartItem ? "IN CART" : "ADD TO CART"}
      </button>
    </div>
  );
};

export default AddToCartMenu;
