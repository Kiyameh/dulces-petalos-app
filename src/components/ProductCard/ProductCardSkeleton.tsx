import styles from "./ProductCard.module.css"

/**
 * @version 1
 * @description Skeleton para ProductCard  
 */
const ProductCardSkeleton = () => {
  return (
    <article className={styles.card} role="card" aria-label="Cargando producto" aria-busy="true">
      <header className={styles.header} data-testid="skeleton-header">
        <div className={styles.titleSkeleton} role="presentation" aria-hidden="true" ></div>
        <div className={styles.subtitleSkeleton} role="presentation" aria-hidden="true" ></div>
      </header>
      <div className={styles.imgContainer} data-testid="skeleton-image-container">
        <div className={styles.imageSkeleton} role="presentation" aria-hidden="true" ></div>
        <div className={styles.priceBadgeSkeleton} role="presentation" aria-hidden="true" ></div>
        <div className={styles.goToLinkSkeleton} role="presentation" aria-hidden="true" ></div>
      </div>
    </article>
  )
}

export default ProductCardSkeleton