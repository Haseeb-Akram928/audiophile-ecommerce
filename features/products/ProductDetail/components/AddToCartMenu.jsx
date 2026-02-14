import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '@/features/cart/cartSlice'; // Assuming cartSlice is in features/cart
import styles from '../ProductDetail.module.css'; // Import styles

const AddToCartMenu = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    dispatch(
      addItem({
        id: product.id,
        name: product.shortName || product.name,
        price: product.price,
        image: product.image.mobile, // Using mobile image for cart display
        quantity: quantity,
        slug: product.slug,
      })
    );
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
        <span className={styles.quantityNumber}>{quantity}</span>
        <button
          type="button"
          className={styles.plus}
          onClick={handleIncrement}
        >
          +
        </button>
      </div>
      <button className="btn orange" onClick={handleAddToCart}>
        ADD TO CART
      </button>
    </div>
  );
};

export default AddToCartMenu;
