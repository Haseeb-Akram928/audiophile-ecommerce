import { useState } from 'react';
import styles from './ImageWithLoader.module.css';
import Skeleton from '../Skeleton/Skeleton';

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
