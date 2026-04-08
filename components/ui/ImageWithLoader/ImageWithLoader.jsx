import { useState } from 'react';
import styles from './ImageWithLoader.module.css';
import Skeleton from '../Skeleton/Skeleton';

/**
 * An image wrapper that displays a pulsing Skeleton until the image fully loads.
 * Adds `loading="lazy"` automatically for performance.
 * 
 * @param {string} src - The image source URL
 * @param {string} alt - Alternate text for the image
 * @param {string} className - Optional container class name
 * @param {string} imageClassName - Optional class specifically for the img tag
 * @param {Array} sources - Optional array of source objects { media, srcSet } for a <picture> element
 */
export default function ImageWithLoader({
  src,
  alt = "",
  className = "",
  imageClassName = "",
  sources,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  const ImgTag = (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onLoad={() => setIsLoaded(true)}
      className={`${styles.image} ${isLoaded ? styles.loaded : ''} ${imageClassName}`}
      {...props}
    />
  );

  return (
    <div className={`${styles.container} ${className}`}>
      {!isLoaded && (
        <div className={styles.skeletonWrapper}>
          <Skeleton style={{ width: '100%', height: '100%', borderRadius: 'inherit' }} />
        </div>
      )}
      
      {sources ? (
        <picture>
          {sources.map((srcObj, index) => (
            <source key={index} media={srcObj.media} srcSet={srcObj.srcSet} />
          ))}
          {ImgTag}
        </picture>
      ) : (
        ImgTag
      )}
    </div>
  );
}
